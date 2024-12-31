from flask import Flask, jsonify, render_template
import h5py
import os

app = Flask(__name__)

@app.route("/")
def index():
    # Serve the HTML file
    return render_template("index.html")

@app.route("/model-info", methods=["GET"])
def get_model_info():
    # Load the model data from the H5 file
    model_path = os.path.join(app.root_path, "decision_tree_model.h5")
    if not os.path.exists(model_path):
        return jsonify({"error": "Model file not found"}), 404

    with h5py.File(model_path, "r") as h5f:
        numNodes = h5f["numNodes"][()]
        depth = h5f["depth"][()]
        featureImportances = h5f["featureImportances"][:].tolist()  # Convert to list for JSON serialization

    # Return the model data as JSON
    return jsonify({
        "numNodes": int(numNodes),
        "depth": int(depth),
        "featureImportances": featureImportances
    })

if __name__ == "__main__":
    app.run(debug=True)
