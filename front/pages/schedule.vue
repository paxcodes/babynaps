<template>
  <div>
    <Schedule data-cy="scheduleSection" />
    <NapChart data-cy="chartSection" />
  </div>
</template>

<script>
import Schedule from '../components/napSchedule/Schedule'
import NapChart from '../components/napSchedule/NapChart.vue'

export default {
  components: {
    Schedule,
    NapChart
  },
  async created() {
    if ({}.hasOwnProperty.call(this.$route.query, 'bdate')) {
      const response = await this.$axios.$get(
        'schedule?bdate=' + this.$route.query.bdate
      )
      this.$store.commit('saveCycles', response.cycles)
      this.$store.commit('saveVariables', response.variables)
      this.$store.commit('saveAge', response.age)
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
