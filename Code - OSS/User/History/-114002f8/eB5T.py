from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS

# Enable CORS
app = Flask(__name__)
CORS(app)  # This will allow all origins by default

# Load your model
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def index():
    return "Stock prediction"

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request body (sent by React)
    high = float(request.json.get('high', 0))  # Default to 0 if not provided
    low = float(request.json.get('low', 0))
    open = float(request.json.get('open', 0))
    volume = float(request.json.get('volume', 0))

    print(f"Received data - High: {high}, Low: {low}, Open: {open}, Volume: {volume}")

    # Make the prediction using the model
    input_query = np.array([[high, low, open, volume]])
    result = model.predict(input_query)[0]

    # Return the prediction as JSON
    return jsonify({'res-top': str(result)})

if __name__ == '__main__':
    app.run(debug=True)
