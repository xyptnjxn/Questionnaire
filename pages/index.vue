<template>
  <div class="container">
    <div>
      <new />
      <list />
    </div>
  </div>
</template>

<script>
import New from '~/components/public/New.vue'
import List from '~/components/public/List.vue'
export default {
  components: {
    New,
    List
  }
}
</script>

<style>
</style>
