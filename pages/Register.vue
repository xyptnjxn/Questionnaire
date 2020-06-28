<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="欢迎来到注册页面，请按操作要求如实填写注册信息" name="1" />
      <el-tab-pane label="已有账号，登录" name="2" />
    </el-tabs>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="ruleForm.repassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register()">
            注册
          </el-button>
          <div>{{ error }}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Register',
  layout: 'blank',
  data () {
    return {
      activeName: '1',
      error: '',
      ruleForm: {
        name: '',
        email: '',
        password: '',
        repassword: ''
      },
      rules: {
        name: [
          { required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度不得少于6个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.password) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleClick (tab) {
      switch (tab.name) {
        case '2':
          window.location.href = '/login'
          break
        default:
          break
      }
    },
    register () {
      const self = this
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.$axios.post('/users/signup', {
            username: window.encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email,
            password: self.ruleForm.password
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                alert('注册成功')
                window.location.href = '/login'
              } else {
                self.error = data.msg
              }
            } else {
              self.error = `服务器请求错误，错误码为：${status}`
            }
            setTimeout(function () {
              self.error = ''
            }, 1500)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
