from flask import Flask, request, jsonify
from flask_cors import CORS
from eliza import eliza_fr
from stat_gen import stat_generation


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Placeholder functions
def eliza(input_str: str) -> str:
    eliza_answer = eliza_fr(input_str)
    return f"{eliza_answer}"


def stat(input_str: str, str_list: list[str]) -> str:
    text_gen = stat_generation(input_str, str_list, n=3, longueur=50)
    return f"text_generated: {text_gen}"


def LLM(input_str: str) -> str:
    return f"LLM processed: {input_str}"


# Routes
@app.route("/eliza", methods=["POST"])
def call_eliza():
    data = request.get_json()
    input_str = data.get("input")
    if not input_str:
        return jsonify({"error": "Missing input"}), 400
    result = eliza(input_str)
    return jsonify({"result": result})


@app.route("/stat", methods=["POST"])
def call_stat():
    data = request.get_json()
    input_str = data.get("input")
    str_list = data.get("list")
    if (
        not input_str
        or not isinstance(str_list, list)
        or not str_list
        or str_list == []
    ):
        return jsonify({"error": "Missing input or list"}), 400
    result = stat(input_str, str_list)
    return jsonify({"result": result})


@app.route("/LLM", methods=["POST"])
def call_llm():
    data = request.get_json()
    input_str = data.get("input")
    if not input_str:
        return jsonify({"error": "Missing input"}), 400
    result = LLM(input_str)
    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)
