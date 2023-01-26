<template>
  <div>
    <div>
        <el-input class="searchMsg" size="mini" placeholder="Please Enter Message Title" v-model="keyWords" @keydown.native.enter="initMsg"></el-input>
        <el-button icon="el-icon-search" size="mini" type="primary" @click="initMsg">Search Message</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
        <el-tab-pane label="Messages" name="all">
          <MessageInfos ref="all" :status="0" :del="true" :edit="false" :restore="false"></MessageInfos>
        </el-tab-pane>
        <el-tab-pane label="Published" name="published">
          <MessageInfos ref="published" :status="1" :del="true" :edit="true" :restore="false"></MessageInfos>
        </el-tab-pane>
        <el-tab-pane label="Draft Box" name="draft">
          <MessageInfos ref="draft" :status="2" :del="true" :edit="true" :restore="false"></MessageInfos>
        </el-tab-pane>
        <el-tab-pane label="Recycle Bin" name="recycle">
          <MessageInfos ref="recycle" :status="3" :del="true" :edit="false" :restore="true"></MessageInfos>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MessageInfos from "@/components/messagePub/msgItems/MessageInfos.vue";
export default {
  name: "MessageList",
  data(){
    return{
      status: 0,
      activeName: 'all',
      keyWords: '',
    }
  },

  components: {
    MessageInfos
  },

  methods: {
    tabClick(tab, event) {
      if (this.activeName == 'published') {
        this.$refs['published'].clickSearch(this.keyWords);
      }else if (this.activeName == 'draft') {
        this.$refs['draft'].clickSearch(this.keyWords);
      }else if (this.activeName == 'recycle') {
        this.$refs['recycle'].clickSearch(this.keyWords);
      }else if (this.activeName == 'all') {
        this.$refs['all'].clickSearch(this.keyWords);
      }
    },

    initMsg(){
      if (this.activeName == 'published') {
        this.$refs['published'].clickSearch(this.keyWords);
      }else if (this.activeName == 'draft') {
        this.$refs['draft'].clickSearch(this.keyWords);
      }else if (this.activeName == 'recycle') {
        this.$refs['recycle'].clickSearch(this.keyWords);
      }else if (this.activeName == 'all') {
        this.$refs['all'].clickSearch(this.keyWords);
      }
    },
  }
}
</script>

<style scoped>
  .searchMsg{
    width: 300px;
    margin-right: 10px;
  }
</style>
