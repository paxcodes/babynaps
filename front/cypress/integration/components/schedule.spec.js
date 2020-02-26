import tests, {
  mountSchedule,
  removeFirstNap,
  addNap
} from './schedule.scripts'

describe('The schedule', () => {
  before(mountSchedule)

  it('prints a summary of the schedule', tests.shouldPrintASummaryOfTheSchedule)

  it('prints the age of the baby', tests.shouldPrintAgeOfBaby)

  it(
    'prints the age of the baby in weeks in the title attribute',
    tests.shouldDisplayAgeOfBabyInWeeksOnHover
  )

  describe('when first nap is removed', () => {
    before(removeFirstNap)

    it('removes 2 cycles', tests.shouldRemove2Cycles)
    it("updates the schedule's variables", () =>
      tests.shouldUpdateScheduleVariables({
        numNaps: 1,
        daytimeSleep: 1.5
      }))
    it('increases the 1st awake length', tests.shouldIncrease1stAwakeLength)

    describe('when nap is added', () => {
      before(addNap)

      it(
        'changes label and length of the bedtime cycle',
        tests.shouldChangeLabelAndLengthOfBedtimeCycle
      )
      it('adds 2 cycles', tests.shouldAdd2Cycles)
      it("updates the schedule's variables", () =>
        tests.shouldUpdateScheduleVariables({
          numNaps: 3,
          daytimeSleep: 3.5
        }))
    })
  })
})
