# BLAST - Local LLM Testcase Generator

## Overview
A locally hosted web application that generates comprehensive Positive and Negative test cases using your local Ollama instance (Gemma-3-1b).

## Setup
1. Ensure **Ollama** is running locally and `gemma3:1b` is pulled:
   ```bash
   ollama pull gemma3:1b
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
4. Access the UI at: `http://localhost:3000`

## Features
- Premium Glassmorphism UI
- Interactive Chat Interface
- Real-time Test Case Generation
