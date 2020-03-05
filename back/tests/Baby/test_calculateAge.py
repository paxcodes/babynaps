from freezegun import freeze_time

from baby.Baby import ABaby


@freeze_time("2018-12-01")
def test_getAgeOf6MonthOld():
    baby = ABaby("2018-06-01")
    expectedAge = {
        "weeks": "26 weeks 1 day",
        "month": "6-month"
    }
    actualAge = baby.AgeInfo()
    assert actualAge == expectedAge


# def test_otherDateFormatsRaiseAnException():
#     calculateAge("Not a birthdate")
#     calculateAge("June 1, 2018")
#     calculateAge("2018-Jun-01")
