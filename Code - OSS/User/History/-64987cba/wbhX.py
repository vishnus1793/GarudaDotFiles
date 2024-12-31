from flask import Flask, jsonify, render_template
import psutil

app = Flask(__name__)

@app.route('/battery', methods=['GET'])
def battery_status():
    battery = psutil.sensors_battery()
    if battery:
        percent = battery.percent
        return jsonify({"battery": percent})
    else:
        return jsonify({"error": "Battery info unavailable"})


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
