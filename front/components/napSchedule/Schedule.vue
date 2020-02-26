<template>
  <div class="cell">
    <h2 class="h3">Sample Schedule</h2>
    <p>
      Here&rsquo;s a sample schedule for your
      <span
        data-cy="babyAge"
        :title="ageInWeeks"
      >{{ ageInMonths }}</span> old.
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
        <cycle v-for="(cycle, index) in cycles" :key="index + 1" :index="index"></cycle>
      </tbody>
    </table>
    <button type="button" class="button hollow" @click="addNap" data-cy="addNap">Add a Nap</button>
    <p class="tiny">
      The schedule has a total of
      <span data-cy="numNaps">{{ numNaps }}</span> naps
      and
      <span data-cy="daytimeSleep">
        {{ daytimeSleep }}
        {{ daytimeSleepLabel }}
      </span> of daytime sleep.
    </p>
  </div>
</template>

<script>
import mixins from "../mixins.js";

export default {
  mixins: [mixins],
  methods: {
    addNap() {
      this.$store.commit("addNap");
    }
  },
  computed: {
    cycles() {
      return this.$store.state.cycles;
    },
    numNaps() {
      return this.$store.state.variables.numNaps;
    },
    daytimeSleep() {
      return this.$store.state.variables.daytimeSleep;
    },
    daytimeSleepLabel() {
      return this.timeLabel(this.daytimeSleep);
    },
    ageInMonths() {
      return this.$store.state.age.month;
    },
    ageInWeeks() {
      return this.$store.state.age.weeks;
    }
  }
};
</script>
