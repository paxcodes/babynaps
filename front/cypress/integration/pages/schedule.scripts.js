export default {
  shouldHaveScheduleAndNapChart: () => {
    cy.getCy('scheduleSection').should('be.visible')
    cy.getCy('chartSection').should('be.visible')
    cy.getCy('welcomeSection').should('not.be.visible')
  },
  shouldContainRowsOfData: () => {
    __.visitHomePage()
    __.userSubmitsCompletedForm('Jack', __.bdateOf(9, 'months'))

    cy.get(__.chartSection + ' table tr').should('exist')
  }
}
