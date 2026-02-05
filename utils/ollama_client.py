import requests
import json
from .prompts import TEST_CASE_TEMPLATE

# Ollama API Configuration
OLLAMA_API_URL = "http://localhost:11434/api/generate"
# Using the specific model present on the system
MODEL_NAME = "gemma3:1b"

def generate_test_cases(user_input):
    """
    Sends the user input to the local Ollama instance and retrieves the generated test cases.
    """
    full_prompt = TEST_CASE_TEMPLATE.format(user_input=user_input)
    
    payload = {
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": False,  # Non-streaming for simplicity
        "options": {
            "temperature": 0.7
        }
    }
    
    try:
        # Pings Ollama
        response = requests.post(OLLAMA_API_URL, json=payload)
        response.raise_for_status()
        
        data = response.json()
        return data.get("response", "Error: Empty response from model.")
        
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            return f"Error: Model '{MODEL_NAME}' not found. Please run 'ollama pull {MODEL_NAME}' in your terminal."
        return f"Error: HTTP {e.response.status_code} - {str(e)}"
    except requests.exceptions.ConnectionError:
        return "Error: Could not connect to Ollama. Is it running at http://localhost:11434?"
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"
