<template>
  <div class="login">
    <div class="login-form">
      <div class="fy-logo">
        <img :src="logo" />
      </div>
      <div class="fy-login">
        <mu-form ref="form" :model="validateForm"  class="mu-demo-form">
          <mu-form-item label="用户名"  prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
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
import request from '@/util/request.js'
import md5 from 'blueimp-md5'
import { token } from '@/util/common.js'
export default {
   data () {
    return {
      logo:"",
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      let me = this
      if ( ! this.$refs.form.validate()) {
        return 
      }
      console.log(me.validateForm.username,md5(me.validateForm.password))
      request({
        url: 'admin/user/login',
        method: 'post',
        data: {
          param:JSON.stringify({
            userName: me.validateForm.username,
            passWord: md5(me.validateForm.password)
          })
        }
      }).then((result) => {
        if (result && result.code == '0'){
           if (result.data) {
             token.setToken(result.data)
             me.$notice({
               type:'success',
               message: '登录成功'
             })
             setTimeout(() => {
               me.$router.push('/upload')
             },1500)
           }
        }
      })
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: ''
      };
    }
  }
}
</script>
<style scoped>
.login{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #f981a7;
    font-size:14px;
    color:#fff;
}
.login-form {
    width:80%;
    height:60%;
    margin: 80% auto 0 auto;
    transform:translateY(-50%);
}
.fy-logo {
    width:1rem;
    height:1rem;
    border-radius:100px;
    border:1px solid #fff;
    margin:0 auto;
    overflow:hidden;
    margin-bottom:1rem;
}
.mu-form {
  width:90%;
  margin:0 auto;
}
.mu-form-item__error .mu-form-item-help {
  color:#f44336;
}
.mu-form-item,.mu-form-item-content{
  margin-bottom:10px;
}
.fy-from-but {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:1rem;
}
</style>
