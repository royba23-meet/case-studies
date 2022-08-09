import os
from werkzeug.datastructures import ImmutableMultiDict
from flask import Flask, flash, jsonify, render_template, redirect, request, session, url_for
import xmltodict


app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        surname = request.form.get('surname')
        message = request.form.get('message')
        print(name, surname, message)
        return render_template('index.html')
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)