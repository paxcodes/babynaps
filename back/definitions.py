from os import path

PYTHON_APP_DIR = path.dirname(path.abspath(__file__))
ROOT_APP_DIR = path.dirname(PYTHON_APP_DIR)
FIXTURE_DIR = path.join(ROOT_APP_DIR, 'front/cypress/fixtures')
