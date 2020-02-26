const mountVue = require('cypress-vue-unit-test')
const Vuex = require('vuex')
const Vue = require('vue').default

const Schedule = require('../../components/napSchedule/Schedule.vue').default
const Cycle = require('../../components/napSchedule/Cycle.vue').default
const storeConfig = require('../../resources/js/store').default
const test = require('../support/tests/schedule')
const __ = require('../support/utils-schedule')
Object.assign(__, require('../../mixins/mixins').default.methods)

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

describe('The schedule', () => {
  // @todo Use fixtures
  const json = require('../fixtures/schedule6MonthOld.json')
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

  before(mountVue({ template, store }, { extensions }))

  it('prints a summary of the schedule', () => {
    Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
    Cypress.vue.$store.commit(
      'saveVariables',
      Object.assign({}, json.variables)
    )

    cy.get(__.numNaps).then((numNaps) => {
      const actual = Number(numNaps.text())
      const expected = store.state.variables.numNaps
      expect(actual).to.equal(expected)
    })

    cy.get(__.daytimeSleep).then((daytimeSleep) => {
      const actual = __.removeWhitespace(daytimeSleep.text())

      const expected_ds = store.state.variables.daytimeSleep
      const expected = expected_ds + ' ' + __.timeLabel(expected_ds)

      expect(actual).to.equal(expected)
    })
  })

  it('prints the age of the baby', () => {
    Cypress.vue.$store.commit('saveAge', json.age)
    cy.get(__.babyAge).then((babyAge) => {
      const actual = babyAge.text()
      const expected = store.state.age.month
      expect(actual).to.equal(expected)
    })
  })

  it('prints the age of the baby in weeks in the title attribute', () => {
    Cypress.vue.$store.commit('saveAge', json.age)
    cy.get(__.babyAge).then((babyAge) => {
      const actual = babyAge.attr('title')
      const expected = store.state.age['weeks']
      expect(actual).to.equal(expected)
    })
  })

  describe('when first nap is removed', () => {
    before(() => {
      Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
      Cypress.vue.$store.commit(
        'saveVariables',
        Object.assign({}, json.variables)
      )

      cy.get(__.sleepCycle + ':first ' + __.removeNapLink).click()
    })

    it('removes 2 cycles', () => {
      test.cycleCount(4)
    })

    it("updates the schedule's variables", () => {
      let expected = {
        numNaps: 1,
        daytimeSleep: 1.5
      }

      test.scheduleVars(expected)
      test.scheduleVarsReport(expected)
    })

    it('increases the 1st awake length', () => {
      test.firstAwakeLength(8)
    })
  })

  describe('when nap is added', () => {
    before(() => {
      Cypress.vue.$store.commit('saveCycles', json.cycles.slice(0))
      Cypress.vue.$store.commit(
        'saveVariables',
        Object.assign({}, json.variables)
      )

      cy.get(__.addNap).click()
    })

    it('changes label and length of the bedtime cycle', () => {
      test.cycleInfo(5, json.newCycles[0])
    })

    it('adds 2 cycles', () => {
      test.cycleCount(8)
      test.cycleInfo(6, json.newCycles[1])
      test.cycleInfo(7, json.newCycles[2])
    })

    it("updates the schedule's variables", () => {
      const expected = {
        numNaps: 3,
        daytimeSleep: 3.5
      }
      test.scheduleVars(expected)
      test.scheduleVarsReport(expected)
    })
  })
})
