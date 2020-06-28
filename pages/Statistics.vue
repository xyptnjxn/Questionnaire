<template>
  <div>
    <el-form>
      <el-form-item :label="`${title}统计结果`" />
    </el-form>
    <el-divider />
    <div v-for="(chart, index) in charts" :id="index" :key="index" style="width: 600px;height: 400px;" />
    <el-table
      v-for="(table, index) in tableDatas"
      :key="index+1"
      :data="table"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="question"
        label="问题"
        width="180"
      />
      <el-table-column
        prop="answer"
        label="答案"
      />
    </el-table>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Statistics',
  data () {
    return {
      charts: [],
      tableDatas: [],
      link: '',
      questionnaire: {},
      results: [],
      title: '',
      questions: []
    }
  },
  mounted () {
    this.$nextTick((_) => {
      this.getLink()
      this.getQuestionnairesByLink()
      this.getResult()
    })
  },
  methods: {
    getLink () {
      const self = this
      self.link = self.$route.query.link
    },
    getResult () {
      const self = this
      const link = self.link
      let result = []
      self.$axios.post('/statistics/getResult', {
        link
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            const results = data.answers[0].answers
            for (let j = 0; j < results.length; j++) {
              result = []
              for (const i in results[j]) {
                result.push(results[j][i])
              }
              self.results.push(result)
            }
            console.log(self.results)
            self.setResult()
            for (let i = 0; i < self.charts.length; i++) {
              console.log('length', self.charts.length)
              setTimeout(() => {
                self.draw(i)
              }, 1000)
            }
          } else {
            console.log('获取统计结果错误')
          }
        } else {
          console.log('服务器出错')
        }
      })
    },
    getQuestionnairesByLink () {
      const self = this
      const link = this.link
      self.$axios.post('/statistics/getQuestionnairesByLink', {
        link
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            self.questionnaire = data.questionnaire[0]
            self.title = self.questionnaire.title
            self.questions = self.questionnaire.questions
          } else {
            console.log('获取统计结果错误')
          }
        } else {
          console.log('服务器出错')
        }
      })
    },
    setResult () {
      const self = this
      let table = {}
      let tableData = []
      let chart = {}
      let data = {}
      let value = 0
      let label = []
      console.log('questions', self.questions)
      for (let i = 0; i < self.questions.length; i++) {
        switch (self.questions[i].type) {
          case '1':
            chart = {}
            chart = {
              title: {
                text: `${self.questions[i].name}`
              },
              tooltip: {},
              legend: {
                data: ['选择数量']
              },
              series: [{
                name: '选择数量',
                type: 'pie',
                data: []
              }]
            }
            for (let j = 0; j < self.questions[i].options.length; j++) {
              data = {}
              data.name = self.questions[i].options[j].label
              value = 0
              for (let k = 0; k < self.results.length; k++) {
                if (self.results[k][i] === j) {
                  value++
                }
              }
              data = {
                name: `${self.questions[i].options[j].label}`,
                value
              }
              chart.series[0].data.push(data)
            }
            self.charts.push(chart)
            console.log(i, self.charts)
            break
          case '2':
            chart = {}
            chart = {
              title: {
                text: `${self.questions[i].name}`
              },
              tooltip: {},
              legend: {
                data: ['选择人数']
              },
              xAxis: {
                data: []
              },
              yAxis: {},
              series: [{
                name: '选择人数',
                type: 'bar',
                data: []
              }]
            }
            label = []
            for (let j = 0; j < self.questions[i].options.length; j++) {
              label.push(self.questions[i].options[j].label)
              data = {}
              data.name = self.questions[i].options[j].label
              value = 0
              for (let k = 0; k < self.results.length; k++) {
                if (self.results[k][i].includes(j)) {
                  value++
                }
              }
              data = {
                name: `${self.questions[i].options[j].label}`,
                value
              }
              chart.series[0].data.push(data)
            }
            chart.xAxis.data = label
            self.charts.push(chart)
            break
          case '3':
            tableData = []
            for (let j = 0; j < self.results.length; j++) {
              table = {}
              table = {
                question: `${self.questions[i].name}`,
                answer: `${self.results[j][i]}`
              }
              tableData.push(table)
            }
            self.tableDatas.push(tableData)
            break
          case '4':
            chart = {}
            chart = {
              title: {
                text: `${self.questions[i].name}`
              },
              tooltip: {},
              legend: {
                data: ['打分人数']
              },
              xAxis: {
                data: []
              },
              yAxis: {},
              series: [{
                name: '打分人数',
                type: 'bar',
                data: []
              }]
            }
            label = []
            for (let j = 0; j < self.questions[i].options.length; j++) {
              label.push(self.questions[i].options[j].label)
              data = {}
              data.name = self.questions[i].options[j].label
              value = 0
              for (let k = 0; k < self.results.length; k++) {
                if (self.results[k][i] === j) {
                  value++
                }
              }
              data = {
                name: `${self.questions[i].options[j].label}`,
                value
              }
              chart.series[0].data.push(data)
            }
            chart.xAxis.data = label
            self.charts.push(chart)
            break
          case '5':
            break
          case '6':
            tableData = []
            for (let j = 0; j < self.results.length; j++) {
              table = {}
              table = {
                question: `${self.questions[i].name}`,
                answer: `${self.results[j][i]}`
              }
              tableData.push(table)
            }
            self.tableDatas.push(tableData)
            break
          default:
            break
        }
      }
    },
    draw (id) {
      const self = this
      const dom = document.getElementById(id)
      const myChart = echarts.init(dom)

      // 指定图表的配置项和数据
      const option = self.charts[id]

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
