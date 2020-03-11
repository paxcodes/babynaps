from os import getenv

from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import cross_origin

from baby.Baby import ABaby

app = Flask(__name__)


@app.route('/')
def helloWorld():
    return "Hello, World!"


@app.route('/schedule')
@cross_origin(methods='GET', origins=getenv("CLIENT_URL"))
def schedule():
    baby = ABaby(request.args.get('bdate'))
    return jsonify({
        "variables": baby.Schedule().variables,
        "cycles": baby.Schedule().cycles,
        'age': baby.AgeInfo()
    })
