<template>
  <div>
    <el-container style="height: 100%">
      <el-header class="header">
        <div style="display: flex; width: 50vw; padding-left: 3vw">
          <img alt="Logo" class="LogoImg" src="../assets/logo.jpg" @click="toHome">
          <h3>Chuan Feng's ERP Sys</h3>
        </div>
        <el-dropdown @command="dropdownHandler" style="padding-right: 3vw">
        <span class="el-dropdown-link">{{userinfo.obj.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="UserSettings">User Settings</el-dropdown-item>
            <el-dropdown-item divided command="logoutBtn">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-divider class="divider"></el-divider>
      <el-container>
        <el-aside width="220px">
          <el-menu router style="height: 100%" @select="menuSel">
            <div :key="index" v-for="(item,index) in menuList" v-if="rolesCheck(item.roles) == 200">
              <el-submenu :index="item.id.toString()">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                  <el-menu-item :index="child.path" v-for="(child,index) in item.children" v-if="rolesCheck(child.roles) == 200" >
                    <i :class="child.icon"></i>
                    <span slot="title">{{child.name}}</span>
                  </el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-aside>

        <el-main v-if="isRouterAlive" style="height: 100%">
          <el-breadcrumb style="margin-bottom: 10px" v-show="this.$route.path != '/Home'" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="display: flex; justify-content: space-around" v-show="this.$route.path == '/Home'" class="mainPag">
            <div style="padding-bottom: 100px; width: 500px">
<!--              <img class="mainImg" alt="Logo" src="../assets/logo.jpg">-->
              <h1 style="color: orange">Daily News</h1>
              <el-collapse v-for="(item,index) in msgList" v-model="activeName" accordion>
                <el-collapse-item :title="item.title" :name="item.id">
                  <div>{{item.publishTime}}</div>
                  <div v-html="item.htmlContent"></div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div style="height: 350px; width: 600px">
              <vue-scroll :ops="ops">
                <el-timeline v-for="(item,index) in RecordDataMain">
                  <el-card style="margin-bottom: 5px; margin-right: 15px">
                    <span style="color: orange; margin-right: 10px">{{ item.nickname }}</span>
                    <span> Login at </span>
                    <span style="color: orange; margin-left: 10px">{{ item.loginTime }}</span>
                  </el-card>
                </el-timeline>
              </vue-scroll>
            </div>
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "Home",
  data() {
    return {
      msgList:[],
      activeName: '',
      ops: {
        rail: {
          keepShow: true,
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#9fef00', //滚动条颜色
          opacity: 0.8,
          'overflow-x': 'hidden',
        },
      },
      RecordDataMain: {},
      isRouterAlive: true,
      menuList:[],
      // roleList:[],
      userinfo: JSON.parse(window.sessionStorage.getItem('LoginUser')),
    }
  },

  mounted(){
    pubsub.subscribe('token',this.initMsgs);
    this.queryMenu();
    this.getRecordDataMain();
    this.initMsgs();
  },

  methods : {
    initMsgs(){
      this.$getRequest('/apis/msgPub/getMsgForMain').then(resp => {
        if(resp){
          this.msgList = resp;
        }
      })
    },

    getRecordDataMain(){
      this.$getRequest('/apis/sysSetting/getRecord').then(resp => {
        if(resp){
          this.RecordDataMain = resp;
        }
      })
    },

    menuSel(index){
      const route = this.$route
      const {path} = route
      if(index === path){
        this.reload()
      }
    },

    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function (){
        this.isRouterAlive = true
      })
    },

    rolesCheck(needRoles) { // 校验角色
      let authorities = this.userinfo.obj.authorities;// 获取用户的角色
      let code = 500;
      needRoles.forEach((item1,i) =>{
        authorities.forEach((item,i) => {
          if (item1.rname.indexOf(item.authority) != -1) {
            code = 200;
          }
        })
      })
      return code;
    },

    toHome(){
      this.$router.push('/Home').catch(err => err)
    },
    queryMenu(){
      this.$getRequest('/apis/queryMenu').then(
          response=>{
            this.menuList = response;
          }
      ).catch(()=>{
        this.$message({
          type: 'info',
          message: '404 error !'
        });
      })
    },

    dropdownHandler (command) {
      if (command == 'logoutBtn') {
        this.$confirm('You want to logout right now ?', 'Reminder', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$getRequest('/apis/logout').then(resp => {
            window.sessionStorage.removeItem('LoginUser');
            this.$router.replace('/');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel Success !'
          });
        });
      }
    },
  }
}
</script>

<style scoped>
  html,body {
    margin: 0;
    height: 100%;
  }
  .divider{
    margin: 0 auto;
  }
  .mainPag{
    margin-left: 30px;
    margin-top: 10px;
    height: 600px;
  }
  .mainImg{
    width: 200px;
    height: 250px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .LogoImg {
    cursor : pointer;
    padding-top: 10px;
    width: 35px;
    height: 45px;
    margin-right: 1vw;
  }
</style>
