<template>
  <div class="content">
    <el-table
      :data="tableData"
      border
      style="width: 98%">
      <el-table-column
        align="center"
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sendTime"
        label="发表时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createdName"
        label="发表人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="content"
        label="发表内容">
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model.trim="searchOpinion"
            @keyup.enter.native="selectOpinion"
            size="mini"
            placeholder="请输入日期如2022-11-15"/>
        </template>
        <template slot-scope="scope">
          <el-button plain @click="deleteOpinionByIdClick(scope.row,scope.$index,tableData)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  data(){
    return{
      tableData:[],
      searchOpinion:'',
      // 分页
      total: 18,
      totalPage: 0,
      currentPage: 1,
      pageSize: 3
    }
  },
  created() {
    this.getUserOpinion(1)
  },
  watch:{
    searchOpinion(newValue){
      if (newValue === ''){
        this.getUserOpinion(1)
      }
    }
  },
  methods:{

    // 根据页码获取用户言论
    getUserOpinion(page){
      api.getOpinionList(page).then(resp => {
        // console.log('请求了获取用户言论列表'+JSON.stringify(resp))
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
        this.totalPage = resp.data.data.totalPage
        this.currentPage = resp.data.data.currentPage
        this.pageSize = resp.data.data.pageSize
      })
    },

    //获取当前页的用户列表数据
    changeData(page){
      this.getUserOpinion(page)
    },

    // 根据日期查询用户言论
    selectOpinion(){
      api.selectOpinionByTimeBefore(this.searchOpinion).then(resp => {
        // console.log('查询指定日期前的言论'+JSON.stringify(resp))
        if (resp.data.code === 200) {
          this.tableData = resp.data.data
        }
      })
    },

    // 删除某条用户言论
    deleteOpinionByIdClick(row,index,tableData){
      const _this = this
      console.log('进入删除某条言论函数~~')
      _this.$confirm('此操作将永久删除该条言论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteOpinion(row.id).then(resp => {
          console.log('请求了删除某条言论'+JSON.stringify(resp))
          if (resp.data.code === 200) {
            _this.$message({
              message: '删除成功！',
              type: 'success'
            })
            // tableData.slice(index,1)
            _this.getUserOpinion(1)
          }
        })
      }).catch(() => {
        _this.$message({
          message: '已取消删除！',
          type: 'info'
        })
      })

    },
  }
}
</script>

<style scoped>
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
