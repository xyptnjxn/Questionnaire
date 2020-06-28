<template>
  <div />
</template>

<script>
export default {
  name: 'Exit',
  layout: 'blank',
  middleware: async (ctx) => {
    const { status, data } = await ctx.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>

</style>
