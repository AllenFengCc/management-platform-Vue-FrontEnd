<template>
  <div>
    <div style="height: 500px">
      <el-table
          v-loading="msgLoading"
          ref="multipleTable"
          :data="msgInfos"
          tooltip-effect="dark"
          style="width: 95%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="title"
            width="200">
          <template slot-scope="scope">
            <el-button type="text">{{ scope.row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
            prop="user.nickname"
            label="Author"
            width="180">
        </el-table-column>
        <el-table-column
            prop="publishTime"
            label="Publish Time"
            width="180">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="Update Time"
            width="180">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                v-if="edit"
                size="mini"
                icon="el-icon-edit-outline"
                @click="msgEdit(scope.row)">Edit</el-button>
            <el-button
                v-if="restore"
                size="mini"
                icon="el-icon-help"
                @click="resMsg(scope.$index, scope.row)">Restore to DraftBox</el-button>
            <el-button
                v-if="del"
                size="mini"
                type="danger"
                icon="el-icon-document-delete"
                @click="deleteMsg(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

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
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "AllMessages",
  data(){
    return{
      id: 0,
      msgStatus: 0,
      newKeyWords: '',
      total : 0,
      pageNum : 1,
      pageSize : 6,
      msgLoading: true,
      msgInfos: []
    }
  },

  props: ['del','edit','restore','status'],

  methods: {
    resMsg(index, row){
      this.$confirm('Restore Message to Draft Box, Continue ?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        // 发送 删除 请求
        this.id = row.id
        this.$putRequest('/apis/msgPub/resMsgById/?id='+this.id).then(resp => {
          this.initMsgInfos();
          pubsub.publish('token');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled Action !'
        });
        this.initMsgInfos();
      });
    },

    msgEdit(row){
      this.$router.push({
        path: '/MessagePub',
        query: {
          mid: row.id
        }
      })
    },

    deleteMsg(index, row) {
      this.$confirm('Delete Message, Continue ?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        // 发送 删除 请求
        this.id = row.id;
        this.msgStatus = row.status
        this.$putRequest('/apis/msgPub/deleteMsgById/?id='+this.id+'&status='+this.msgStatus).then(resp => {
          this.initMsgInfos();
          pubsub.publish('token');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled Action !'
        });
        this.initMsgInfos();
      });
    },

    currentChange(pageNum){
      this.pageNum = pageNum;
      this.initMsgInfos(this.newKeyWords);
    },

    clickSearch(keyWords){
      this.pageNum = 1;
      this.initMsgInfos(keyWords);
    },

    initMsgInfos(keyWords){
      if(keyWords){
        this.newKeyWords = keyWords;
        this.$getRequest('/apis/msgPub/getMsgInfos/?keyWords='+keyWords+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize+'&status='+this.status).then(resp => {
          if(resp){
            this.msgInfos = resp.list;
            this.total = resp.total;
            this.msgLoading = false;
          }
        });
      }else {
        this.newKeyWords = '';
        this.$getRequest('/apis/msgPub/getMsgInfos/?'+'pageNum='+this.pageNum+'&pageSize='+this.pageSize+'&status='+this.status).then(resp => {
          if(resp){
            this.msgInfos = resp.list;
            this.total = resp.total;
            this.msgLoading = false;
          }
        });
      }
    }
  },

  mounted() {
    this.initMsgInfos();
  }

}
</script>

<style scoped>

</style>
