<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我的项目" name="1"></el-tab-pane>
    <el-tab-pane :label="`欢迎${username}`" name="2"></el-tab-pane>
    <el-tab-pane label="登录" name="6"></el-tab-pane>
    <el-tab-pane label="注册" name="5"></el-tab-pane>
    <el-tab-pane label="帮助" name="3"></el-tab-pane>
    <el-tab-pane label="退出登录" name="4"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeName: '1',
      username: ''
    }
  },
  async mounted () {
    const { status, data: { user } } = await this.$axios.get('/users/getUser')
    if (status === 200) {
      this.username = user
      const x = document.cookie
      const username = x.split('=')[1]
      if (username !== undefined) {
        this.username = username
      } else {
        this.username = ''
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      switch (tab.name) {
        case '1':
          window.location.href = '/'
          break
        case '5':
          window.location.href = '/register'
          break
        case '6':
          window.location.href = '/login'
          break
        case '3':
          window.location.href = '/help'
          break
        case '4':
          if (document.cookie) {
            document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            alert('退出登录成功')
            window.location.href = '/login'
          } else {
            alert('您还未登陆')
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
