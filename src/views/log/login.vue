<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.username"
        placeholder="用户名"
        style="width: 150px;"
        clearable
      />
      <el-select v-model="queryParams.status" placeholder="登录状态" clearable style="width: 120px;">
        <el-option label="成功" :value="1" />
        <el-option label="失败" :value="0" />
      </el-select>
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
    </div>

    <el-table v-loading="loading" :data="logList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="ip" label="登录IP" width="130" />
      <el-table-column prop="location" label="登录地点" width="150" />
      <el-table-column prop="browser" label="浏览器" width="120" />
      <el-table-column prop="os" label="操作系统" width="120" />
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
            {{ scope.row.status === 1 ? '成功' : '失败' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="message" label="消息" />
      <el-table-column prop="createTime" label="登录时间" width="160" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'LoginLog',
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
        status: undefined,
        dateRange: []
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
        this.logList = [
          { id: 1, username: 'admin', ip: '192.168.1.1', location: '北京市', browser: 'Chrome', os: 'Windows 10', status: 1, message: '登录成功', createTime: '2024-01-15 10:30:00' },
          { id: 2, username: 'admin', ip: '192.168.1.100', location: '上海市', browser: 'Firefox', os: 'Mac OS', status: 0, message: '密码错误', createTime: '2024-01-15 10:25:00' },
          { id: 3, username: 'editor', ip: '192.168.1.2', location: '广州市', browser: 'Chrome', os: 'Windows 10', status: 1, message: '登录成功', createTime: '2024-01-15 09:30:00' },
          { id: 4, username: 'user', ip: '192.168.1.3', location: '深圳市', browser: 'Safari', os: 'Mac OS', status: 0, message: '账号已禁用', createTime: '2024-01-15 08:30:00' },
          { id: 5, username: 'admin', ip: '192.168.1.1', location: '北京市', browser: 'Chrome', os: 'Windows 10', status: 1, message: '退出登录', createTime: '2024-01-14 18:00:00' }
        ]
        this.total = 5
        this.loading = false
      }, 500)
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}
.filter-container .el-input,
.filter-container .el-select,
.filter-container .el-date-editor {
  margin-right: 10px;
}
</style>
