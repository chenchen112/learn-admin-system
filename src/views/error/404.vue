<template>
  <div class="error-page">
    <div class="error-code">404</div>
    <div class="error-desc">抱歉，您访问的页面不存在</div>
    <div class="error-actions">
      <el-button type="primary" @click="goHome">返回首页</el-button>
      <el-button @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
}

.error-code {
  font-size: 120px;
  font-weight: 600;
  color: #409EFF;
  line-height: 1;
  margin-bottom: 20px;
}

.error-desc {
  font-size: 20px;
  color: #666;
  margin-bottom: 30px;
}

.error-actions {
  display: flex;
  gap: 15px;
}
</style>
