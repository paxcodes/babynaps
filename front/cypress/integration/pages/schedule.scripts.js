export default {
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
