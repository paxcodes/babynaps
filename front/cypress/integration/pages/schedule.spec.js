import tests from './schedule.scripts'

describe('The `/schedule?bdate=[bdate]` page', () => {
  it(
    'should replace content with the schedule and chart of sleep needs',
    tests.shouldReplaceContentWithScheduleAndNapChart
  )

  describe('The nap chart', () => {
    it('should contain rows of data', tests.shouldContainRowsOfData)
  })
})
