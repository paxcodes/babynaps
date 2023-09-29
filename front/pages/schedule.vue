<template>
  <div>
    <Schedule data-cy="scheduleSection" />
    <NapChart data-cy="chartSection" />
  </div>
</template>

<script>
import Schedule from '../components/napSchedule/Schedule'
import NapChart from '../components/napSchedule/NapChart.vue'
import Baby, { getScheduleParameters } from '../models/Baby'

export default {
  components: {
    Schedule,
    NapChart
  },
  created() {
    const bdateYYYYMMDD = {}.hasOwnProperty.call(this.$route.query, 'bdate')
    if (bdateYYYYMMDD) {
      const bdate = new Date(`${this.$route.query.bdate}T00:00:00`)
      const ageInMonths = Baby.ageInMonths(bdate)
      const age = {
        weeks: Baby.ageInWeeks(bdate),
        months: ageInMonths,
        month: `${ageInMonths}-month`
      }

      const variables = getScheduleParameters(age.months)
      const cycles = Baby.generateSchedule(variables)

      this.$store.commit('saveCycles', cycles)
      this.$store.commit('saveVariables', variables)
      this.$store.commit('saveAge', age)
      this.scheduleLoaded = true
    }
  },
  head() {
    return {
      title: 'Sample Schedule'
    }
  }
}
</script>
