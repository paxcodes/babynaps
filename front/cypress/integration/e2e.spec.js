import * as util1 from '../support/utils-schedule'
import * as util2 from '../support/utils'

let __ = Object.assign({}, util1, util2)

describe('The schedule', () => {
  before(__.visitHomeAndSubmitCompletedForm)
  it('has the age displayed', () => {
    cy.get(__.babyAge).should('be.visible')
  })
})
