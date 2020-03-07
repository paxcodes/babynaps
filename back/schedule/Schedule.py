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
            variables = OrderedDict(json.load(fileContents))
        return variables

    def __GenerateCycles(self):
        pass

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
