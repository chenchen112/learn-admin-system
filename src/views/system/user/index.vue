<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.username"
        placeholder="用户名"
        style="width: 200px"
        clearable
        @keyup.enter.native="handleQuery"
      />
      <el-select v-model="queryParams.status" placeholder="状态" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleQuery"
        >搜索</el-button
      >
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
        >新增用户</el-button
      >
    </div>

    <el-table v-loading="loading" :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="nickname" label="昵称" width="120" />
      <el-table-column prop="email" label="邮箱" min-width="180" />
      <el-table-column prop="phone" label="手机号" width="130" />
      <el-table-column prop="roles" label="角色" width="150">
        <template slot-scope="scope">
          <el-tag
            v-for="role in scope.row.roles"
            :key="role"
            size="small"
            style="margin-right: 5px"
          >
            {{ role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" fixed="right" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleAssignRole(scope.row)"
            >分配角色</el-button
          >
          <el-button type="text" size="small" @click="handleResetPwd(scope.row)"
            >重置密码</el-button
          >
          <el-button
            type="text"
            size="small"
            class="danger-btn"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            :disabled="isEdit"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
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

    <el-dialog title="分配角色" :visible.sync="roleDialogVisible" width="400px">
      <el-checkbox-group v-model="selectedRoles">
        <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">
          {{ role.name }}
        </el-checkbox>
      </el-checkbox-group>
      <div slot="footer">
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRoleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "UserManage",
  components: { Pagination },
  data() {
    return {
      loading: false,
      userList: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        username: "",
        status: undefined,
      },
      dialogVisible: false,
      dialogTitle: "",
      isEdit: false,
      form: {
        id: undefined,
        username: "",
        nickname: "",
        email: "",
        phone: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      roleDialogVisible: false,
      selectedRoles: [],
      allRoles: [],
      currentUserId: null,
    };
  },
  created() {
    this.getList();
    this.getAllRoles();
  },
  methods: {
    getList() {
      this.loading = true;
      setTimeout(() => {
        this.userList = [
          {
            id: 1,
            username: "admin",
            nickname: "管理员",
            email: "admin@example.com",
            phone: "13800138000",
            roles: ["admin"],
            status: 1,
            createTime: "2024-01-01 00:00:00",
          },
          {
            id: 2,
            username: "editor",
            nickname: "编辑员",
            email: "editor@example.com",
            phone: "13800138001",
            roles: ["editor"],
            status: 1,
            createTime: "2024-01-02 00:00:00",
          },
          {
            id: 3,
            username: "user",
            nickname: "普通用户",
            email: "user@example.com",
            phone: "13800138002",
            roles: ["user"],
            status: 0,
            createTime: "2024-01-03 00:00:00",
          },
        ];
        this.total = 3;
        this.loading = false;
      }, 500);
    },
    getAllRoles() {
      this.allRoles = [
        { id: 1, name: "admin" },
        { id: 2, name: "editor" },
        { id: 3, name: "user" },
      ];
    },
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    handleAdd() {
      this.resetForm();
      this.dialogTitle = "新增用户";
      this.isEdit = false;
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.resetForm();
      this.dialogTitle = "编辑用户";
      this.isEdit = true;
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确定要删除该用户吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },
    handleStatusChange(row) {
      this.$message.success(`用户 ${row.username} 状态已更新`);
    },
    handleAssignRole(row) {
      this.currentUserId = row.id;
      this.selectedRoles = row.roles
        ? row.roles
            .map((r) => this.allRoles.find((ar) => ar.name === r)?.id)
            .filter(Boolean)
        : [];
      this.roleDialogVisible = true;
    },
    handleRoleSubmit() {
      this.$message.success("角色分配成功");
      this.roleDialogVisible = false;
      this.getList();
    },
    handleResetPwd(row) {
      this.$confirm(`确定要重置用户 ${row.username} 的密码吗？`, "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("密码已重置为默认密码");
        })
        .catch(() => {});
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success(this.isEdit ? "编辑成功" : "新增成功");
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    resetForm() {
      this.form = {
        id: undefined,
        username: "",
        nickname: "",
        email: "",
        phone: "",
        password: "",
        status: 1,
      };
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
    },
  },
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.filter-container .el-input,
.filter-container .el-select {
  margin-right: 0;
}
.danger-btn {
  color: #f56c6c;
}
</style>
