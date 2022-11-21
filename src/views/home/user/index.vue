<template>
    <div class="body">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 98%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          fixed
          prop="avatar"
          sortable
          label="用户头像">
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
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="注册时间">
        </el-table-column>

        <el-table-column
          align="center"
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          align="center"
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          align="center"
          prop="profession"
          label="身份">
        </el-table-column>
        <el-table-column
          align="center"
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model.trim="searchUser"
              @keyup.enter.native="selectUserInfo"
              size="mini"
              placeholder="请输入用户名查询"/>
          </template>
          <template slot-scope="scope">
            <el-button plain @click="deleteUserByIdClick(scope.row,scope.$index,tableData)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消全选</el-button>
      </div>

      <!--    分页-->
      <el-pagination
        class="paging"
        layout="prev, pager, next"
        @current-change="changeData"
        :current-page="currentPage"
        :page-count="totalPage"
      >
      </el-pagination>

    </div>

</template>

<script>
import api from '@/api/index'
export default {
  name: "index",
  data() {
    return {
      searchUser: '',
      ids: [],
      tableData: [
        {
          userId:11,
          username:"56153996707",
          nickName:"九九九---二二二",
          avatar:"https://images.nowcoder.com/head/885m.png?x-oss-pr...",
          telephone:"13308369972",
          createTime:"2022-11-03 19:30:03",
          updateTime:"2022-11-03 19:30:03",
          description:"九九九---二二二",
          email:"2628247963@qq.com",
          age:24,
          profession:"学生",
          password:"ac59075b964b0715"

        },
      ],
      multipleSelection: [],
      // 分页
      total: 18,
      totalPage: 0,
      currentPage: 1,
      pageSize: 3
    }
  },
  created() {
    this.getAllUser(1)
  },
  watch:{
    searchUser(newValue){
      if (newValue === ''){
        this.getAllUser(1)
      }
    }
  },
  methods: {
    // 获取所有用户列表信息
    getAllUser(page){
      api.getUserList(page).then(resp => {
        // console.log('获取用户列表'+JSON.stringify(resp))
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
        this.totalPage = resp.data.data.totalPage
        this.currentPage = resp.data.data.currentPage
        this.pageSize = resp.data.data.pageSize
      })
    },

    //获取当前页的用户列表数据
    changeData(page){
      this.getAllUser(page)
    },

    // 按条件（用户名）查询用户信息
    selectUserInfo(){
      api.getUserInfoByUsername(this.searchUser).then(resp => {
        // console.log('按username查询用户信息'+JSON.stringify(resp))
        if (resp.data.code === 200) {
          this.tableData = resp.data.data
        }
      })
    },

    // 删除某个用户
    deleteUserByIdClick(row,index,tableData){
      const _this = this
      console.log('进入删除用户函数~~')
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteUserById(row.id).then(resp => {
          console.log('请求了删除某个用户'+JSON.stringify(resp))
          if (resp.data.code === 200) {
            _this.$message({
              message: '删除成功！',
              type: 'success'
            })
            // tableData.slice(index,1)
            _this.getAllUser()
          }
        })
      }).catch(() => {
        _this.$message({
          message: '已取消删除！',
          type: 'info'
        })
      })

    },

    // 批量删除用户
    deleteUsersByChance(){
      const _this = this
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteUsersByChanced(this.multipleSelection).then(resp => {
          console.log('批量删除选中的用户'+resp)
          if (resp.data.code === 200) {
            _this.$message({
              message: '批量删除成功！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    // 取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 改变选中列表
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val.map((obj) => {
        return obj.userId
      })
      // console.log(this.multipleSelection)
    },


    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped lang="less">

  .header{
    width: 100%;
    height: 60px;
    background-color: #F5F5F5;
    margin: 20px 10px;
  }
  .body{
    width: 100%;
    height: 500px ;
    //background-color: #F5F5F5;
    margin: 20px 10px;
  }


  .img{
    width: 50px;
    height: 50px;
  }


  .paging{
    width: 400px;
    margin: 10px 800px;
    transform: translate(-200px,0);
  }
  /deep/.el-pager li{
    background-color: transparent;
  }
  /deep/.el-pagination button,.el-pagination button:disabled{
    background-color: transparent;

  }
  /deep/.el-pagination .btn-next, .el-pagination .btn-prev{
    background-color: transparent;

  }
</style>
