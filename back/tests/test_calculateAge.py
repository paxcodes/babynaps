from freezegun import freeze_time

from helper import calculateAge


@freeze_time("2018-12-01")
def test_calculateAgeOf6MonthOld():
    expectedAge = {
        "weeks": "26 weeks 1 day",
        "month": "6-month"
    }
    actualAge = calculateAge("2018-06-01")
    assert actualAge == expectedAge
