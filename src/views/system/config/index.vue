<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.key"
        placeholder="配置键名"
        style="width: 200px;"
        clearable
        @keyup.enter.native="handleQuery"
      />
      <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增配置</el-button>
      <el-button type="warning" icon="el-icon-refresh" @click="handleRefreshCache">刷新缓存</el-button>
    </div>

    <el-table v-loading="loading" :data="configList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="key" label="配置键名" width="200" />
      <el-table-column prop="value" label="配置值" show-overflow-tooltip />
      <el-table-column prop="description" label="描述" width="200" />
      <el-table-column prop="group" label="分组" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
        <el-form-item label="配置键名" prop="key">
          <el-input v-model="form.key" placeholder="请输入配置键名" />
        </el-form-item>
        <el-form-item label="配置值" prop="value">
          <el-input v-model="form.value" type="textarea" :rows="3" placeholder="请输入配置值" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="分组" prop="group">
          <el-select v-model="form.group" placeholder="请选择分组" style="width: 100%;">
            <el-option label="系统配置" value="system" />
            <el-option label="邮件配置" value="email" />
            <el-option label="存储配置" value="storage" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'ConfigManage',
  components: { Pagination },
  data() {
    return {
      loading: false,
      configList: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        key: ''
      },
      dialogVisible: false,
      dialogTitle: '',
      isEdit: false,
      form: {
        id: undefined,
        key: '',
        value: '',
        description: '',
        group: 'system'
      },
      rules: {
        key: [{ required: true, message: '请输入配置键名', trigger: 'blur' }],
        value: [{ required: true, message: '请输入配置值', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      setTimeout(() => {
        this.configList = [
          { id: 1, key: 'site_name', value: 'Admin System', description: '站点名称', group: 'system', createTime: '2024-01-01 00:00:00' },
          { id: 2, key: 'site_description', value: '中后台管理系统', description: '站点描述', group: 'system', createTime: '2024-01-01 00:00:00' },
          { id: 3, key: 'smtp_host', value: 'smtp.example.com', description: 'SMTP服务器地址', group: 'email', createTime: '2024-01-01 00:00:00' },
          { id: 4, key: 'smtp_port', value: '587', description: 'SMTP端口', group: 'email', createTime: '2024-01-01 00:00:00' },
          { id: 5, key: 'upload_max_size', value: '10485760', description: '上传文件最大大小(字节)', group: 'storage', createTime: '2024-01-01 00:00:00' }
        ]
        this.total = 5
        this.loading = false
      }, 500)
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleAdd() {
      this.resetForm()
      this.dialogTitle = '新增配置'
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.resetForm()
      this.dialogTitle = '编辑配置'
      this.isEdit = true
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定要删除该配置吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },
    handleRefreshCache() {
      this.$message.success('缓存刷新成功')
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
        key: '',
        value: '',
        description: '',
        group: 'system'
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
