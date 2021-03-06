import subMonths from 'date-fns/subMonths'
import subWeeks from 'date-fns/subWeeks'
import subYears from 'date-fns/subYears'
import format from 'date-fns/format'

// Selectors
export const bdateField = '[data-cy=bdate]'
export const bdateFieldError = '[data-cy=bdate-error]'
export const submitBtn = '[data-cy=submit]'
export const scheduleSection = '[data-cy=schedule-section]'
export const chartSection = '[data-cy=chart-section]'
export const welcomeSection = '[data-cy=welcome-section]'

export const bdateOf = (num, unit) => {
  switch (unit) {
    case 'month':
    case 'months':
      var date = subMonths(new Date(), num)
      break
    case 'week':
    case 'weeks':
      var date = subWeeks(new Date(), num)
      break
    case 'year':
    case 'years':
      var date = subYears(new Date(), num)
      break
    default:
      throw new Error('Invalid unit of time: ' + unit)
  }

  return format(date, 'yyyy-MM-dd')
}

export const userSubmitsForm = () => cy.get(submitBtn).click()

export const userSubmitsCompletedForm = function(name, bdate) {
  cy.get(bdateField).type(bdate)
  userSubmitsForm()
}

export const visitHomeAndSubmitCompletedForm = () => {
  cy.visit('/')
  const birthdate = bdateOf('6', 'months')
  userSubmitsCompletedForm('', birthdate)
}
