import { addMinutes } from 'date-fns/fp'

const SCHEDULES = [
  {
    age: 3,
    first: 1.5,
    activity: 1.5,
    numNaps: 4,
    nap: 1
  },
  {
    age: 4,
    first: 2,
    activity: 2.25,
    numNaps: 3,
    nap: 1
  },
  {
    age: 5,
    first: 2.25,
    activity: 2.25,
    numNaps: 3,
    nap: 1
  },
  {
    age: 6,
    first: 2,
    activity: 2.5,
    numNaps: 3,
    nap: 1
  },
  {
    age: 7,
    first: 3,
    activity: 3,
    numNaps: 2,
    nap: 1.5
  },
  {
    age: 9,
    first: 3,
    activity: 3.5,
    numNaps: 2,
    nap: 1.5
  },
  {
    age: 12,
    first: 3.5,
    activity: 4,
    numNaps: 2,
    nap: 1
  },
  {
    age: 14,
    first: 5,
    activity: 5,
    numNaps: 1,
    nap: 2
  },
  {
    age: 19,
    first: 5.5,
    activity: 5.5,
    numNaps: 1,
    nap: 2
  },
  {
    age: 24,
    first: 5.5,
    activity: 6.0,
    numNaps: 1,
    nap: 2
  }
]

function formatTime(theTime) {
  return `${('0' + theTime.getHours()).slice(-2)}:${(
    '0' + theTime.getMinutes()
  ).slice(-2)}`
}

export function getScheduleParameters(ageInMonths) {
  let minDiff = 999
  let chosenSchedule = null
  for (const index in SCHEDULES) {
    const schedule = SCHEDULES[index]
    const currDiff = Math.abs(schedule.age - ageInMonths)
    if (currDiff < minDiff) {
      minDiff = currDiff
      chosenSchedule = schedule
    } else {
      break
    }
  }
  return chosenSchedule
}

export default {
  ageInDays(bday) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    const utc1 = Date.UTC(bday.getFullYear(), bday.getMonth(), bday.getDate())
    const utc2 = Date.now()

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  },
  ageInWeeks(bday) {
    const ageInDays = this.ageInDays(bday)
    const ageWeeks = Math.floor(ageInDays / 7)
    let ageWeeksString = ''
    if (ageWeeks >= 1) {
      ageWeeksString = `${ageWeeks}-week${ageWeeks === 1 ? '' : 's'}`
    }
    const plusDaysOld = ageInDays % 7
    if (plusDaysOld >= 1) {
      ageWeeksString += ` and ${plusDaysOld}-day${plusDaysOld === 1 ? '' : 's'}`
    }
    return ageWeeksString
  },
  ageInMonths(bday) {
    const today = new Date()
    let months = (today.getFullYear() - bday.getFullYear()) * 12
    months -= bday.getMonth()
    months += today.getMonth()
    return months <= 0 ? 0 : months
  },
  generateSchedule(variables) {
    let currentTime = new Date(2000, 0, 1, 6, 30, 0, 0)
    const cycles = [
      {
        label: 'Wake up',
        time: formatTime(currentTime),
        length: variables.first
      }
    ]

    const addfirstActivitiy = addMinutes(variables.first * 60)
    currentTime = addfirstActivitiy(currentTime)
    const addNap = addMinutes(variables.nap * 60)
    const addActivity = addMinutes(variables.activity * 60)

    for (let i = 0; i < variables.numNaps; i++) {
      cycles.push({
        label: 'Nap',
        time: formatTime(currentTime),
        length: variables.nap
      })
      currentTime = addNap(currentTime)
      cycles.push({
        label: 'Eat / Play',
        time: formatTime(currentTime),
        length: variables.activity
      })
      currentTime = addActivity(currentTime)
    }

    cycles.push({
      label: 'Bedtime',
      time: formatTime(currentTime),
      length: false
    })
    return cycles
  }
}
