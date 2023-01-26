<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input class="searchInp" size="mini" placeholder="Please Enter Application Name" v-model="keyWords" @keydown.native.enter="searchApp"></el-input>
        <el-button icon="el-icon-search" size="mini" type="primary" @click="searchApp">Search Application</el-button>
      </div>
      <div>
        <el-button icon="el-icon-circle-plus-outline" size="mini" type="danger" @click="ShowDialog" style="margin-right: 205px">Add Application</el-button>
      </div>
    </div>
    <el-main style="height: 500px; margin-top: 10px" class="goTop">
      <el-backtop target=".goTop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
      <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            label="Application"
            width="130">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>Name: {{ scope.row.applicationName }}</p>
              <p>Description: {{ scope.row.appDescription }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.applicationName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            label="Project Type"
            width="130">
          <template slot-scope="scope">
            <el-tag type="warning" size="medium">{{ scope.row.typeName }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            label="App Key"
            width="300">
          <template slot-scope="scope">
            <el-tag type="danger" size="medium">{{ scope.row.appKey }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            label="Create Time"
            width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="Update Time"
            width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <el-tooltip content="Edit" placement="left">
            <el-button
                icon="el-icon-edit-outline"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
            <el-button
                icon="el-icon-document-delete"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog
          title="Editing Page"
          :before-close="handleClose"
          :visible.sync="EditDialogVisible"
          width="35%"
          center>
        <div style="text-align: center">
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 60px">ID</el-tag>
            <el-input disabled size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.id"></el-input>
          </div>
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Application</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.applicationName"></el-input>
          </div>
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Type Name</el-tag>
            <el-input disabled size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.typeName"></el-input>
          </div>
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="danger" style="padding-right: 27px">App Key</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.appKey"></el-input>
          </div>
          <div><el-tag class="tagmargin" size="small" type="success" style="padding-right: 9px">Description</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.appDescription"></el-input>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="handleClose">Cancel</el-button>
              <el-button size="mini" type="primary" @click="UpdateSub(rowData.id,rowData.applicationName,rowData.appKey,rowData.appDescription)">Submit</el-button>
              </span>
      </el-dialog>

      <el-dialog
          title="Editing Page"
          :before-close="handleClose"
          :visible.sync="EditDialogVisible1"
          width="35%"
          center>
        <div style="text-align: center">
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success">Application</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.applicationName"></el-input>
          </div>
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="danger" style="padding-right: 27px">App Key</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.appKey"></el-input>
          </div>
          <div style="margin-bottom: 20px"><el-tag class="tagmargin" size="small" type="success" style="padding-right: 9px">Description</el-tag>
            <el-input size="mini" style="width: 70%; margin-left: 10px" v-model="rowData.appDescription"></el-input>
          </div>
          <div><el-tag class="tagmargin" size="small" type="success">Type Name</el-tag>
            <el-select style="padding-left: 20px" size="mini" v-model="value" placeholder="Please Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="handleClose">Cancel</el-button>
              <el-button size="mini" type="primary" @click="AddApplication(rowData.applicationName,rowData.appKey,rowData.appDescription,value)">Submit</el-button>
              </span>
      </el-dialog>

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
name: "AppManagement",
  data(){
    return{
      options: [{
        value: '1',
        label: 'IOS'
      }, {
        value: '2',
        label: 'Android'
      }, {
        value: '3',
        label: 'PC'
      }, {
        value: '4',
        label: 'FirefoxOS'
      }, {
        value: '5',
        label: 'BlackBerry'
      }],
      value: '',


      EditDialogVisible: false,
      EditDialogVisible1: false,
      keyWords: '',
      loading: true,
      total : 0,
      pageNum : 1,
      pageSize : 15,

      tableData: [],
      rowData:{
        id:0,
        applicationName:'',
        appKey:'',
        typeCode:'',
        typeName:'',
        appDescription:'',
      },
    }
  },

  methods: {
    searchApp(){
      this.pageNum = 1;
      this.initAppsInfos()
    },

    AddApplication(applicationName,appKey,appDescription,value){
      this.rowData.applicationName = applicationName;
      this.rowData.appKey = appKey;
      this.rowData.appDescription = appDescription;
      this.rowData.typeCode = value

      if(this.rowData.applicationName == "" || this.rowData.applicationName == null || this.rowData.appKey == "" || this.rowData.appKey == null || this.rowData.typeCode == "" || this.rowData.typeCode == null){
        this.$message({
          type: 'error',
          message: 'ApplicationName, AppKey and TypeCode must be entered'
        });
      } else {
        this.$postRequest("/apis/application/addApplication",this.rowData).then(resp => {
          this.initAppsInfos();
        })
        this.EditDialogVisible1 = false
      }
      this.initAppsInfos();
    },

    ShowDialog(){
      this.value = '';
      this.rowData.applicationName = '';
      this.rowData.appKey = '';
      this.rowData.typeName = '';
      this.rowData.typeCode = 1;
      this.rowData.appDescription = '';
      this.EditDialogVisible1 = true;
    },

    handleClose(done) {
      this.$confirm('Infos do not save, close anyway ?' )
          .then(_ => {
            done(this.EditDialogVisible = false,this.EditDialogVisible1 = false);
          })
          .catch(_ => {
          });
      // this.$confirm('Infos do not save, close anyway ?', 'Message', {
      //   confirmButtonText: 'Confirm',
      //   cancelButtonText: 'Cancel',
      //   type: 'warning'
      // }).then(_ => {
      //   done(this.EditDialogVisible = false,this.EditDialogVisible1 = false);
      // })
      //     .catch(_ => {
      //     });
    },

    UpdateSub(id,applicationName,appKey,appDescription){
      this.rowData.id = id;
      this.rowData.applicationName = applicationName;
      this.rowData.appKey = appKey;
      this.rowData.appDescription = appDescription;
      // alert(this.rowData.id+this.rowData.applicationName+this.rowData.appKey+this.rowData.appDescription)

      this.$putRequest("/apis/application/updateApplicationByID",this.rowData).then(resp => {
        this.initAppsInfos();
      })
      this.EditDialogVisible = false;
    },

    currentChange(pageNum){
      this.pageNum = pageNum;
      this.initAppsInfos(this.keyWords);
    },

    handleEdit(index, row) {
      this.rowData = row;
      this.EditDialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm('Delete Application, Continue ?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        // 发送 删除 请求
        this.rowData = row;
        this.$putRequest("/apis/application/deleteApplicationByID",this.rowData).then(resp => {
          this.initAppsInfos();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled Action !'
        });
        this.initAppsInfos();
      });
    },

    initAppsInfos(){
      this.$getRequest('/apis/application/getAppsInfos/?keyWords='+this.keyWords+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then(resp => {
        if (resp) {
          this.tableData = resp.list;
          this.total = resp.total;
          this.loading = false;
        }
      })
    },
  },

  mounted() {
    this.initAppsInfos();
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
</style>
