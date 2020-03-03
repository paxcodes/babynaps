import tests from './schedule.scripts'

describe('The `/schedule?bdate=[bdate]` page', () => {
  it(
    'should have the schedule and chart of sleep needs',
    tests.shouldHaveScheduleAndNapChart
  )

  describe('The nap chart', () => {
    it('should contain rows of data', tests.shouldContainRowsOfData)
  })
})
