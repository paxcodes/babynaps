<template>
  <tr :data-cycle-type="cycleType">
    <td>
      {{ label }}
      <br />
      <a
        v-if="label == 'Nap'"
        href="#"
        @click.prevent="removeNap()"
        title="Remove this nap"
        class="tiny"
        data-class="removeNapLink"
        >&times; remove this nap</a
      >
    </td>
    <td>
      <!-- @todo warn when value is too early / too late? -->
      <input :value="time" @input="adjustTime" type="time" required />
    </td>
    <td>
      <div v-if="length !== false" class="grid-x input-group">
        <!-- @todo warn when value is too high / low? -->
        <input
          class="input-group-field cell small-6 medium-4"
          :value="length"
          @input="adjustLength"
          type="number"
          step="0.25"
          required
        />
        <span class="input-group-label cell small-6 medium-5">{{
          lengthLabel
        }}</span>
      </div>
    </td>
  </tr>
</template>

<script>
import mixins from '../../mixins/mixins'

export default {
  props: ['index'],
  mixins: [mixins],
  methods: {
    removeNap() {
      this.$store.commit('removeNap', this.index)
    },

    adjustTime() {
      var newValue = event.target.value
      // If this is not the first element, update the length of
      // the previous cycle. Vue will then handle the rest.
      if (this.index) {
        newValue = this.diffTime(newValue, this.prevTime)
        this.$store.commit('changeLength', {
          key: this.index - 1,
          newValue: newValue
        })
      } else {
        this.$store.commit('changeTime', {
          key: this.index,
          newValue: newValue
        })
      }
    },

    adjustLength() {
      this.$store.commit('changeLength', {
        key: this.index,
        newValue: event.target.value
      })
    },

    diffTime: function(time1, time2) {
      let date1 = new Date('January 1, 1980 ' + time1)
      let date2 = new Date('January 1, 1980 ' + time2)

      return (date1 - date2) / 3600000
    }
  },

  computed: {
    cycleType() {
      if (['Nap', 'Bedtime'].includes(this.label)) {
        return 'asleep'
      } else return 'awake'
    },

    label() {
      return this.$store.state.cycles[this.index].label
    },

    time() {
      return this.addTime(this.prevTime, this.prevLength)
    },

    length() {
      return this.$store.state.cycles[this.index].length
    },

    lengthLabel() {
      return this.timeLabel(this.length)
    },

    prevTime() {
      if (this.index) {
        return this.$store.state.cycles[this.index - 1].time
      }
      return this.$store.state.cycles[this.index].time
    },

    prevLength() {
      if (this.index) {
        return this.$store.state.cycles[this.index - 1].length
      }
      return 0
    }
  },

  created() {
    this.$store.commit('changeTime', {
      key: this.index,
      newValue: this.time
    })
  },

  watch: {
    time(newValue, oldVal) {
      if (this.index) {
        this.$store.commit('changeTime', {
          key: this.index,
          newValue: newValue
        })
      }
    }
  }
}
</script>
