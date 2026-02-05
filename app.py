from flask import Flask, render_template, request, jsonify
from utils.ollama_client import generate_test_cases
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        user_input = data.get('input')
        
        if not user_input:
            return jsonify({"success": False, "error": "Please provide a description."}), 400
            
        # Call the Ollama client
        generated_text = generate_test_cases(user_input)
        
        return jsonify({
            "success": True, 
            "result": generated_text
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # Run on port 3000 to avoid conflicts
    print("Starting server on http://localhost:3000")
    app.run(debug=True, port=3000)
