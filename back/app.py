from flask import Flask
from flask import jsonify
from flask import request

from baby.Baby import ABaby

app = Flask(__name__)


@app.route('/')
def helloWorld():
    return "Hello, World!"


@app.route('/schedule')
def schedule():
    baby = ABaby(request.args.get('bdate'))
    return jsonify({
        "variables": baby.Schedule().variables,
        "cycles": baby.Schedule().cycles,
        'age': baby.AgeInfo()
    })
