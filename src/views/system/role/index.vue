<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.name"
        placeholder="角色名称"
        style="width: 200px;"
        clearable
        @keyup.enter.native="handleQuery"
      />
      <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增角色</el-button>
    </div>

    <el-table v-loading="loading" :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" width="150" />
      <el-table-column prop="code" label="角色标识" width="150" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handlePermission(scope.row)">分配权限</el-button>
          <el-button type="text" size="small" style="color: #F56C6C;" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getList"
    />

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色标识" prop="code">
          <el-input v-model="form.code" placeholder="请输入角色标识" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配权限" :visible.sync="permissionDialogVisible" width="500px">
      <el-tree
        ref="permissionTree"
        :data="permissionTree"
        :props="{ children: 'children', label: 'name' }"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedPermissions"
      />
      <div slot="footer">
        <el-button @click="permissionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'RoleManage',
  components: { Pagination },
  data() {
    return {
      loading: false,
      roleList: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        name: ''
      },
      dialogVisible: false,
      dialogTitle: '',
      isEdit: false,
      form: {
        id: undefined,
        name: '',
        code: '',
        description: '',
        status: 1
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入角色标识', trigger: 'blur' }]
      },
      permissionDialogVisible: false,
      permissionTree: [],
      checkedPermissions: [],
      currentRoleId: null
    }
  },
  created() {
    this.getList()
    this.getPermissionTree()
  },
  methods: {
    getList() {
      this.loading = true
      setTimeout(() => {
        this.roleList = [
          { id: 1, name: '超级管理员', code: 'admin', description: '拥有所有权限', status: 1, createTime: '2024-01-01 00:00:00' },
          { id: 2, name: '编辑员', code: 'editor', description: '编辑内容权限', status: 1, createTime: '2024-01-02 00:00:00' },
          { id: 3, name: '普通用户', code: 'user', description: '基础访问权限', status: 1, createTime: '2024-01-03 00:00:00' }
        ]
        this.total = 3
        this.loading = false
      }, 500)
    },
    getPermissionTree() {
      this.permissionTree = [
        {
          id: 1,
          name: '系统管理',
          children: [
            { id: 11, name: '用户管理' },
            { id: 12, name: '角色管理' },
            { id: 13, name: '菜单管理' },
            { id: 14, name: '系统配置' }
          ]
        },
        {
          id: 2,
          name: '日志管理',
          children: [
            { id: 21, name: '操作日志' },
            { id: 22, name: '登录日志' }
          ]
        }
      ]
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleAdd() {
      this.resetForm()
      this.dialogTitle = '新增角色'
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.resetForm()
      this.dialogTitle = '编辑角色'
      this.isEdit = true
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定要删除该角色吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },
    handlePermission(row) {
      this.currentRoleId = row.id
      this.checkedPermissions = row.id === 1 ? [11, 12, 13, 14, 21, 22] : row.id === 2 ? [11, 12] : [11]
      this.permissionDialogVisible = true
    },
    handlePermissionSubmit() {
      this.$message.success('权限分配成功')
      this.permissionDialogVisible = false
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success(this.isEdit ? '编辑成功' : '新增成功')
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    resetForm() {
      this.form = {
        id: undefined,
        name: '',
        code: '',
        description: '',
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
.filter-container {
  margin-bottom: 20px;
}
.filter-container .el-input {
  margin-right: 10px;
}
</style>
