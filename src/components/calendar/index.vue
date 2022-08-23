<template>
  <div class="calender">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div>
          {{ date.getDate() }}
          <span v-if="isweek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      years: [],
      currentYear: '',
      currentMonth: '',
      currentDate: ''
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
    },
    isweek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
.el-calender-table td {
  border: none !important;
}
</style>
