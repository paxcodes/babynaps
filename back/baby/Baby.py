from datetime import datetime
from datetime import date
from math import floor

from dateutil.relativedelta import relativedelta

from schedule.Schedule import ASchedule
from helper import pluralize


class ABaby:
    def __init__(self, bdate):
        self.bdate = datetime.strptime(bdate, "%Y-%m-%d").date()
        self.age = self.__CalculateAge()

    def AgeInfo(self):
        return {
            "weeks": self.AgeInWeeks(),
            "month": f"{self.age['months']}-month",
        }

    def AgeInWeeks(self):
        age = ''
        if self.age["weeks"]:
            age = f"{self.age['weeks']} {pluralize(self.age['weeks'], 'week')}"

        if self.age["weeks_daysRem"]:
            age = f"{age} " if age != '' else age
            age += f"{self.age['weeks_daysRem']} {pluralize(self.age['weeks_daysRem'], 'day')}"
        return age

    def __CalculateAge(self):
        dateDelta = relativedelta(date.today(), self.bdate)
        daysDelta = date.today() - self.bdate
        age = {
            "months": (dateDelta.years * 12) + dateDelta.months,
            "months_daysRem": dateDelta.days,
            "weeks": floor(daysDelta.days / 7),
            "weeks_daysRem": daysDelta.days % 7,
            "total_days": daysDelta.days,
        }
        return age

    def Schedule(self):
        if not hasattr(self, "schedule"):
            self.schedule = ASchedule(self)
        return self.schedule
