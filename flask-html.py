from flask import (Flask, request, jsonify, render_template, url_for)
import json
import requests

app = Flask(__name__)
 
# Opening JSON file
f = open('data.json',)
# returns JSON object as a dictionary
knowledgeBase = json.load(f)
f.close()

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
    print("REQUEST:" + str(data))

    # grab object id
    objID = data['object']

    # check if object has already been identified previously
    if objID in queryDict:
      queryResponse = queryDict[objID]

      print("RESPONSE:" + str(queryResponse))      
      print("MEMORY: " + str(queryDict))
      print("Sending action to Robot")
      # send to html
      #return jsonify(queryResponse)

      #response = requests.post('http://localhost:5010/ajax', json={"task":"1", "action":"Pick Up"})
      #print(response.status_code)
      return jsonify(username=data['object'] + '-' + data['action'])
    
    else:
      # ask query in HTML
      print("MEMORY: " + str(queryDict))

      if (knowledgeBase[data['object']]['op1']==""):
        print("Sending action to Robot")
        #response = requests.post('http://localhost:5010/ajax', json={"task":"1", "action":"Pick Up"})
        #print(response.status_code)

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

    print("MEMORY: " + str(queryDict))
    print("Sending action to Robot")
    #response = requests.post('http://localhost:5010/ajax', json={"task":"1", "action":"Pick Up"})
    #print(response.status_code)
    # return jsonify(username=data['task'] + '-' + data['action'])
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
