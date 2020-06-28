<template>
  <div>
    <el-button type="primary" :disabled="!username" @click="handleBegin">
      开始创建
    </el-button>
    <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-form ref="form" :model="score" label-width="80px">
        <el-form-item label="问卷题目">
          <el-input v-model="title" :disabled="!isBegin" clearable placeholder="请输入问卷题目" />
        </el-form-item>
      </el-form>
    </div>
    <el-select v-model="type" :disabled="!isBegin" clearable placeholder="请选择填写方式">
      <el-option
        v-for="item in types"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="value" :disabled="!isBegin" clearable placeholder="请选择要创建的题型" @blur="clean(value)">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div v-show="value==='1'">
      <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form ref="form" :model="singleChoice" label-width="80px">
          <el-form-item label="单选题题目名称">
            <el-input v-model="singleChoice.name" />
          </el-form-item>
          <el-form-item label="选项">
            <el-radio v-for="(option, index) in singleChoice.options" :key="index">
              <td style="width: 100%">
                {{ index }}
                <el-input v-model="option.label" />
              </td>
            </el-radio>
            <el-button type="primary" @click="addOptions(value)">
              增加选项
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitSC">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="value==='2'">
      <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form ref="form" :model="multipleChoice" label-width="80px">
          <el-form-item label="多选题题目名称">
            <el-input v-model="multipleChoice.name" />
          </el-form-item>
          <el-form-item label="选项">
            <el-radio v-for="(option, index) in multipleChoice.options" :key="index">
              <td style="width: 100%">
                {{ index }}
                <el-input v-model="option.label" />
              </td>
            </el-radio>
            <el-button type="primary" @click="addOptions(value)">
              增加选项
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitMC">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="value==='3'">
      <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form ref="form" :model="text" label-width="80px">
          <el-form-item label="填空题题目">
            <el-input v-model="text.name" />
          </el-form-item>
          <el-form-item label="回答">
            <el-input v-model="text.answer" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitT">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="value==='4'">
      <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form ref="form" :model="score" label-width="80px">
          <el-form-item label="评分题题目名称">
            <el-input v-model="score.name" />
          </el-form-item>
          <el-form-item label="分数">
            <el-radio v-for="(option, index) in score.options" :key="index">
              <td style="width: 100%">
                {{ index }}
                <el-input v-model="option.label" />
              </td>
            </el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitS">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="value==='5'">
      5
    </div>
    <div v-show="value==='6'">
      <div style="margin-top: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form ref="form" :model="geo" label-width="80px">
          <el-form-item label="定位题目名称">
            <el-input v-model="geo.name" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="geo.answer" placeholder="点击按钮获取定位" @focus="getGeo" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitG">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button type="primary" @click="handleSubmit">
      提交问卷
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      title: '',
      multipleChoice: {
        name: '',
        options: []
      },
      text: {
        name: '',
        answer: ''
      },
      score: {
        name: '',
        options: [{ value: 0, label: 0 }, { value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }, { value: 4, label: 4 }]
      },
      geo: {
        name: '',
        answer: ''
      },
      isBegin: false,
      options: [{
        value: '1',
        label: '单选题'
      }, {
        value: '2',
        label: '多选题'
      }, {
        value: '3',
        label: '填空题'
      }, {
        value: '4',
        label: '评分'
      }, {
        value: '5',
        label: '级联选择'
      }, {
        value: '6',
        label: '定位'
      }],
      value: '',
      singleChoice: {
        name: '',
        options: []
      },
      link: '',
      username: '',
      type: '',
      types: [{
        value: '1',
        label: '仅限注册用户'
      }, {
        value: '2',
        label: '无需注册，每天3次'
      }, {
        value: '3',
        label: '无需注册，可填写3次'
      }]
    }
  },
  mounted () {
    this.isBegin = false
    this.username = document.cookie.split('=')[1]
  },
  methods: {
    handleBegin (message) {
      this.isBegin = true
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      const link = year + '-' + month + '-' + day + '-' + date.getTime()
      console.log(link)
      this.link = link
    },
    handleSubmit () {
      this.isBegin = false
      window.location.href = '/'
    },
    onSubmitSC () {
      const self = this
      const username = document.cookie.split('=')[1]
      const link = self.link
      const type = '1'
      const title = self.title
      const name = self.singleChoice.name
      const options = self.singleChoice.options
      const question = {
        name,
        options,
        type
      }
      self.$axios.post('/questions/singlechoice', {
        title,
        username,
        link,
        question
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('提交成功，请继续')
          } else {
            alert(data.msg)
          }
        } else {
          alert('系统错误')
        }
      })
    },
    onSubmitMC () {
      const self = this
      const username = document.cookie.split('=')[1]
      const link = self.link
      const type = '2'
      const title = self.title
      const name = self.multipleChoice.name
      const options = self.multipleChoice.options
      const question = {
        name,
        options,
        type
      }
      self.$axios.post('/questions/multipleChoice', {
        title,
        username,
        link,
        question
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('提交成功，请继续')
          } else {
            alert(data.msg)
          }
        } else {
          alert('系统错误')
        }
      })
    },
    onSubmitT () {
      const self = this
      const username = document.cookie.split('=')[1]
      const link = self.link
      const type = '3'
      const title = self.title
      const name = self.text.name
      const question = {
        name,
        type
      }
      self.$axios.post('/questions/text', {
        title,
        username,
        link,
        question
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('提交成功，请继续')
          } else {
            alert(data.msg)
          }
        } else {
          alert('系统错误')
        }
      })
    },
    onSubmitS () {
      const self = this
      const username = document.cookie.split('=')[1]
      const link = self.link
      const type = '4'
      const title = self.title
      const name = self.score.name
      const options = self.score.options
      const question = {
        name,
        type,
        options
      }
      self.$axios.post('/questions/score', {
        title,
        username,
        link,
        question
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('提交成功，请继续')
          } else {
            alert(data.msg)
          }
        } else {
          alert('系统错误')
        }
      })
    },
    onSubmitG () {
      const self = this
      const username = document.cookie.split('=')[1]
      const link = self.link
      const type = '6'
      const title = self.title
      const name = self.geo.name
      const question = {
        name,
        type
      }
      self.$axios.post('/questions/score', {
        title,
        username,
        link,
        question
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            alert('提交成功，请继续')
          } else {
            alert(data.msg)
          }
        } else {
          alert('系统错误')
        }
      })
    },
    getGeo (target) {
      alert('getGeo')
      target.path[0].blur()
    },
    addOptions (val) {
      switch (val) {
        case '1':
          this.singleChoice.options.push({ value: this.singleChoice.options.length })
          break
        case '2':
          this.multipleChoice.options.push({ value: this.multipleChoice.options.length })
          break
        default:
          break
      }
    },
    clean (val) {
      const self = this
      switch (val) {
        case '1':
          self.singleChoice.name = ''
          self.singleChoice.options = []
          break
        case '2':
          self.multipleChoice.name = ''
          self.multipleChoice.options = []
          break
        case '3':
          self.text.name = ''
          break
        case '4':
          self.score.name = ''
          break
        case '5':
          break
        case '6':
          self.geo.name = ''
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
