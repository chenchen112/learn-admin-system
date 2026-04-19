<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-header">
        <h2 class="login-title">Admin System</h2>
        <p class="login-subtitle">中后台管理系统</p>
      </div>
      
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            prefix-icon="el-icon-user"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="suffix"
              :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'"
              @click="showPwd"
              style="cursor: pointer;"
            />
          </el-input>
        </el-form-item>

        <el-form-item prop="captcha" v-if="showCaptcha">
          <div class="captcha-wrap">
            <el-input
              v-model="loginForm.captcha"
              placeholder="验证码"
              name="captcha"
              tabindex="3"
              auto-complete="off"
              prefix-icon="el-icon-key"
              @keyup.enter.native="handleLogin"
            />
            <img :src="captchaUrl" class="captcha-img" @click="refreshCaptcha" alt="验证码">
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.native.prevent="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>

        <div class="login-footer">
          <span>还没有账号？</span>
          <router-link to="/register" class="register-link">立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      showCaptcha: false,
      captchaUrl: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    refreshCaptcha() {
      this.captchaUrl = `/api/captcha?t=${Date.now()}`
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-wrap {
  width: 450px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
  
  .login-title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px;
  }
  
  .login-subtitle {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

.login-form {
  width: 100%;
  
  .el-input {
    height: 44px;
    
    ::v-deep .el-input__inner {
      height: 44px;
      line-height: 44px;
    }
  }
  
  .el-form-item {
    margin-bottom: 22px;
  }
}

.captcha-wrap {
  display: flex;
  align-items: center;
  
  .el-input {
    flex: 1;
  }
  
  .captcha-img {
    width: 120px;
    height: 44px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 4px;
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
}

.login-footer {
  text-align: center;
  font-size: 14px;
  color: #999;
  
  .register-link {
    color: #409EFF;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
