<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.app-main {
  min-height: calc(100vh - #{$navbarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
  padding: 20px;
  padding-top: $navbarHeight + 20px;
  box-sizing: border-box;
}
</style>
