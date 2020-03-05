class ABaby:
    def __init__(self, bdate):
        self.bdate = datetime.strptime(bdate, "%Y-%m-%d").date()
        self.ageInDays = date.today() - self.bdate

    def AgeInfo():
        return {
            "weeks": None,
            "month": None
        }
