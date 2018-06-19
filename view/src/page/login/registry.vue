<template>
  <div class="login">
    <div class="login-form">
      <div class="fy-logo">
        <img :src="logo" />
      </div>
      <div class="fy-login">
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="用户名"  prop="username" :rules="rules.userRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="rules.passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="qpassword" :rules="rules.passwordRules">
            <mu-text-field type="password" v-model="validateForm.qpassword" prop="qpassword"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" prop="tel" :rules="rules.telRules">
            <mu-text-field v-model="validateForm.tel" prop="tel"></mu-text-field>
          </mu-form-item>
          <div class="fy-from-but">
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </div>
          
        </mu-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/util/request.js";
import md5 from "blueimp-md5";
import { token } from "@/util/common.js";
export default {
  data() {
    return {
      logo: "",
      rules: {
        userRules: [
          {
            validate: val => {
              let reg = /^[a-zA-Z0-9_-]{4,16}$/
              return reg.test(val);
            },
            message: "以数字、下划线、字母为首字母 4-16 位"
          }
        ],
        passwordRules: [
          {
            validate: () => {
              let reg = /^[\w]{6,12}$/
              return reg.test(val)
            },
            message: "只能数字、下划线、字母6-12 位"
          }
        ],
        telRules: [{
           validate: val => {
              let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
              return reg.test(val)
            },
            message: "请输入正确手机号"
        }]
      },
      validateForm: {
        username: "",
        password: "",
        qpassword: "",
        tel: ""
      }
    }
  },
  methods: {
    submit() {
      let me = this
      if (!this.$refs.form.validate()) {
        return
      }
      if (me.validateForm.password !== me.validateForm.qpassword ) {
        me.$notice({
          type: 'error',
          message: '两次密码不一致'
        })
        return 
      }
      request({
        url: "admin/user/registry",
        method: "post",
        data: {
          param: JSON.stringify({
            userName: me.validateForm.username,
            passWord: md5(me.validateForm.password)
          })
        }
      }).then(result => {
        if (result && result.code == "0") {
          if (result.data) {
            token.setToken(result.data);
            me.$notice({
              type: "success",
              message: "注册成功"
            });
            setTimeout(() => {
              me.$route.push("/upload");
            }, 1500);
          }
        }
      })
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
         username: "",
        password: "",
        qpassword: "",
        tel: ""
      }
    }
  }
}
</script>
<style scopd>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f981a7;
  font-size: 14px;
  color: #fff;
}
.login-form {
  width: 80%;
  height: 100%;
  margin: 100% auto 0 auto;
  transform: translateY(-50%);
}
.fy-logo {
  width: 1rem;
  height: 1rem;
  border-radius: 100px;
  border: 1px solid #fff;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 1rem;
}
.mu-form {
  width: 90%;
  margin: 0 auto;
}
.mu-form-item-label,
.mu-form-item-help {
  font-size: 14px;
  color: #fff;
}
.mu-form-item__error .mu-form-item-help {
  color: #f9e79f;
}
.mu-form-item,
.mu-form-item-content {
  margin-bottom: 10px;
}
.fy-from-but {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:1rem;
}
</style>
