<template>
  <div>
    <el-form v-if="username===ownername">
      <el-form-item label="问卷链接" />
      <el-form-item :label="linkforShare" />
      <el-button @click="viewStatistics">查看问卷调查结果统计</el-button>
    </el-form>
    <el-divider></el-divider>
    <el-form>
      <el-form-item :label="title" />
    </el-form>
    <div id="form-create" />
  </div>
</template>

<script>
import Vue from 'vue'
import formCreate from '@form-create/element-ui'
Vue.use(formCreate)
export default {
  name: 'Test',
  data () {
    return {
      title: '',
      fApi: {},
      model: {},
      link: '',
      username: '',
      ownername: '',
      linkforShare: '',
      rules: [],
      questionnaire: {},
      questions: []
    }
  },
  mounted () {
    this.$nextTick((_) => {
      this.getLink()
      this.getQuestionnairesByLink()
      setTimeout(() => {
        this.setPage()
      }, 1000)
    })
  },
  methods: {
    getLink () {
      const self = this
      self.link = self.$route.query.link
    },
    getQuestionnairesByLink () {
      const self = this
      const link = this.link
      self.$axios.post('/statistics/getQuestionnairesByLink', {
        link
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            console.log(data.questionnaire[0])
            self.questionnaire = data.questionnaire[0]
            self.title = self.questionnaire.title
            self.questions = self.questionnaire.questions
            self.linkforShare = window.location.href
            self.username = document.cookie.split('=')[1]
            self.ownername = self.questionnaire.username
          } else {
            console.log('获取统计结果错误')
          }
        } else {
          console.log('服务器出错')
        }
      })
    },
    setPage () {
      const self = this
      const questions = self.questions
      console.log(questions)
      for (let i = 0; i < questions.length; i++) {
        switch (questions[i].type) {
          case '1':
            self.rules.push(this.$formCreate.maker.radio(questions[i].name, `${i}single`, '')
              .options(questions[i].options))
            break
          case '2':
            self.rules.push(this.$formCreate.maker.checkbox(questions[i].name, `${i}multi`, [])
              .options(questions[i].options))
            break
          case '3':
            self.rules.push(this.$formCreate.maker.text(questions[i].name, `${i}text`, ''))
            break
          case '4':
            self.rules.push(this.$formCreate.maker.radio(questions[i].name, `${i}score`, '')
              .options(questions[i].options))
            break
          case '5':
            break
          case '6':
            self.rules.push(this.$formCreate.maker.text(questions[i].name, `${i}geo`, '').props({
              placeholder: '点击获取位置'
            }).on('focus', self.getGeo))
            break
          default:
            break
        }
      }
      const root = document.getElementById('form-create')
      console.log(root)
      // fApi为表单api
      this.fApi = this.$formCreate(
        // 表单生成规则
        this.rules,
        // 组件参数配置
        {
          el: root,
          // 表单提交事件
          onSubmit (formData, fApi) {
            self.submit(formData)
          }
        })
    },
    getGeo () {
      const self = this
      const reg = RegExp(/geo/)
      let address = ''
      self.$axios.get('/geo/getPosition').then(({ status, data }) => {
        if (status === 200) {
          address = data.province + '-' + data.city
          for (const i in this.fApi.form) {
            if (i.match(reg)) {
              this.fApi.form[i] = address
            }
          }
        }
      })
    },
    submit (formData) {
      const self = this
      const link = self.link
      const answer = formData
      self.$axios.post('/statistics/submit', {
        link,
        answer
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('表单提交成功')
          } else {
            alert(data.msg)
          }
        } else {
          alert('服务器异常')
        }
      })
    },
    viewStatistics () {
      const self = this
      const link = { link: self.link }
      self.$router.push({
        path: '/statistics',
        query: link
      })
      console.log(link)
    }
  }
}
</script>

<style scoped>

</style>
