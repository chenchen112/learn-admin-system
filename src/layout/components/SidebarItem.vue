<template>
  <div v-if="shouldShow">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <i
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :class="onlyOneChild.meta.icon"
          />
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";

function resolvePath(basePath, routePath) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath)) {
    return basePath;
  }
  if (routePath.startsWith("/")) {
    return routePath;
  }
  if (!basePath || basePath === "/") {
    return "/" + routePath;
  }
  if (basePath.endsWith("/")) {
    return basePath + routePath;
  }
  return basePath + "/" + routePath;
}

export default {
  name: "SidebarItem",
  components: { AppLink },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    shouldShow() {
      if (this.item.hidden) return false;
      if (this.item.meta && this.item.meta.hidden) return false;
      return true;
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden || (item.meta && item.meta.hidden)) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      return resolvePath(this.basePath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  margin-right: 16px;
  font-size: 18px;
  vertical-align: middle;
}

.el-menu-item {
  i {
    color: inherit;
  }
}
</style>
