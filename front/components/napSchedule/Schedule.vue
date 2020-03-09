<template>
  <div class="cell">
    <h2 class="h3">Sample Schedule</h2>
    <p>
      Here&rsquo;s a sample schedule for your
      <span data-cy="babyAge" :title="ageInWeeks">{{ ageInMonths }}</span> old.
    </p>
    <table>
      <thead>
        <tr>
          <th width></th>
          <th>Time</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <Cycle
          v-for="(cycle, index) in cycles"
          :key="index + 1"
          :index="index"
        ></Cycle>
      </tbody>
    </table>
    <button
      type="button"
      class="button hollow"
      data-cy="addNap"
      @click="addNap"
    >
      Add a Nap
    </button>
    <p class="tiny">
      The schedule has a total of
      <span data-cy="numNaps">{{ numNaps }}</span> naps and
      <span data-cy="daytimeSleep">
        {{ daytimeSleep }}
        {{ daytimeSleepLabel }}
      </span>
      of daytime sleep.
    </p>
  </div>
</template>

<script>
import mixins from '../../mixins/mixins'
import Cycle from './Cycle.vue'

export default {
  components: {
    Cycle
  },
  mixins: [mixins],
  computed: {
    cycles() {
      return this.$store.state.cycles
    },
    numNaps() {
      return this.$store.state.variables.numNaps
    },
    daytimeSleep() {
      return this.$store.state.variables.daytimeSleep
    },
    daytimeSleepLabel() {
      return this.timeLabel(this.daytimeSleep)
    },
    ageInMonths() {
      return this.$store.state.age.month
    },
    ageInWeeks() {
      return this.$store.state.age.weeks
    }
  },
  methods: {
    addNap() {
      this.$store.commit('addNap')
    }
  }
}
</script>
