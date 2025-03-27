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
    try:
        with open('sensorsdata.json', 'r') as file:
            sensor_data = json.load(file)
        data = sensor_data['responses']
        data_dict = {
            data[0]['channel']['field1']:[obj['feeds'][0]['field1'] for obj in data ],
            data[0]['channel']['field2']:[obj['feeds'][0]['field2'] for obj in data ], 
            data[0]['channel']['field3']:[obj['feeds'][0]['field3'] for obj in data ], 
            data[0]['channel']['field4']:[obj['feeds'][0]['field4'] for obj in data ], 
            data[0]['channel']['field5']:[obj['feeds'][0]['field5'] for obj in data ],
        }
        return data_dict

    except:
        return {}

## Routers and handlers 
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data')
def data():
    response = requests.get(THINGSPEAK_URL)

    if response.status_code == 200:

        # maitain a registry to a file 
        filename = "sensorsdata.json"
        is_written = writeto(filename, response.json())
        if is_written != 0:
            # try deleting the first response 
            deleteto(filename)
        

        feed = response.json()['feeds'][0]
        data = {
            'temperature': feed['field1'],
            'humidity': feed['field2'],
            'water_level': feed['field3'],
            'npk': feed['field4'],
            'moisture': feed['field5'],
            'timestamp': int(time.mktime(time.strptime(feed['created_at'], "%Y-%m-%dT%H:%M:%SZ")))
        }

        recommendations = []
        if float(data['water_level']) < 20: 
            recommendations.append('Water level is low, please refill the water tank.')
        if float(data['temperature']) > 35: 
            recommendations.append('Temperature is high, consider cooling measures.')
        if float(data['humidity']) < 30:  
            recommendations.append('Humidity is low, consider using a humidifier.')
        if float(data['npk']) < 10:  
            recommendations.append('NPK level is low, please fertilize the soil.')
        if float(data['moisture']) < 10: 
            recommendations.append('Soil moisture is low, consider irrigation.')

        data['recommendations'] = recommendations

    else:
        data = {}
    return jsonify(data)


@app.route('/ai-chat', methods=['POST'])
def simple_ai_chat():
    if request.method == "POST":

        """ (userinput + sensordata) => gemini => response + append in the last5chats file"""

        user_input = request.form['user_input']
        sensor_data = recent_sensors_data()

        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash", contents= f'context: farms data: {sensor_data} + "\n --- \n" + query: {user_input},  note : reply in hindi always'
            )
        except Exception as e:
            return jsonify({"Error": f'Error while connecting gemini {e}'})

        filename = "last5chats.json"
        written = writeto(filename, json.loads(response.model_dump_json()))
        if written != 0:
            # try deleting the first one
            deleteto(filename)

        return jsonify(response.model_dump_json())


@app.route('/ai-highlight')
def ai_highlight():
    sensor_data = recent_sensors_data()
    query = f' context: {str(sensor_data)} \n --- \n give a human readable insights of these labeled data, and this data is for farmers so based on these data give advice what to do what not do for their crop and soil to be healthy. note : reply in hindi always '
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=query
        )
    except Exception as e:
        return jsonify({"Error": f'Error while connecting gemini {e}'})

    return jsonify(response.model_dump_json())


if __name__ == '__main__':
    app.run(debug=False)
