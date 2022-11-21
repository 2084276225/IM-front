<template>
  <div class="content">
    <el-table
      :data="tableData"
      border
      style="width: 98%">
      <el-table-column
        align="center"
        prop="startTime"
        label="请求开始时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="spendTime"
        label="耗时">
      </el-table-column>
      <el-table-column
        align="center"
        prop="uri"
        label="请求路径">
      </el-table-column>
      <el-table-column
        align="center"
        prop="method"
        label="请求方法">
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="请求描述">
      </el-table-column>
      <el-table-column
        align="center"
        prop="result"
        label="请求结果">
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
import api from "@/api";

export default {
  name: "index",
  data() {
    return {
      tableData: [],
      // 分页
      total: 18,
      totalPage: 0,
      currentPage: 1,
      pageSize: 3
    }
  },
  created() {
    this.getRequestLogList(1)
  },
  methods: {
    // 根据页码获取请求日志列表
    getRequestLogList(page){
      api.getAllRequestLog(page).then(resp => {
        console.log('获取请求日志列表'+JSON.stringify(resp))
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
        this.totalPage = resp.data.data.totalPage
        this.currentPage = resp.data.data.currentPage
        this.pageSize = resp.data.data.pageSize
      })
    },

    // 获取当前页的请求日志
    changeData(page){
      this.getRequestLogList(page)
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
