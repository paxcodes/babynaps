import tests, { submitFormWithValidInputs } from './app.scripts'

describe('The app', () => {
  before(() => cy.visit('/'))
  describe('on initial load', () => {
    it('focuses on bdate field when loaded', tests.shouldFocusOnBirthdateField)
    it(
      'does not show schedule and nap chart',
      tests.shouldNotDisplayScheduleAndNapChart
    )
  })

  describe('when birthdate is more than 2.5 years ago', () => {
    it('displays an error message', tests.shouldDisplayAnErrorMessage)
  })

  describe('when user submits completed form with valid inputs', function() {
    before(submitFormWithValidInputs)

    it('should not load another page', tests.shouldNotLoadAnotherPage)
    it('should set napChart data', tests.shouldSetNapChartData)
    it(
      'should replace content with the schedule and chart of sleep needs',
      tests.shouldReplaceContentWithScheduleAndNapChart
    )

    describe('The nap chart', () => {
      it('should contain rows of data', tests.shouldContainRowsOfData)
    })
  })
})
