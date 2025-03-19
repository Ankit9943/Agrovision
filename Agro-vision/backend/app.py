from flask import Flask, render_template, jsonify
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
THINGSPEAK_URL = f'https://api.thingspeak.com/channels/{os.getenv('THINGSPEAK_CHANNEL_ID')}/feeds.json?api_key={os.getenv('THINGSPEAK_API_KEY')}&results=1'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    response = requests.get(THINGSPEAK_URL)

    if response.status_code == 200:

        # maitain a registry operation to a file 
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
        user_input = request.form['user_input']
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=user_input
        )
        filename = "last5chats.json"
        written = writeto(filename, response)
        if written != 0:
            # try deleting the first one
            deleteto(filename)

        return response.model_dump_json()

@app.route('/ai-highlight', methods=['POST'])
def ai_highlight():
    if request.method == "POST":
        pass 
    pass 





if __name__ == '__main__':
    app.run(debug=True)
