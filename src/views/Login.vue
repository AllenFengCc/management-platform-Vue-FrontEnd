<template>
  <div>
    <div style="text-align: center; margin-top: 5vw; padding-bottom: 2vw">
      <img alt="Logo" class="LogoImage" src="../assets/logo.jpg">
    </div>
    <div>
      <h3 class="a">Sign in to CF's ERP</h3>
    </div>
    <div class="loginPage">
      <el-form :rules="rules" :model="loginData" ref="loginForm">
        <label>Username</label>
        <el-form-item prop="username">
          <el-input @keydown.native.enter="submitForm" size="small" v-model="loginData.username" placeholder="Username" tabindex=1></el-input>
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
          <label>Password</label>
          <el-link style="font-size: 10px; color: dodgerblue" href="javascript:void(0)" target="">Forget Password ?</el-link>
        </div>
        <el-form-item prop="password">
          <el-input @keydown.native.enter="submitForm" type="password" size="small" v-model="loginData.password" placeholder="Password" prefix-icon="el-icon-lock" show-password tabindex=2></el-input>
        </el-form-item>
        <el-form-item style="text-align: center; margin-top: 0">
          <el-checkbox v-model="rememberMe" name="remember-me">Remember ME</el-checkbox>
        </el-form-item>
        <div style="text-align: center; display: flex; justify-content: space-around">
          <el-button size="small" type="success" @click="submitForm('ruleForm')">Login</el-button>
          <el-button size="small" type="warning" @click="resetForm('ruleForm')">Reset</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import {postKeyValueRequest} from "@/utils/apis";

  export default {
    name: "Login",
    data() {
      return {
        rememberMe: true,
        loginData: {
          username: 'admin',
          password: '123',
          // loginTime: '',
        },
        rules:{
          username:[{required:true,message:'please enter the username',trigger:'blur'}],
          password:[{required:true,message:'please enter the password',trigger:'blur'}]
        }
      }
    },

    methods: {
      // getDate(){
      //   var LogDate = new Date();
      //   return {
      //     LogDate
      //   }
      // },

      submitForm() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {

            //postKeyValueRequest('localhost:8082/doLogin',this.loginData)
            this.$postKeyValueRequest('/apis/doLogin',this.loginData).then(resp => {
              if(resp){
                // this.getDate();
                window.sessionStorage.setItem('LoginUser',JSON.stringify(resp));
                // window.sessionStorage.setItem("LoginDate",JSON.stringify(this.getDate()));
                this.$router.replace('/Home')
              }
            })
          } else {
            this.$message.warning('error submit!!');
            return false;
          }
        });
      },

      resetForm() {
        this.$refs['loginForm'].resetFields();
      }
    },
  }
</script>

<style>
  .loginPage{
    width: 20vw;
    margin: auto;
    padding: 1vw;
    background: whitesmoke;
    border-radius: 10px;
    padding-bottom: 2vw;
  }
  .a{
    text-align: center;
    margin: auto;
    padding-bottom: 1vw;
  }
  .LogoImage{
    width: 50px;
    height: 60px;
  }
</style>
