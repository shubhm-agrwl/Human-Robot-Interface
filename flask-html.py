from flask import (Flask, request, jsonify, render_template, url_for)

app = Flask(__name__)

# dictionary saving previous query selections for object specifications
# format - objectID: response
queryDict = {}

@app.route('/')
def home():
    return render_template('index.html')
    #return url_for('/Users/admin/github_shubham/Human-Robot-Interface', filename = 'index.html')

@app.route('/ajax', methods=['POST'])
def ajax_request():
    data = request.get_json(force=True)
    print("REQUEST:")
    print(data)

    # grab object id from html
    objID = data['object']

    # check if object has already been identified previously
    if objID in queryDict:
      if queryDict[objID] == '':
        queryDict[objID] = data['response']
      queryResponse = queryDict[objID]
      # send to backend
      print("RESPONSE:")
      print(queryResponse)
    else:
      # ask query in HTML
      queryResponse = data['response'] # retrieve response from HTML
      queryDict[objID] = queryResponse

    print("MEMORY: ")
    print(queryDict)

    return jsonify(queryDict)
    # username = request.form['username']
    # return jsonify(username=username)

@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
