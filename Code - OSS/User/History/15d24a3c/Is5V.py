from flask import Flask, jsonify
import h5py

app = Flask(__name__, template_folder="/home/vishnu/Documents/Rithu/templates/index.html")
@app.route("/model-info", methods=["GET"])
def get_model_info():
    # Load the model data from the H5 file
    model_path = "/home/vishnu/Documents/Rithu/decision_tree_model.h5"
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
