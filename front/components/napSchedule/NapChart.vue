<template>
  <div class="cell">
    <h2>Average Sleep Needs</h2>
    <p>{{ napChart.description }}</p>
    <v-simple-table>
      <thead>
        <tr>
          <th>Age</th>
          <th>Awake Time</th>
          <th>Daytime Sleep</th>
          <th>Total Sleep</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in napChart.table" :key="key('row', index)">
          <td :class="{ highlight: row.relevant }">{{ row.age }}</td>
          <td>{{ row.awakeTime }}</td>
          <td>{{ row.daytimeSleep }}</td>
          <td>{{ row.totalSleep }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="tiny">
      References:
      <br />
      <ol>
        <li
          v-for="(source, index) in napChart.sources"
          :key="key('source', index)"
        >
          {{ source.citation }} [ <a :href="source.url">link</a> ]
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import napChart from './NapChart.json'

export default {
  data: () => {
    return {
      napChart
    }
  },
  methods: {
    key(pre, index) {
      return pre + '-' + index
    }
  }
}
</script>
