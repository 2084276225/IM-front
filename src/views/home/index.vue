<template>
  <div class="out">
<!--    <div class="left-navigation">导航</div>-->
    <div class="header">
      <span class="title">IM 后台管理系统</span>
<!--        用户下拉菜单-->
        <el-dropdown @command="handleCommand">
          <div class="user">
            <el-avatar class="img-avatar" :src="form.avatarAbsolute"></el-avatar>
            <div class="nickname">{{nickName}}</div>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" class="logout">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>

<!--    个人信息弹框-->
    <el-dialog
      title="个人信息"
      :visible.sync="dialogVisible"
      width="560px"
      :before-close="handleClose">
      <div class="dialog-body">
        <ul>
          <li>用户名：{{form.username}}</li>
          <li>昵称：{{form.nickname}}</li>
          <li>电话：{{form.telephone}}</li>
        </ul>
        <ul>
          <li>邮箱：{{form.email}}</li>
          <li>性别：{{form.sex}}</li>
          <li>注册时间：{{form.createTime}}</li>
        </ul>
      </div>

    </el-dialog>

<!--        左侧导航栏-->
    <Navigation class="navigation"></Navigation>

<!--        内容-->
    <div class="right-content">
<!--        面包屑-->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
      </el-breadcrumb>
      <router-view/>
    </div>

  </div>
</template>

<script>
import Navigation from '../../components/navigation/Navigation'
import {mapState} from "vuex"
import api from "@/api";
export default {
  name: "home",
  components: {
    Navigation,
  },
  computed:{
    ...mapState('users',['avatar']),
  },
  data(){
    return{
      nickName: sessionStorage.getItem('nickname'),
      dialogVisible: false,
      imageUrl: '',
      form: {
        username: '',
        nickname: '',
        email: '',
        avatarAbsolute:'',
        createTime: '',
        sex: '',
        telephone: ''
      }
    }
  },
  created() {
    // console.log(this.avatar)
    // console.log(this.nickname)
    this.form.avatarAbsolute = sessionStorage.getItem('avatar')
    // console.log('form里的头像'+this.form.avatarAbsolute)
  },
  methods:{

    // 个人信息弹框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    handleCommand(command){
      if(command === 'logout'){
        this.$router.replace('/login')
      }
      if (command === 'user') {
        // 从session中获取用户信息
        console.log('点击了个人中心按钮')
        this.dialogVisible = true
        this.form.username = sessionStorage.getItem('username')
        this.form.nickname = sessionStorage.getItem('nickname')
        this.form.telephone = sessionStorage.getItem('telephone')
        this.form.email = sessionStorage.getItem('email')
        this.form.createTime = sessionStorage.getItem('createTime')
        this.form.sex = sessionStorage.getItem('sex')
      }
    },
    async handleAvatarSuccess(res, file) {
      // console.log('上传成功')
      this.imageUrl = URL.createObjectURL(file.raw)
      //const resp = await api.upLoadHeadPicture()
      //console.log(resp)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async uploadPhoto(target){
      // console.log(target)
      let formData = new FormData()
      formData.append("multipartFile",target.file)
      formData.append("fileName",target.file.name)
      await api.uploadFile({multipartFile: target.file}).then(resp=>{
        // console.log(resp.data)
        this.form.avatarAbsolute = resp.data.data
      })

    },
  },



}
</script>

<style scoped>
  .out{

  }
  .header{
    height: 50px;width: 100%;
    background-color: #6F9AC3;
    position: fixed;
    top: 0;
    z-index: 9;
  }
  .navigation{
    position: fixed;
    z-index: 20;
    top: 50px;bottom: 0;
    width: 200px;
  }

  .contentHeader{
    height: 50px;
    background-color: #2c3e50;
  }


  .right-content{
    margin-left: 200px;
    margin-top: 50px;
  }
  .text{

  }
  .title{
    font-size: 20px;
    color: white;
    margin-left: 30px;
    line-height: 50px;
  }
  .userInfo{
    float: right;
    margin-right: 60px;
    margin-top: 10px;
    cursor: pointer;
  }
  .logout{
    font-size: 12px;
  }

  .img-avatar{
    width: 26px;height: 26px;
    border-radius: 50% 50%;
    float: right;
    margin-right: 20px;
    margin-top: 12px;
  }



  .el-dropdown {
    vertical-align: top;
    float: right;
  }
  .el-dropdown + .el-dropdown {
    /*margin-left: 15px;*/
  }
  .el-dropdown-menu{

  }
  .el-breadcrumb{
    padding-top: 10px;
    margin-left: 10px;
    margin-bottom: 4px;
    font-size: 12px;
  }

  .user{
    display: flex;
    justify-content: space-around;
  }
  .nickname{
    line-height: 50px;
    margin-left: -10px;
    margin-right: 20px;
    color: black;
  }

  /deep/.el-dialog{
    height: 260px;
  }
  /deep/.el-dialog__body{
    padding: 0;
  }

  .dialog-body{
    /*border: 1px solid black;*/
    margin-left: 20px;
    width: 530px;
    height: 160px;
    display: flex;
    justify-content: space-around;
  }
  .dialog-body ul{
    margin-top: 30px;
  }

  .dialog-body li{
    margin-bottom: 30px;
    font: normal 18px 黑体;
  }
</style>
