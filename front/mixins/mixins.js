export default {
  methods: {
    timeLabel: (time) => {
      // Singular for exactly 1. Plural otherwise, evenfor fractions less than 1.
      // See https://english.stackexchange.com/questions/2139/
      let label = 'hour'
      if (time !== 1) {
        label += 's'
      }

      return label
    },

    /**
     *
     * @param {String} time - the initial time in 24h format HH:MM
     * @param {Float} interval - in hours
     * @return {String} time - the resulting time in 24h format HH:MM
     */
    addTime: (time, interval) => {
      interval *= 3600000
      time = new Date('January 1, 1980 ' + time)

      time = new Date(time.getTime() + interval)
      let timeH = time.getHours()
      let timeM = time.getMinutes()

      if (timeH < 10) {
        timeH = '0' + timeH
      }

      if (timeM < 10) {
        timeM = '0' + timeM
      }

      return timeH + ':' + timeM
    }
  }
}
