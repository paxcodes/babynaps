from schedule.Schedule import ASchedule


def test_referenceFor11MonthOldIs12():
    actualJsonFile = ASchedule._GetJsonFile(11)
    expected = 12
    assert int(actualJsonFile.stem) == expected


def test_referenceFor3MonthOldIs3():
    actualJsonFile = ASchedule._GetJsonFile(3)
    expected = 3
    assert int(actualJsonFile.stem) == expected


def test_referenceFor25MonthOldIs24():
    actualJsonFile = ASchedule._GetJsonFile(25)
    expected = 24
    assert int(actualJsonFile.stem) == expected


def test_referenceFor30MonthOldIs24():
    actualJsonFile = ASchedule._GetJsonFile(30)
    expected = 24
    assert int(actualJsonFile.stem) == expected
