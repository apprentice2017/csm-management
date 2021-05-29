<template>
  <div class="dashboard-editor-container">
    <panel-group :info="source" @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
      <pie-chart :chart-data="pieChartData"/>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { getInfo } from '@/api/info'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    const dataSet = {
      user: {
        days: [],
        actualData: []
      },
      essay: {
        days: [],
        actualData: []
      },
      publish: {
        days: [],
        actualData: []
      },
      finished: {
        days: [],
        actualData: []
      }
    }
    const pieChartData = {
      name: '分类物品数',
      category: [],
      actualData: []
    }
    return {
      source: {},
      dataSet: dataSet,
      lineChartData: dataSet.user,
      pieChartData: pieChartData
    }
  },
  beforeMount() {
    this.getDate()
  },
  mounted() {
  },
  methods: {
    getDate() {
      getInfo().then(res => {
        console.log(res.result)
        this.source = res.result
        this.dataSet.user.days = this.source.user.map(value => {
          return value.name
        })
        this.dataSet.user.actualData = this.source.user.map(value => {
          return value.value
        })
        this.dataSet.essay.days = this.source.essay.map(value => {
          return value.name
        })
        this.dataSet.essay.actualData = this.source.essay.map(value => {
          return value.value
        })
        this.dataSet.publish.days = this.source.publish.map(value => {
          return value.name
        })
        this.dataSet.publish.actualData = this.source.publish.map(value => {
          return value.value
        })
        this.dataSet.finished.days = this.source.finished.map(value => {
          return value.name
        })
        this.dataSet.finished.actualData = this.source.finished.map(value => {
          return value.value
        })
        this.pieChartData.category = this.source.category.map(value => {
          return value.name
        })
        this.pieChartData.actualData = this.source.category
        console.log(this.pieChartData)
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = this.dataSet[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
