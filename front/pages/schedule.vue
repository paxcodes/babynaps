<template>
  <div>
    <Schedule data-cy="scheduleSection" />
    <NapChart data-cy="chartSection" />
  </div>
</template>

<script>
import Schedule from '../components/napSchedule/Schedule'
import NapChart from '../components/napSchedule/NapChart'

export default {
  components: {
    Schedule,
    NapChart
  }
}
</script>
