from datetime import datetime
from datetime import timedelta

from pathlib import Path
import json


class ASchedule:
    kReferenceDirectory = Path(Path(__file__).parent, 'reference')

    def __init__(self, baby):
        self.baby = baby
        self.variables = self.__LoadVariables()
        self.cycles = self.__GenerateCycles()

    def __LoadVariables(self):
        jsonFile = ASchedule._GetJsonFile(self.baby.age['months'])
        with open(jsonFile, 'r') as fileContents:
            variables = json.load(fileContents)
        return variables

    def __GenerateCycles(self):
        currentTime = datetime(1900, 1, 1, 6, 30)
        cycles = [{
            'label': 'Wake up',
            'time': currentTime.strftime('%H:%M'),
            'length': self.variables["first"],
        }]

        currentTime = currentTime + \
            timedelta(hours=self.variables["first"])
        for i in range(1, self.variables["numNaps"]+1):
            cycles.append({
                'label': 'Nap',
                'time':  currentTime.strftime('%H:%M'),
                'length': self.variables['nap'],
            })
            currentTime = currentTime + \
                timedelta(hours=self.variables["nap"])
            cycles.append({
                'label': 'Eat / Play',
                'time': currentTime.strftime('%H:%M'),
                'length': self.variables['activity'],
            })
            currentTime = currentTime + \
                timedelta(hours=self.variables['activity'])

        cycles.append({
            'label': 'Bedtime',
            'time': currentTime.strftime('%H:%M'),
            'length': False,
        })
        return cycles

    @staticmethod
    def _GetJsonFile(ageInMonths):
        jsonFiles = ASchedule.kReferenceDirectory.glob('*.json')
        minDiff = 999
        fileToReference = None
        for jsonFile in jsonFiles:
            month = int(jsonFile.stem)
            diff = abs(month - ageInMonths)
            if diff < minDiff:
                minDiff = diff
                fileToReference = jsonFile
        return fileToReference
