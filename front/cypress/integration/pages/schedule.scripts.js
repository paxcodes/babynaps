import * as __ from '../../support/utils'

const givenBirthDate = __.bdateOf(6, 'months')

export const visitScheduleOf6Month = () => {
  cy.visit('schedule?bdate=' + givenBirthDate)
}

export default {
  shouldHaveScheduleAndNapChart: () => {
    cy.getCy('scheduleSection').should('be.visible')
    cy.getCy('chartSection').should('be.visible')
    cy.getCy('welcomeSection').should('not.exist')
  },
  shouldContainRowsOfData: (sectionId) => {
    cy.getCy(sectionId).within((section) => {
      cy.get('table tr').should('exist')
    })
  }
}
