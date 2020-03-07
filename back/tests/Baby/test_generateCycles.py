from tests.Baby import getBirthdate
from tests.Baby import getExpectedCycle
from baby.Baby import ABaby


def test_getCyclesOf3MonthOldTo30MonthOld():
    for i in range(3, 31):
        baby = ABaby(getBirthdate({"months": i}))
        actual = baby.Schedule().cycles
        expected = getExpectedCycle(i)
        assert actual == expected
