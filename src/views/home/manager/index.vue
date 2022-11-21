<template>
  <div class="content">
    <div class="body">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          label="头像"
          prop="avatar">
          <template slot-scope="scope">
            <img class="img" :src="scope.row.avatar" alt="图片走丢了">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="nickname"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastLoginTime"
          label="上次登录时间">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import api from '@/api/index'
export default {
  name: "index",
  data(){
    return{
      input: '',
      tableData: []
    }
  },
  async created() {
    await this.getAllManager()
  },
  methods: {
    // 获取管理员列表
    getAllManager(){
      api.getManagerList().then(resp => {
        // console.log('获取管理员账号列表'+JSON.stringify(resp))
        if (resp.data.code === 200) {
          this.tableData = resp.data.data
        }
      })
    },



  },



}
</script>

<style scoped lang="less">

  .body{
    width: 1200px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-left: 10px;
    padding-top: 30px;
  }


  .img{
    width: 50px;
    height: 50px;
  }
</style>
