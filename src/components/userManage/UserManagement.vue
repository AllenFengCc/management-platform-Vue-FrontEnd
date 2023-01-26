<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input class="searchInp" size="mini" placeholder="Please Enter Username or Nickname" v-model="keyWords" @keydown.native.enter="SearchUser"></el-input>
        <el-button icon="el-icon-search" size="mini" type="primary" @click="SearchUser">Search User</el-button>
      </div>
      <div>
        <el-button icon="el-icon-circle-plus-outline" size="mini" type="danger" @click="ShowDialog1" style="margin-right: 205px">Add User</el-button>
      </div>
    </div>
    <el-main style="height: 500px; margin-top: 10px" class="goTop">
      <el-backtop target=".goTop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
      <div style="display: flex;flex-wrap: wrap">
        <el-card class="box-card" v-for="(item,index) in usersInfos">
          <div slot="header" class="clearfix">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span style="color: dodgerblue; margin-left: 10px">Nickname: {{item.nickname}}</span>
            <el-tooltip content="Delete User" placement="top">
            <el-button style="float: right; margin: 0 0; padding: 0" type="text"><i class="el-icon-delete" style="color: red; font-size: 20px" @click="DeleteUser(item.id)"></i></el-button>
            </el-tooltip>
            <el-tooltip content="Edit User" placement="top">
            <el-button style="float: right; margin: 0 25px; padding: 0" type="text"><i class="el-icon-edit" style="color: orange; font-size: 20px" @click="ShowDialog(item.id,item.username,item.email,item.phoneNo,item.nickname)"></i></el-button>
            </el-tooltip>
          </div>

          <el-dialog
              title="Editing Page"
              :visible.sync="EditDialogVisible"
              width="30%"
              center>
            <div style="text-align: center">
              <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 54px">ID</el-tag>
                <el-input disabled size="mini" style="width: 70%;" v-model="userStatusChange.id"></el-input>
              </div>
              <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Username</el-tag>
                <el-input size="mini" style="width: 70%" v-model="userStatusChange.username"></el-input>
              </div>
              <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Nickname</el-tag>
                <el-input size="mini" style="width: 70%" v-model="userStatusChange.nickname"></el-input>
              </div>
              <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 35px">Email</el-tag>
                <el-input size="mini" style="width: 70%" v-model="userStatusChange.email"></el-input>
              </div>
              <div><el-tag class="tagmargin" size="small" type="success" style="padding-right: 12px">PhoneNo</el-tag>
                <el-input size="mini" style="width: 70%" v-model="userStatusChange.phoneNo"></el-input>
              </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="EditDialogVisible = false">Cancel</el-button>
              <el-button size="mini" type="primary" @click="UpdateSub(userStatusChange.id,userStatusChange.username,userStatusChange.email,userStatusChange.phoneNo,userStatusChange.nickname)">Submit</el-button>
              </span>
          </el-dialog>

          <div class="text item">
            <div>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">Username</el-tag>{{item.username}}</p>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">Gender</el-tag>
                <span v-if="item.gender">male</span>
                <span v-else>female</span>
              </p>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">Email</el-tag>{{item.email}}</p>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">PhoneNo</el-tag>{{item.phoneNo}}</p>
            </div>
            <div>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">EnabledStatus</el-tag>
                <span v-if="LoginUser.obj.id == item.id">
                  <el-switch style="margin-left: 5px"
                             disabled
                             @change="handleEnabled(item.id,item.enabled)"
                             v-model="item.enabled"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                  >
                </el-switch>
                </span>
                <span v-else>
                  <el-switch style="margin-left: 5px"
                             @change="handleEnabled(item.id,item.enabled)"
                             v-model="item.enabled"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                  >
                </el-switch>
                </span>
              </p>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">LockStatus</el-tag>
                <span v-if="LoginUser.obj.id == item.id">
                  <el-switch style="margin-left: 5px"
                             disabled
                             @change="handleLock(item.id,item.nonLocked)"
                             v-model="item.nonLocked"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                  >
                  </el-switch>
                </span>
                <span v-else>
                  <el-switch style="margin-left: 5px"
                             @change="handleLock(item.id,item.nonLocked)"
                             v-model="item.nonLocked"
                             active-color="#13ce66"
                             inactive-color="#ff4949"
                  >
                  </el-switch>
                </span>
              </p>
              <p class="text"><el-tag class="tagmargin" size="small" type="success">Roles</el-tag>
                <el-select
                    ref="multiSelect"
                    @remove-tag="removeTag(item.id)"
                    @change="roleChange(item.roles)"
                    @visible-change="removeTag(item.id)"
                    style="width: 70%;"
                    size="mini"
                    v-model="item.roles"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Select Roles">
                  <el-option
                      v-for="itemR in rolesInfos"
                      :key="itemR.id"
                      :label="itemR.rnameZh"
                      :value="itemR.id">
                  </el-option>
                </el-select>
              </p>
            </div>
          </div>
          <el-divider class="divider"></el-divider>
          <div>
            <p class="text"><el-tag class="tagmargin" size="small" type="warning">CreateTime</el-tag><i style="margin-right: 3px" class="el-icon-time"></i>{{item.createTime}}</p>
            <p class="text"><el-tag class="tagmargin" size="small" type="warning">UpdateTime</el-tag><i style="margin-right: 3px" class="el-icon-time"></i>{{item.updateTime}}</p>
          </div>
        </el-card>

        <el-dialog
            title="Add User"
            :visible.sync="EditDialogVisible1"
            width="30%"
            :before-close="handleClose"
            center>
          <div style="text-align: center">
            <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Username</el-tag>
              <el-input size="mini" style="width: 70%" v-model="userStatusChange.username"></el-input>
            </div>
            <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 12px">Password</el-tag>
              <el-input size="mini" style="width: 70%" v-model="userStatusChange.password"></el-input>
            </div>
            <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Nickname</el-tag>
              <el-input size="mini" style="width: 70%" v-model="userStatusChange.nickname"></el-input>
            </div>
            <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 35px">Email</el-tag>
              <el-input size="mini" style="width: 70%" v-model="userStatusChange.email"></el-input>
            </div>
            <div style="margin-bottom: 30px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 12px">PhoneNo</el-tag>
              <el-input size="mini" style="width: 70%" v-model="userStatusChange.phoneNo"></el-input>
            </div>
            <div><el-tag class="tagmargin" size="small" type="warning" style="margin-right: 30px; width: 20%">Gender</el-tag>
              <el-radio size="mini" v-model="userStatusChange.gender" label="true">Male</el-radio>
              <el-radio size="mini" v-model="userStatusChange.gender" label="false">Female</el-radio>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="handleClose">Cancel</el-button>
              <el-button size="mini" type="primary" @click="addUser(userStatusChange.username,userStatusChange.password,userStatusChange.gender,userStatusChange.nickname,userStatusChange.email,userStatusChange.phoneNo)">Submit</el-button>
              </span>
        </el-dialog>

      </div>
    </el-main>
    <el-pagination
        background
        @current-change="currentChange"
        style="margin: 20px 0;"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="pageNum"
        layout="total, prev, pager, next, jumper"
        :total=total>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  data(){
    return{
      EditDialogVisible: false,
      EditDialogVisible1: false,
      LoginUser: JSON.parse(window.sessionStorage.getItem('LoginUser')),
      userStatusChange:{
        id: 0,
        enabled: true,
        nonLocked: true,
        roleIds:[],
        username: '',
        email: '',
        phoneNo: '',
        nickname: '',
        password: '',
        gender: '',
      },
      usersInfos: [],
      rolesInfos: [],
      total : 0,
      pageNum : 1,
      pageSize : 4,
      keyWords: '',
    }
  },


  methods: {
    handleClose(done) {
      this.$confirm('Infos do not save, close anyway ?' )
          .then(_ => {
            done(this.EditDialogVisible1 = false);
          })
          .catch(_ => {
          });
      // this.$confirm('Infos do not save, close anyway ?', 'Message', {
      //   confirmButtonText: 'Confirm',
      //   cancelButtonText: 'Cancel',
      //   type: 'warning'
      // }).then(_ => {
      //   done(this.EditDialogVisible1 = false);
      // })
      //     .catch(_ => {
      //     });
    },

    addUser(username,password,gender,nickname,email,phoneNo){
      this.userStatusChange.username = username;
      this.userStatusChange.password = password;
      this.userStatusChange.nickname = nickname;
      this.userStatusChange.email = email;
      this.userStatusChange.phoneNo = phoneNo;
      this.userStatusChange.gender = gender;
      if(this.userStatusChange.username == "" || this.userStatusChange.username == null || this.userStatusChange.password == "" || this.userStatusChange.password == null){
        this.$message({
          type: 'error',
          message: 'Username and Password must be entered'
        });
      } else {
        this.$postRequest("/apis/user/addUser",this.userStatusChange).then(resp => {
          this.initUsersInfos();
          // alert(this.userStatusChange.username+this.userStatusChange.password+this.userStatusChange.nickname+this.userStatusChange.email+this.userStatusChange.phoneNo+this.userStatusChange.gender);
        })
        this.EditDialogVisible1 = false
      }
    },

    UpdateSub(id,username,email,phoneNo,nickname){
      this.userStatusChange.id = id;
      this.userStatusChange.username = username;
      this.userStatusChange.nickname = nickname;
      this.userStatusChange.email = email;
      this.userStatusChange.phoneNo = phoneNo;
      this.$putRequest("/apis/user/updateUserInfos",this.userStatusChange).then(resp => {
        this.initUsersInfos();
      })
      this.EditDialogVisible = false
    },

    ShowDialog(id,username,email,phoneNo,nickname){
      this.EditDialogVisible = true;
      this.userStatusChange.id = id;
      this.userStatusChange.username = username;
      this.userStatusChange.nickname = nickname;
      this.userStatusChange.email = email;
      this.userStatusChange.phoneNo = phoneNo;
    },

    ShowDialog1(){
      this.EditDialogVisible1 = true;
      this.userStatusChange.username = "";
      this.userStatusChange.password = "";
      this.userStatusChange.nickname = "";
      this.userStatusChange.email = "";
      this.userStatusChange.phoneNo = "";
      this.userStatusChange.gender = "";
    },

    DeleteUser(id){
      this.$confirm('Delete User, Continue ?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.userStatusChange.id = id;
        this.$delRequest("/apis/user/DeleteUserByID",this.userStatusChange).then(resp => {
          this.initUsersInfos();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled Action !'
        });
        this.initUsersInfos();
      });
    },

    removeTag(id) { // 多选模式下移除tag时回调
      this.userStatusChange.id = id;
    },

    roleChange(roles){
      setTimeout(() => {
        this.$refs.multiSelect[0].blur();
        this.$confirm('Change User Roles, Continue ?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          this.userStatusChange.roleIds = roles;
          // 发送 更新 角色请求
          this.$putRequest("/apis/user/updateUserRoles",this.userStatusChange).then(resp => {
            this.initUsersInfos();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled Change !'
          });
          this.initUsersInfos();
        });
      }, 50)
    },

    handleEnabled(id,enabled){
      this.userStatusChange.id = id;
      this.userStatusChange.enabled = enabled;
      this.$putRequest("/apis/user/updateEnabled",this.userStatusChange).then(resp => {
        this.initUsersInfos();
      })
    },

    handleLock(id,nonLocked){
      this.userStatusChange.id = id;
      this.userStatusChange.nonLocked = nonLocked;
      this.$putRequest("/apis/user/updateNonLocked",this.userStatusChange).then(resp => {
        this.initUsersInfos();
      })
    },

    currentChange(pageNum){
      this.pageNum = pageNum;
      this.initUsersInfos(this.keyWords);
    },

    initRolesInfos(){
      this.$getRequest('/apis/role/').then(resp => {
        if(resp){
          this.rolesInfos = resp;
        }
      })
    },

    SearchUser(){
      this.pageNum = 1;
      this.initUsersInfos();
    },

    initUsersInfos(){
      this.$getRequest('/apis/user/getUserInfos/?keyWords='+this.keyWords+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then(resp => {
        if(resp){
          this.usersInfos = resp.list;
          this.total = resp.total;
          this.usersInfos.forEach((item,index)=>{
            let temp = item.roles;
            item.roles = [];
            for (let i in temp) {
              item.roles.push(temp[i].id);
            }
          })
        }
      })
    },
  },

  mounted() {
    this.initRolesInfos();
    this.initUsersInfos();
  }
}
</script>

<style scoped>
  .goTop{
    height: 100vh;
    overflow-x: hidden;
  }

  .searchInp{
    width: 300px;
    margin-right: 10px;
  }
  .text {
    font-size: 13px;
    color: dodgerblue;
  }

  .item {
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 460px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .tagmargin{
    margin-right: 8px;
  }
</style>
