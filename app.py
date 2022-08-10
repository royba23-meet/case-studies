import os
from werkzeug.datastructures import ImmutableMultiDict
from flask import Flask, flash, jsonify, render_template, redirect, request, session, url_for
import pyrebase


CONFIG = { 
  "apiKey": "AIzaSyB_CpKIs0IjxutT_4HHpS-taOBRYVRahK8",
  "authDomain": "case-study-8d85f.firebaseapp.com",
  "projectId": "case-study-8d85f",
  "storageBucket": "case-study-8d85f.appspot.com",
  "messagingSenderId": "679538380741",
  "appId": "1:679538380741:web:0746894f84c609f8dac5ac",
  "measurementId": "G-LRSHRELNCV",
  "databaseURL" : "https://case-study-8d85f-default-rtdb.europe-west1.firebasedatabase.app/"
}

firebase = pyrebase.initialize_app(CONFIG)
db = firebase.database()

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        db.child("messages").push({"name": request.json['name'], "surname": request.json['surname'], "message": request.json['message']})
        return redirect(url_for('index'))
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)