export default {
  methods: {
    timeLabel: function(time) {
      // Singular for exactly 1. Plural otherwise, evenfor fractions less than 1.
      // See https://english.stackexchange.com/questions/2139/
      let label = "hour";
      if (time != 1) {
        label += "s";
      }

      return label;
    },

    /**
     *
     * @param {String} time - the initial time in 24h format HH:MM
     * @param {Float} interval - in hours
     * @return {String} time - the resulting time in 24h format HH:MM
     */
    addTime: function(time, interval) {
      interval *= 3600000;
      time = new Date("January 1, 1980 " + time);

      time = new Date(time.getTime() + interval);
      let time_h = time.getHours();
      let time_m = time.getMinutes();

      if (time_h < 10) {
        time_h = "0" + time_h;
      }

      if (time_m < 10) {
        time_m = "0" + time_m;
      }

      return time_h + ":" + time_m;
    },
  },
};
