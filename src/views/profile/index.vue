<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">基本信息</div>
          <el-form ref="infoForm" :model="userInfo" :rules="rules" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.username" disabled />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="userInfo.nickname" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userInfo.phone" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="userInfo.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="0">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="userInfo.bio" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleUpdateInfo">保存修改</el-button>
              <el-button @click="showPwdDialog">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">账户信息</div>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户ID">{{ userInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="角色">
              <el-tag v-for="role in userInfo.roles" :key="role" size="small" style="margin-right: 5px;">
                {{ role }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userInfo.createTime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录">{{ userInfo.lastLoginTime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改密码" :visible.sync="pwdDialogVisible" width="450px" @closed="resetPwdForm">
      <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules" label-width="100px">
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input v-model="pwdForm.oldPassword" type="password" show-password placeholder="请输入当前密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password" show-password placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="pwdForm.confirmPassword" type="password" show-password placeholder="请再次输入新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="pwdDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdatePwd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'))
      } else {
        if (this.pwdForm.confirmPassword !== '') {
          this.$refs.pwdForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        id: 1,
        username: '',
        nickname: '',
        email: '',
        phone: '',
        gender: 0,
        bio: '',
        roles: ['admin'],
        createTime: '2024-01-01 00:00:00',
        lastLoginTime: '2024-01-15 10:30:00'
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      pwdDialogVisible: false,
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      pwdRules: {
        oldPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'userInfo'])
  },
  created() {
    this.userInfo = {
      id: 1,
      username: 'admin',
      nickname: '管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      gender: 1,
      bio: '这是一个管理员账号',
      roles: ['admin'],
      createTime: '2024-01-01 00:00:00',
      lastLoginTime: '2024-01-15 10:30:00'
    }
  },
  methods: {
    handleUpdateInfo() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.$message.success('修改成功')
        }
      })
    },
    showPwdDialog() {
      this.pwdDialogVisible = true
    },
    resetPwdForm() {
      this.$refs.pwdForm.resetFields()
    },
    handleUpdatePwd() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.$message.success('密码修改成功')
          this.pwdDialogVisible = false
        }
      })
    }
  }
}
</script>
