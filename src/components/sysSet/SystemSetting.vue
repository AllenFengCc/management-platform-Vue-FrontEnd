<template>
  <div>
    <template>
      <el-table
          v-loading="loading"
          height="500px"
          element-loading-text="This Page has been Editing"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
          :data="tableData"
          style="width: 100%; margin-top: 30px">
        <el-table-column
            prop="date"
            label="unknow"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="unknow"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="unknow">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "SystemSetting",
  data(){
    return{
      LoginUser: JSON.parse(window.sessionStorage.getItem('LoginUser')),
      LoginDate: JSON.parse(window.sessionStorage.getItem('LoginDate')),
      tableData: [{
        date: '',
        name: '',
        address: ''
      }],
      loading: true
    }
  }
}
</script>

<style scoped>

</style>
