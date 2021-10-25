from flask import (Flask, request, jsonify, render_template, url_for)
import json
app = Flask(__name__)

knowledgeBase = {
  "Fruit": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Cup": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Door": {
    "op1": "Hinge",
    "op2": "Slide",
    "cat": "Open/close",
  },
  "Cabinet": {
    "op1": "Hinge",
    "op2": "Slide",
    "cat": "Open/close",
  },
  "Drawer": {
    "op1": "Hinge",
    "op2": "Slide",
    "cat": "Open/close",
  },
  "Box": {
    "op1": "",
    "op2": "",
    "cat": "Open/close",
  },
  "Pen": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Bowl": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Book": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Lamp": {
    "op1": "Flick",
    "op2": "Button",
    "cat": "On/off",
  },
  "Remote": {
    "op1": "Switch",
    "op2": "Button",
    "cat": "On/off",
  },
  "Utensil": {
    "op1": "Fork",
    "op2": "Spoon",
    "cat": "Feed",
  },
  "Phone": {
    "op1": "",
    "op2": "",
    "cat": "Plug in",
  },
  "Computer": {
    "op1": "",
    "op2": "",
    "cat": "Plug in",
  },
  "Potted plant": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Tissue": {
    "op1": "",
    "op2": "",
    "cat": "Pick up",
  },
  "Bottle": {
    "op1": "",
    "op2": "",
    "cat": "Open/close",
  },
}

# dictionary saving previous query selections for object specifications
# format - objectID: response
queryDict = {}

@app.route('/')
def home():
    return render_template('index.html')
    #return url_for('/Users/admin/github_shubham/Human-Robot-Interface', filename = 'index.html')

# execute after selecting object button
@app.route('/ajax', methods=['POST'])
def ajax_request():
    # get object and action from button clicked
    data = request.get_json(force=True)
    print("REQUEST:")
    print(data)

    # grab object id
    objID = data['object']

    # check if object has already been identified previously
    if objID in queryDict:
      queryResponse = queryDict[objID]

      print("RESPONSE:")
      print(queryResponse)
      
      print("MEMORY: ")
      print(queryDict)
      print("=*=*=*=*=*=*=*=*=")

      # send to html
      return jsonify(queryResponse)
    else:
      # ask query in HTML
      print("MEMORY: ")
      print(queryDict)
      print("=*=*=*=*=*=*=*=*=")

      return ""

# execute after selecting query option from pop-up
@app.route('/ajax2', methods=['POST'])
def ajax2_request():
    # get object and response from button clicked
    data = request.get_json(force=True)

    # save response
    obj = data['object']
    response = data['response']
    queryDict[obj] = response

    print("MEMORY: ")
    print(queryDict)
    print("=*=*=*=*=*=*=*=*=")

    return ""

# execute when page loads
# send knowledge base to populate buttons
@app.route('/ajax3', methods=['POST'])
def ajax3_request():
    return jsonify(knowledgeBase) 

@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
