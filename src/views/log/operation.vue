<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.username"
        placeholder="操作人"
        style="width: 150px;"
        clearable
      />
      <el-input
        v-model="queryParams.operation"
        placeholder="操作内容"
        style="width: 200px;"
        clearable
      />
      <el-date-picker
        v-model="queryParams.dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        style="width: 240px;"
      />
      <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="handleClear">清空日志</el-button>
    </div>

    <el-table v-loading="loading" :data="logList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="操作人" width="100" />
      <el-table-column prop="operation" label="操作内容" />
      <el-table-column prop="method" label="请求方法" width="100" />
      <el-table-column prop="ip" label="IP地址" width="130" />
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
            {{ scope.row.status === 1 ? '成功' : '失败' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="操作时间" width="160" />
      <el-table-column label="操作" fixed="right" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
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

    <el-dialog title="日志详情" :visible.sync="dialogVisible" width="600px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="操作人">{{ currentLog.username }}</el-descriptions-item>
        <el-descriptions-item label="操作时间">{{ currentLog.createTime }}</el-descriptions-item>
        <el-descriptions-item label="IP地址">{{ currentLog.ip }}</el-descriptions-item>
        <el-descriptions-item label="请求方法">{{ currentLog.method }}</el-descriptions-item>
        <el-descriptions-item label="请求URL" :span="2">{{ currentLog.url }}</el-descriptions-item>
        <el-descriptions-item label="操作内容" :span="2">{{ currentLog.operation }}</el-descriptions-item>
        <el-descriptions-item label="请求参数" :span="2">
          <pre style="margin: 0; white-space: pre-wrap;">{{ currentLog.params }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="响应结果" :span="2">
          <pre style="margin: 0; white-space: pre-wrap;">{{ currentLog.result }}</pre>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'OperationLog',
  components: { Pagination },
  data() {
    return {
      loading: false,
      logList: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        username: '',
        operation: '',
        dateRange: []
      },
      dialogVisible: false,
      currentLog: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      setTimeout(() => {
        this.logList = [
          { id: 1, username: 'admin', operation: '登录系统', method: 'POST', ip: '192.168.1.1', status: 1, createTime: '2024-01-15 10:30:00', url: '/api/user/login', params: '{}', result: '{"code":200}' },
          { id: 2, username: 'admin', operation: '新增用户', method: 'POST', ip: '192.168.1.1', status: 1, createTime: '2024-01-15 10:25:00', url: '/api/user', params: '{"username":"test"}', result: '{"code":200}' },
          { id: 3, username: 'editor', operation: '修改配置', method: 'PUT', ip: '192.168.1.2', status: 1, createTime: '2024-01-15 10:20:00', url: '/api/config/1', params: '{"value":"new"}', result: '{"code":200}' },
          { id: 4, username: 'admin', operation: '删除角色', method: 'DELETE', ip: '192.168.1.1', status: 0, createTime: '2024-01-15 10:15:00', url: '/api/role/5', params: '{}', result: '{"code":500}' },
          { id: 5, username: 'editor', operation: '导出日志', method: 'GET', ip: '192.168.1.2', status: 1, createTime: '2024-01-15 10:10:00', url: '/api/log/export', params: '{}', result: 'file' }
        ]
        this.total = 5
        this.loading = false
      }, 500)
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.currentLog = row
      this.dialogVisible = true
    },
    handleClear() {
      this.$confirm('确定要清空所有日志吗？此操作不可恢复！', '警告', {
        type: 'warning'
      }).then(() => {
        this.$message.success('日志已清空')
        this.getList()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}
.filter-container .el-input,
.filter-container .el-date-editor {
  margin-right: 10px;
}
</style>
