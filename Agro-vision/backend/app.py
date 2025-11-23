from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from google import genai

from dotenv import load_dotenv
import requests
import time
import json
import os

from maintainInJson import writeto, deleteto

app = Flask(__name__)
CORS(app)
load_dotenv()

client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
THINGSPEAK_URL = f'https://api.thingspeak.com/channels/{os.getenv("THINGSPEAK_CHANNEL_ID")}/feeds.json?api_key={os.getenv("THINGSPEAK_API_KEY")}&results=1'

def recent_sensors_data():
    """
    Read and parse sensor data from JSON file.
    Optimized: Single pass through data instead of 5 separate comprehensions.
    """
    try:
        with open('sensorsdata.json', 'r') as file:
            sensor_data = json.load(file)
        
        data = sensor_data.get('responses', [])
        if not data:
            return {}
        
        # Get field names from first entry
        first_channel = data[0].get('channel', {})
        field_names = [first_channel.get(f'field{i}', f'field{i}') for i in range(1, 6)]
        
        # Build data dict in single pass - much more efficient
        data_dict = {field_names[i]: [] for i in range(5)}
        for obj in data:
            feeds = obj.get('feeds', [{}])
            if feeds:
                feed = feeds[0]
                for i in range(5):
                    field_key = f'field{i+1}'
                    data_dict[field_names[i]].append(feed.get(field_key))
        
        return data_dict

    except (IOError, json.JSONDecodeError, KeyError, IndexError) as e:
        print(f"Error reading sensor data: {e}")
        return {}

## Routers and handlers 
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data')
def data():
    """
    Fetch sensor data from ThingSpeak and provide recommendations.
    Optimized: Better error handling and reduced string conversions.
    """
    try:
        response = requests.get(THINGSPEAK_URL, timeout=10)
        response.raise_for_status()
        
        json_data = response.json()
        feeds = json_data.get('feeds', [])
        
        if not feeds:
            return jsonify({'error': 'No feed data available'}), 404
        
        # Maintain a registry to a file 
        filename = "sensorsdata.json"
        is_written = writeto(filename, json_data)
        if is_written > 0:
            # try deleting the first response 
            deleteto(filename)
        
        feed = feeds[0]
        
        # Extract and convert values once
        try:
            temperature = float(feed.get('field1', 0))
            humidity = float(feed.get('field2', 0))
            water_level = float(feed.get('field3', 0))
            npk = float(feed.get('field4', 0))
            moisture = float(feed.get('field5', 0))
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid sensor data format'}), 400
        
        data = {
            'temperature': feed['field1'],
            'humidity': feed['field2'],
            'water_level': feed['field3'],
            'npk': feed['field4'],
            'moisture': feed['field5'],
            'timestamp': int(time.mktime(time.strptime(feed['created_at'], "%Y-%m-%dT%H:%M:%SZ")))
        }

        # Optimized: Use list of tuples to avoid repeated float conversions
        recommendations = []
        thresholds = [
            (water_level < 20, 'Water level is low, please refill the water tank.'),
            (temperature > 35, 'Temperature is high, consider cooling measures.'),
            (humidity < 30, 'Humidity is low, consider using a humidifier.'),
            (npk < 10, 'NPK level is low, please fertilize the soil.'),
            (moisture < 10, 'Soil moisture is low, consider irrigation.')
        ]
        
        recommendations = [msg for condition, msg in thresholds if condition]
        data['recommendations'] = recommendations
        
        return jsonify(data)

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from ThingSpeak: {e}")
        return jsonify({'error': 'Failed to fetch sensor data'}), 503
    except Exception as e:
        print(f"Unexpected error in /data endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/ai-chat', methods=['POST'])
def simple_ai_chat():
    """
    AI chat endpoint with sensor data context.
    Optimized: Better error handling and input validation.
    """
    user_input = request.form.get('user_input', '').strip()
    
    if not user_input:
        return jsonify({"error": "User input is required"}), 400
    
    sensor_data = recent_sensors_data()

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=f'context: farms data: {sensor_data} + "\n --- \n" + query: {user_input},  note : reply in hindi always'
        )
        
        # Convert response to JSON once
        response_json = response.model_dump_json()
        response_dict = json.loads(response_json)
        
        filename = "last5chats.json"
        written = writeto(filename, response_dict)
        if written > 0:
            # try deleting the first one
            deleteto(filename)

        return jsonify(response_json)
        
    except Exception as e:
        print(f"Error in AI chat: {e}")
        return jsonify({"error": f'Error while connecting to AI service'}), 500


@app.route('/ai-highlight')
def ai_highlight():
    """
    AI insights endpoint for sensor data.
    Optimized: Better error handling.
    """
    sensor_data = recent_sensors_data()
    
    if not sensor_data:
        return jsonify({"error": "No sensor data available"}), 404
    
    query = f' context: {str(sensor_data)} \n --- \n give a human readable insights of these labeled data, and this data is for farmers so based on these data give advice what to do what not do for their crop and soil to be healthy. note : reply in hindi always '
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=query
        )
        return jsonify(response.model_dump_json())
        
    except Exception as e:
        print(f"Error in AI highlight: {e}")
        return jsonify({"error": 'Error while connecting to AI service'}), 500


if __name__ == '__main__':
    app.run(debug=False)
