from pathlib import Path
import json

from definitions import FIXTURE_DIR


def saveResponse(response, fileName):
    path = Path(FIXTURE_DIR, fileName + '.json')
    data = {'data': response.json}
    saveResponseToPath(data, path)
    return response


def saveResponseToPath(data, path):
    if not path.exists():
        with path.open('w') as file:
            json.dump(data, file, indent=3)


def getFixture(fileName):
    with open(Path(FIXTURE_DIR, f"{fileName}.json"), 'r') as jsonFile:
        return json.load(jsonFile)["data"]
