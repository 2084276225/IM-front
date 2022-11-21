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
        prop="userId"
        label="用户ID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="反馈时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="content"
        label="反馈内容">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态">
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model.trim="searchFeedback"
            @keyup.enter.native="selectFeedbackInfo"
            size="mini"
            placeholder="请输入用户id查询"/>
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
  data() {
    return {
      searchFeedback: '',
      tableData: [],
      // 分页
      total: 18,
      totalPage: 0,
      currentPage: 1,
      pageSize: 3
    }
  },
  created() {
    this.getFeedbackList(1)
  },
  watch: {
    searchFeedback(newValue){
      if (newValue === '') {
        this.getFeedbackList(1)
      }
    }
  },
  methods: {
    // 获取所有反馈列表信息
    getFeedbackList(page){
      api.getAllFeedback(page).then(resp => {
        // console.log('获取反馈列表'+JSON.stringify(resp))
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
        this.totalPage = resp.data.data.totalPage
        this.currentPage = resp.data.data.currentPage
        this.pageSize = resp.data.data.pageSize
      })
    },

    // 获取当前页的反馈条目信息
    changeData(page){
      this.getFeedbackList(page)
    },
    // 按用户id查询反馈信息条目
    selectFeedbackInfo(){
      api.selectFeedbackById(this.searchFeedback).then(resp => {
        // console.log('按用户id查询反馈信息条目'+JSON.stringify(resp))
        if (resp.data.code === 200) {
          this.tableData = resp.data.data
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
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
