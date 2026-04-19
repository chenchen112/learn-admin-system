<template>
  <div class="redirect-container">
    <p>正在跳转...</p>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  }
}
</script>

<style scoped>
.redirect-container {
  text-align: center;
  padding-top: 100px;
}
</style>
