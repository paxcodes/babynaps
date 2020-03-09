import tests, { visitScheduleOf6Month } from './schedule.scripts'

describe('The `/schedule?bdate=[bdate]` page', () => {
  before(visitScheduleOf6Month)

  it(
    'should have the schedule and chart of sleep needs',
    tests.shouldHaveScheduleAndNapChart
  )

  it('has the age displayed', () => {
    cy.getCy('babyAge').should('be.visible')
  })

  describe('The schedule', () => {
    it('should contain rows of data', () =>
      tests.shouldContainRowsOfData('scheduleSection'))
  })

  describe('The nap chart', () => {
    it('should contain rows of data', () =>
      tests.shouldContainRowsOfData('chartSection'))
  })
})
