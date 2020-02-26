export default {
  state: {
    cycles: [],
    variables: {},
    age: {}
  },
  mutations: {
    saveCycles(state, cycles) {
      state.cycles = cycles
    },

    saveAge(state, age) {
      state.age = age
    },

    changeLength(state, pl) {
      if (state.cycles[pl.key].label === 'Nap') {
        this.commit('changeDaytimeSleep', {
          oldValue: state.cycles[pl.key].length,
          newValue: pl.newValue
        })
      }

      state.cycles[pl.key].length = pl.newValue
    },

    changeDaytimeSleep(state, pl) {
      state.variables.daytimeSleep += pl.newValue - pl.oldValue
    },

    changeTime(state, pl) {
      state.cycles[pl.key].time = pl.newValue
    },

    addNap(state, newCycles) {
      const lastIndex = state.cycles.length - 1
      state.cycles[lastIndex].label = 'Nap'
      state.cycles[lastIndex].length = 0.5
      state.variables.daytimeSleep += 0.5
      state.variables.numNaps++

      state.cycles.push(
        {
          label: 'Eat / Play',
          time: false,
          length: state.variables.activity.h
        },
        {
          label: 'Bedtime',
          time: false,
          length: false
        }
      )
    },

    removeNap(state, index) {
      state.variables.numNaps--
      this.commit('changeDaytimeSleep', {
        oldValue: state.variables.daytimeSleep,
        newValue: state.variables.daytimeSleep - state.cycles[index].length
      })

      const removed = state.cycles.splice(index, 2)
      let newLength = parseFloat(state.cycles[index - 1].length)
      for (let i = 0; i < removed.length; i++) {
        newLength += parseFloat(removed[i].length)
      }
      this.commit('changeLength', {
        key: index - 1,
        newValue: newLength
      })
    },

    saveVariables(state, variables) {
      state.variables = Object.assign({}, state.variables, variables, {
        daytimeSleep: variables.numNaps * variables.nap.h
      })
    }
  }
}
