from flask import (Flask, request, jsonify, render_template, url_for)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')
    #return url_for('/Users/admin/github_shubham/Human-Robot-Interface', filename = 'index.html')

@app.route('/ajax', methods=['POST'])
def ajax_request():
    data = request.get_json(force=True)
    print(data)
    return jsonify(username=data['object'] + '-' + data['action'])
    # username = request.form['username']
    # return jsonify(username=username)

@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(debug=True)
