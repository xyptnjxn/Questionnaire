<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @row-click="handleCheck"
  >
    <el-table-column
      prop="link"
      label="发布日期"
      width="180"
    />
    <el-table-column
      prop="title"
      label="表单标题"
    />
  </el-table>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    const self = this
    const username = document.cookie.split('=')[1]
    self.$axios.post('/questions/getQustionnaire', {
      username
    }).then(({ status, data }) => {
      if (status === 200) {
        if (data && data.code === 0) {
          if (data.questionnaires.length) {
            self.tableData = data.questionnaires
          } else {
            self.tableData = [{
              link: 'null',
              title: 'null'
            }]
          }
        }
      }
    })
  },
  methods: {
    handleCheck (row) {
      const link = { link: row.link }
      this.$router.push({
        path: '/test',
        query: link
      })
    }
  }
}
</script>

<style scoped>

</style>
