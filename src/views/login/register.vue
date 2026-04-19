<template>
  <div class="register-container">
    <div class="register-form-wrap">
      <div class="register-header">
        <h2 class="register-title">用户注册</h2>
        <p class="register-subtitle">创建您的账号</p>
      </div>

      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            prefix-icon="el-icon-user"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="邮箱"
            name="email"
            type="text"
            tabindex="2"
            auto-complete="on"
            prefix-icon="el-icon-message"
          />
        </el-form-item>

        <el-form-item prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="手机号"
            name="phone"
            type="text"
            tabindex="3"
            auto-complete="on"
            prefix-icon="el-icon-mobile-phone"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="4"
            auto-complete="on"
            prefix-icon="el-icon-lock"
          >
            <i
              slot="suffix"
              class="el-icon-view"
              @click="showPwd"
              style="cursor: pointer"
            />
          </el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            :type="confirmPasswordType"
            placeholder="确认密码"
            name="confirmPassword"
            tabindex="5"
            auto-complete="on"
            prefix-icon="el-icon-lock"
          >
            <i
              slot="suffix"
              class="el-icon-view"
              @click="showConfirmPwd"
              style="cursor: pointer"
            />
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="register-btn"
            @click.native.prevent="handleRegister"
          >
            注 册
          </el-button>
        </el-form-item>

        <div class="register-footer">
          <span>已有账号？</span>
          <router-link to="/login" class="login-link">立即登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validEmail, validPhone } from "@/utils/validate";
import { register } from "@/api/user";

export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (value.length < 3) {
        callback(new Error("用户名长度不能少于3位"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (!validPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不能少于6位"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateConfirmPassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      confirmPasswordType: "password",
    };
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
    },
    showConfirmPwd() {
      this.confirmPasswordType =
        this.confirmPasswordType === "password" ? "" : "password";
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then(() => {
              this.$message.success("注册成功，请登录");
              this.$router.push("/login");
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-form-wrap {
  width: 450px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;

  .register-title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px;
  }

  .register-subtitle {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

.register-form {
  width: 100%;

  .el-input {
    height: 44px;

    ::v-deep .el-input__inner {
      height: 44px;
      line-height: 44px;
    }
  }

  .el-form-item {
    margin-bottom: 18px;
  }
}

.register-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
}

.register-footer {
  text-align: center;
  font-size: 14px;
  color: #999;

  .login-link {
    color: #409eff;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
