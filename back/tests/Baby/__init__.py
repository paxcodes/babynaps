from pathlib import Path
from datetime import date
import json

from dateutil.relativedelta import relativedelta

from schedule.Schedule import ASchedule


def getBirthdate(age):
    today = date.today()
    delta = relativedelta(months=age["months"])
    return (today - delta).strftime('%Y-%m-%d')


def getExpectedCycle(month):
    jsonFile = ASchedule._GetJsonFile(month)
    expectedOutputDir = Path(Path(__file__).parent, 'expectedOutput')
    with open(Path(expectedOutputDir, jsonFile.name), 'r') as jsonContents:
        cycles = json.load(jsonContents)
    return cycles
