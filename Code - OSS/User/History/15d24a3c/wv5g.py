from flask import Flask, jsonify, render_template, request
import h5py
import numpy as np
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict-fraud", methods=["POST"])
def predict_fraud():
    data = request.json
    amount = float(data.get("amount"))
    transaction_type = data.get("transactionType")

    # Load and process model (assuming model is a neural network)
    model_path = os.path.join(app.root_path, "decision_tree_model.h5")
    if not os.path.exists(model_path):
        return jsonify({"error": "Model file not found"}), 404

    # Assume we use a simplified fraud detection model for demo purposes
    # Modify as needed to load and process with your actual model
    with h5py.File(model_path, "r") as h5f:
        # Example processing; adjust to match your model’s structure
        prediction = np.random.rand()  # Randomly generated prediction for illustration

    is_fraud = prediction > 0.5
    return jsonify({
        "isFraud": is_fraud,
        "probability": round(prediction, 4)
    })

if __name__ == "__main__":
    app.run(debug=True)
