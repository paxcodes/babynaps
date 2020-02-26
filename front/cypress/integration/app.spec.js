import * as __ from '../support/utils'

describe('The app', () => {
  describe('on initial load', () => {
    before(() => cy.visit('/'))

    it('focuses on bdate field when loaded', () => {
      cy.focused()
        .should('be', 'input')
        .and('have.attr', 'name', 'bdate')
    })

    it('does not show schedule and nap chart', () => {
      cy.get(__.scheduleSection).should('not.be.visible')
      cy.get(__.chartSection).should('not.be.visible')
    })
  })

  describe('when birthdate is more than 2.5 years ago', () => {
    it('displays an error message', () => {
      var bdate = __.bdateOf('32', 'months')

      cy.server()
      cy.route('/api/schedule?bdate=' + bdate).as('loadSchedule')

      __.visitHomePage()
      __.userSubmitsCompletedForm('Jack', bdate)

      cy.wait('@loadSchedule')

      cy.get(__.bdateFieldError).then((error) => {
        expect(error.text()).to.match(/^(\S+)+( +\S+)*$/)
        expect(error).to.be.visible
      })
    })
  })

  describe('when user submits completed form with valid inputs', function() {
    const napChart = {
      description: '',
      table: [],
      sources: []
    }

    before(function() {
      this.bdate = __.bdateOf(9, 'months')
      const json = require('../../references/for_testing.json')
      cy.server()
      cy.route('/api/schedule?bdate=' + this.bdate, {
        cycles: json.cycles,
        variables: json.variables,
        napChart: napChart,
        age: json.age
      }).as('loadSchedule')

      __.visitHomePage()
      __.userSubmitsCompletedForm('Jack', this.bdate)

      cy.wait('@loadSchedule')
    })

    it('should not load another page', function() {
      cy.location('pathname').should('be.equal', '/')
    })

    it('should set napChart data', function() {
      cy.window()
        .its('app.napChart')
        .should('not.be.undefined')
    })

    it('should replace content with the schedule and chart of sleep needs', () => {
      cy.get(__.scheduleSection).should('be.visible')
      cy.get(__.chartSection).should('be.visible')
      cy.get(__.welcomeSection).should('not.be.visible')
    })
  })
})

describe('The nap chart', () => {
  it('should contain rows of data', () => {
    __.visitHomePage()
    __.userSubmitsCompletedForm('Jack', __.bdateOf(9, 'months'))

    cy.get(__.chartSection + ' table tr').should('exist')
  })
})
