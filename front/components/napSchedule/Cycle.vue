<template>
  <tr :data-cycle-type="cycleType">
    <td class="body-1">
      {{ label }}
      <br />
      <a
        v-if="label == 'Nap'"
        href="#"
        title="Remove this nap"
        class="overline"
        data-class="removeNapLink"
        @click.prevent="removeNap()"
        >&times; remove this nap</a
      >
    </td>
    <td class="pt-5">
      <!-- @todo warn when value is too early / too late? -->
      <v-text-field
        type="time"
        required
        :value="time"
        @input="adjustTime"
        filled
        rounded
        dense
      />
    </td>
    <td class="pt-5" style="min-width: 175px">
      <div v-if="length !== false">
        <!-- @todo warn when value is too high / low? -->
        <span style="width:100px; display:inline-block">
          <v-text-field
            class="mr-2"
            type="number"
            step="0.25"
            required
            :value="length"
            @input="adjustLength"
            filled
            rounded
            dense
          />
        </span>
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
  mixins: [mixins],
  props: {
    index: {
      type: Number,
      default: null
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
  watch: {
    time(newValue, oldVal) {
      if (this.index) {
        this.$store.commit('changeTime', {
          key: this.index,
          newValue
        })
      }
    }
  },
  created() {
    this.$store.commit('changeTime', {
      key: this.index,
      newValue: this.time
    })
  },
  methods: {
    removeNap() {
      this.$store.commit('removeNap', this.index)
    },

    adjustTime() {
      let newValue = event.target.value
      // If this is not the first element, update the length of
      // the previous cycle. Vue will then handle the rest.
      if (this.index) {
        newValue = this.diffTime(newValue, this.prevTime)
        this.$store.commit('changeLength', {
          key: this.index - 1,
          newValue
        })
      } else {
        this.$store.commit('changeTime', {
          key: this.index,
          newValue
        })
      }
    },

    adjustLength() {
      this.$store.commit('changeLength', {
        key: this.index,
        newValue: event.target.value
      })
    },

    diffTime: (time1, time2) => {
      const date1 = new Date('January 1, 1980 ' + time1)
      const date2 = new Date('January 1, 1980 ' + time2)

      return (date1 - date2) / 3600000
    }
  }
}
</script>
