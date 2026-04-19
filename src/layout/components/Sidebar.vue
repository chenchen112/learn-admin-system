<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar-container">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    routes() {
      return this.permission_routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta && meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return true;
    },
    variables() {
      return {
        menuBg: "#304156",
        menuText: "#bfcbd9",
        menuActiveText: "#409EFF",
      };
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  width: $sideBarWidth;
  height: 100%;
  overflow: hidden;
  background-color: $menuBg;
  transition: width 0.28s;

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  .el-menu-item,
  .el-submenu__title {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  .el-menu-item.is-active {
    background-color: $subMenuHover !important;
  }

  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        & > .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}

.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }
}
</style>
