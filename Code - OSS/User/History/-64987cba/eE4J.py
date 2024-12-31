from flask import Flask, jsonify, render_template
import psutil

app = Flask(__name__)

# Route to get the battery status
@app.route('/battery', methods=['GET'])
def battery_status():
    battery = psutil.sensors_battery()
    if battery:
        percent = battery.percent
        return jsonify({"battery": percent})
    else:
        return jsonify({"error": "Battery info unavailable"})

# Route for the home page (HTML page)
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
