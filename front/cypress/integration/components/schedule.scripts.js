const mountVue = require('cypress-vue-unit-test')
const Vuex = require('vuex')
const Vue = require('vue').default

const Schedule = require('../../../components/napSchedule/Schedule.vue').default
const Cycle = require('../../../components/napSchedule/Cycle.vue').default
const storeConfig = require('../../../store/store').default
const test = require('../../support/tests/schedule')
const __ = require('../../support/utils-schedule')
Object.assign(__, require('../../../mixins/mixins').default.methods)

Vue.use(Vuex)

// @todo Use fixtures
const json = require('../../fixtures/schedule6MonthOld.json')
const store = new Vuex.Store(storeConfig)

export const mountSchedule = () => {
  const template = `
      <div>
        <schedule></schedule>
      </div>
  `
  const extensions = {
    plugins: [Vuex],
    components: {
      Schedule,
      Cycle
    }
  }
  mountVue({ template, store }, { extensions })()
}

export const removeFirstNap = () => {
  Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
  Cypress.vue.$store.commit('saveVariables', Object.assign({}, json.variables))
  cy.get(__.sleepCycle + ':first ' + __.removeNapLink).click()
}

export const addNap = () => {
  Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
  Cypress.vue.$store.commit('saveVariables', Object.assign({}, json.variables))
  cy.get(__.addNap).click()
}

export default {
  shouldPrintASummaryOfTheSchedule: () => {
    Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
    Cypress.vue.$store.commit(
      'saveVariables',
      Object.assign({}, json.variables)
    )

    cy.get(__.numNaps).should(
      'have.text',
      String(store.state.variables.numNaps)
    )

    cy.get(__.daytimeSleep).then((daytimeSleep) => {
      const actual = __.removeWhitespace(daytimeSleep.text())

      const expected_ds = store.state.variables.daytimeSleep
      const expected = expected_ds + ' ' + __.timeLabel(expected_ds)

      expect(actual).to.equal(expected)
    })
  },
  shouldPrintAgeOfBaby: () => {
    Cypress.vue.$store.commit('saveAge', json.age)
    cy.get(__.babyAge).then((babyAge) => {
      const actual = babyAge.text()
      const expected = store.state.age.month
      expect(actual).to.equal(expected)
    })
  },
  shouldDisplayAgeOfBabyInWeeksOnHover: () => {
    Cypress.vue.$store.commit('saveAge', json.age)
    cy.get(__.babyAge).then((babyAge) => {
      const actual = babyAge.attr('title')
      const expected = store.state.age['weeks']
      expect(actual).to.equal(expected)
    })
  },
  shouldRemove2Cycles: () => {
    test.cycleCount(4)
  },
  shouldUpdateScheduleVariables: () => {
    test.scheduleVars(expected)
    test.scheduleVarsReport(expected)
  },
  shouldIncrease1stAwakeLength: () => {
    test.firstAwakeLength(8)
  },
  shouldChangeLabelAndLengthOfBedtimeCycle: () => {
    test.cycleInfo(5, json.newCycles[0])
  },
  shouldAdd2Cycles: () => {
    test.cycleCount(8)
    test.cycleInfo(6, json.newCycles[1])
    test.cycleInfo(7, json.newCycles[2])
  },
  shouldUpdateScheduleVariables: (expected) => {
    test.scheduleVars(expected)
    test.scheduleVarsReport(expected)
  }
}
