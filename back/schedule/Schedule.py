from pathlib import Path


class ASchedule:
    kReferenceDirectory = Path(Path(__file__).parent, 'reference')

    def __init__(self, baby):
        self.baby = baby
        self.variables = self.__LoadVariables()
        self.cycles = self.__GenerateCycles()

    def __LoadVariables(self):
        jsonFile = ASchedule._GetJsonFile(self.baby.age['months'])
        # json = Storage:: disk('references').get('schedules/' . file . '.json')
        # return variables = json_decode(json, TRUE)['variables']

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
