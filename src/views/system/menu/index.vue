<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>菜单树</span>
            <el-button type="text" style="float: right;" @click="handleAdd(null)">新增根菜单</el-button>
          </div>
          <el-tree
            ref="menuTree"
            :data="menuTree"
            :props="{ children: 'children', label: 'name' }"
            node-key="id"
            highlight-current
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i :class="data.icon" style="margin-right: 5px;"></i>
                {{ data.name }}
              </span>
              <span class="tree-actions">
                <el-button type="text" size="mini" @click.stop="handleAdd(data)">新增</el-button>
                <el-button type="text" size="mini" @click.stop="handleEdit(data)">编辑</el-button>
                <el-button type="text" size="mini" style="color: #F56C6C;" @click.stop="handleDelete(data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <span>{{ dialogTitle }}</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="上级菜单" prop="parentId">
              <el-cascader
                v-model="form.parentId"
                :options="menuOptions"
                :props="{ checkStrictly: true, value: 'id', label: 'name', emitPath: false }"
                clearable
                placeholder="选择上级菜单"
                style="width: 100%;"
              />
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由路径" />
            </el-form-item>
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" placeholder="请输入图标类名">
                <template slot="prepend">
                  <i :class="form.icon" v-if="form.icon"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="form.sort" :min="0" :max="999" />
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
              <el-input v-model="form.permission" placeholder="请输入权限标识" />
            </el-form-item>
            <el-form-item label="是否显示" prop="visible">
              <el-radio-group v-model="form.visible">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MenuManage',
  data() {
    return {
      menuTree: [],
      menuOptions: [],
      dialogTitle: '新增菜单',
      isEdit: false,
      form: {
        id: undefined,
        parentId: 0,
        name: '',
        path: '',
        component: '',
        icon: '',
        sort: 0,
        permission: '',
        visible: 1,
        status: 1
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getMenuTree()
  },
  methods: {
    getMenuTree() {
      setTimeout(() => {
        this.menuTree = [
          {
            id: 1,
            name: '系统管理',
            icon: 'el-icon-s-tools',
            path: '/system',
            children: [
              { id: 11, name: '用户管理', icon: 'el-icon-user-solid', path: '/system/user', component: 'system/user/index' },
              { id: 12, name: '角色管理', icon: 'el-icon-s-check', path: '/system/role', component: 'system/role/index' },
              { id: 13, name: '菜单管理', icon: 'el-icon-menu', path: '/system/menu', component: 'system/menu/index' },
              { id: 14, name: '系统配置', icon: 'el-icon-setting', path: '/system/config', component: 'system/config/index' }
            ]
          },
          {
            id: 2,
            name: '日志管理',
            icon: 'el-icon-document',
            path: '/log',
            children: [
              { id: 21, name: '操作日志', icon: 'el-icon-tickets', path: '/log/operation', component: 'log/operation' },
              { id: 22, name: '登录日志', icon: 'el-icon-time', path: '/log/login', component: 'log/login' }
            ]
          }
        ]
        this.menuOptions = [{ id: 0, name: '根目录' }, ...this.menuTree]
      }, 300)
    },
    handleNodeClick(data) {
      this.dialogTitle = '编辑菜单'
      this.isEdit = true
      this.form = { ...data, parentId: data.parentId || 0 }
    },
    handleAdd(data) {
      this.resetForm()
      this.dialogTitle = '新增菜单'
      this.isEdit = false
      if (data) {
        this.form.parentId = data.id
      }
    },
    handleEdit(data) {
      this.dialogTitle = '编辑菜单'
      this.isEdit = true
      this.form = { ...data, parentId: data.parentId || 0 }
    },
    handleDelete(data) {
      this.$confirm('确定要删除该菜单吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.getMenuTree()
      }).catch(() => {})
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
          this.getMenuTree()
        }
      })
    },
    resetForm() {
      this.form = {
        id: undefined,
        parentId: 0,
        name: '',
        path: '',
        component: '',
        icon: '',
        sort: 0,
        permission: '',
        visible: 1,
        status: 1
      }
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.tree-actions {
  display: none;
}

.custom-tree-node:hover .tree-actions {
  display: inline-block;
}
</style>
