from freezegun import freeze_time

from schedule import __version__
from app import app
from tests import saveResponse
from tests import getFixture


def test_version():
    assert __version__ == '0.1.0'


@freeze_time("2018-12-01")
def test_scheduleWithBdateOf6MonthOldReturnsScheduleFor6MOnthOld():
    fixtureName = "getSchedule200_6month"
    expectedResponse = getFixture(fixtureName)
    with app.test_client() as client:
        response = saveResponse(client.get(
            '/schedule?bdate=2018-06-01'), fixtureName)
        assert response.json == expectedResponse
