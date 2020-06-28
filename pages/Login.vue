<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="欢迎来到登录页面，请按操作要求填写信息进行登录" name="1" />
      <el-tab-pane label="尚未注册账号，注册" name="2" />
    </el-tabs>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">
            登录
          </el-button>
          <div>{{ error }}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'blank',
  data () {
    return {
      activeName: '1',
      error: '',
      ruleForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    handleClick (tab) {
      switch (tab.name) {
        case '2':
          window.location.href = '/register'
          break
        default:
          break
      }
    },
    login () {
      const self = this
      self.$axios.post('/users/signin', {
        username: window.encodeURIComponent(self.ruleForm.name),
        password: self.ruleForm.password
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            document.cookie = `username=${self.ruleForm.name}`
            alert('登录成功')
            window.location.href = '/'
          } else {
            self.error = data.msg
          }
        } else {
          self.error = `服务器错误，错误码为：${status}`
        }
        setTimeout(function () {
          self.error = ''
        }, 1500)
      })
    }
  }
}
</script>

<style scoped>

</style>
