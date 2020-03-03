import * as __ from '../support/utils'

const napChart = {
  description: '',
  table: [],
  sources: []
}

export const submitFormWithValidInputs = () => {
  const bdate = __.bdateOf(9, 'months')
  cy.fixture('schedule6MonthOld').then((data) => {
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/schedule?bdate=' + data.bdate, {
      cycles: data.cycles,
      variables: data.variables,
      napChart: napChart,
      age: data.age
    }).as('loadSchedule')
    __.userSubmitsCompletedForm('Jack', bdate)
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
    cy.server()
    cy.route('/api/schedule?bdate=' + bdate).as('loadSchedule')

    __.userSubmitsCompletedForm('Jack', bdate)
    cy.wait('@loadSchedule')

    cy.get(__.bdateFieldError).then((error) => {
      expect(error.text()).to.match(/^(\S+)+( +\S+)*$/)
      expect(error).to.be.visible
    })
  },
  shouldNotLoadAnotherPage: () => {
    cy.location('pathname').should('be.equal', '/')
  },
  shouldSetNapChartData: () => {
    cy.window()
      .its('app.napChart')
      .should('not.be.undefined')
  },
  shouldReplaceContentWithScheduleAndNapChart: () => {
    cy.get(__.scheduleSection).should('be.visible')
    cy.get(__.chartSection).should('be.visible')
    cy.get(__.welcomeSection).should('not.be.visible')
  },
  shouldContainRowsOfData: () => {
    __.visitHomePage()
    __.userSubmitsCompletedForm('Jack', __.bdateOf(9, 'months'))

    cy.get(__.chartSection + ' table tr').should('exist')
  }
}
