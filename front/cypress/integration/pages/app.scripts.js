import * as __ from '../../support/utils'

const napChart = {
  description: '',
  table: [],
  sources: []
}

const givenBirthDate = __.bdateOf(6, 'months')

export const submitFormWithValidInputs = () => {
  cy.fixture('getSchedule200_6month').then((data) => {
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/schedule?bdate=' + givenBirthDate, {
      cycles: data.cycles,
      variables: data.variables,
      napChart: napChart,
      age: data.age
    }).as('loadSchedule')
    __.userSubmitsCompletedForm('Jack', givenBirthDate)
  })
}

export default {
  shouldFocusOnBirthdateField: () => {
    cy.focused()
      .should('be', 'input')
      .and('have.attr', 'name', 'bdate')
  },
  shouldNotDisplayScheduleAndNapChart: () => {
    cy.get(__.scheduleSection).should('not.be.visible')
    cy.get(__.chartSection).should('not.be.visible')
  },
  shouldDisplayAnErrorMessage: () => {
    const bdate = __.bdateOf('32', 'months')
    __.userSubmitsCompletedForm('Jack', bdate)
    cy.get('.error--text').should('be.visible')
  },
  shouldGoToTheSchedulePage: () => {
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?bdate=' + givenBirthDate)
      expect(loc.pathname).to.eq('/schedule')
    })
  }
}
