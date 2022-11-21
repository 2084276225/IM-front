<template>
  <div class="content">
    <div class="register">
      <h3>注册</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item class="username" label="昵称" prop="nickname">
          <el-input type="text" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item class="password" label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="telephone" label="电话" prop="password">
          <el-input type="text" v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item class="email" label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item class="sex" label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" :label="0">男</el-radio>
          <el-radio v-model="ruleForm.sex" :label="1">女</el-radio>
        </el-form-item>

        <!--        上传头像-->
        <el-form-item class="headPhoto" label="上传头像" prop="headPhoto">
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            :show-file-list="true"-->
<!--            ref="avatar"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            action="#"-->
<!--            :http-request="uploadPhoto"-->
<!--            :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->

                    <input ref="avatar" type="file"/>
                    <el-button @click="fileUpload" type="success" size="mini" icon="el-icon-upload2">上传</el-button>
        </el-form-item>
        <br>


        <!--        验证码-->
<!--        <el-form-item class="inputVerify" prop="verify">-->
<!--          <el-input type="text" v-model="ruleForm.verify"></el-input>-->
<!--        </el-form-item>-->
<!--        <img class="imgVerify" :src="verify" alt="图片走丢了" @click="resetVerify">-->
<!--        <a class="resetVerify" @click="resetVerify">看不清换一张</a>-->

        <a class="login" @click="loginPage">已有账号,去登录</a>


<!--&lt;!&ndash;        上传头像&ndash;&gt;-->
<!--        <el-form-item class="headPhoto" label="上传头像" prop="headPhoto">-->
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            :show-file-list="true"-->
<!--            ref="avatar"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            action="#"-->
<!--            :http-request="uploadPhoto"-->
<!--            :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->

<!--&lt;!&ndash;          <input ref="avatar" type="file"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button @click="fileUpload" type="success" size="mini" icon="el-icon-upload2">上传</el-button>&ndash;&gt;-->
<!--        </el-form-item>-->


        <el-form-item class="btn">
          <el-button type="primary" @click="registerUser('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

<!--    弹框----邮件校验-->
<!--    <el-dialog title="邮箱认证" :visible.sync="dialogFormVisible" style="margin-top: 20vh">-->
<!--      <el-form class="email-verify" :model="form">-->
<!--        <el-form-item label="输入邮箱验证码" :label-width="formLabelWidth">-->
<!--          <el-input class="input-emailVerify" v-model="form.emailCode" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button class="btn-email-yes" @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="registerUser">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

  </div>
</template>

<script>
import api from '@/api'
import {mapMutations} from 'vuex'
import axios from "axios";
// import getVerify from '@/api'
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      }
    }
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }
    }
    return {
      radio: 0,
      verify:'',
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        nickName: '',
        password: '',
        telephone: '',
        email: '',
        sex: 0,
        avatar: ''
        // avatarAbsolute:''
        // verify:'',
      },
      rules: {
        nickName: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        verify: [
          { validator: validatePass4, trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      form: {
        emailCode: '',

      },
      formLabelWidth: '120px',
    };
  },
  watch:{
    // ruleForm: {
    //   handler(newName, oldName) {
    //     console.log('当前选择勒'+newName.sex);
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    ...mapMutations('users',{
      setUsername: 'setUsername'
    }),
    // async uploadPhoto(target){
    //   // console.log(target)
    //   let formData = new FormData()
    //   formData.append("multipartFile",target.file)
    //   formData.append("fileName",target.file.name)
    //   await api.uploadFile({multipartFile: target.file}).then(resp=>{
    //     // console.log(resp.data)
    //     this.ruleForm.avatarAbsolute = resp.data.data
    //   })
    //
    // },
    fileUpload() {
      let avatar = this.$refs.avatar;
      console.log(avatar)

      let formData = new FormData();

      formData.append("multipartFile",avatar.files[0]);
      formData.append("fileName",avatar.files[0].name);

      console.log(formData)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post("http://localhost:8082/api/admin/sys_user/uploadAvatar",{
        file : avatar.files[0]
      } , config).then(resp=>{
        console.log('发起上传头像请求'+JSON.stringify(resp))
        if (resp.data.code === 200) {
          this.ruleForm.avatar = resp.data.data
          // console.log('头像'+this.ruleForm.avatar)
        }
      }).catch(error=>{
        console.log(error.valueOf())
      })
    //
    },
    // async submitForm(formName) {
    //   // this.dialogFormVisible = true
    //
    //   // 获取邮箱验证码
    //   // const res = await api.getEmailCode(this.ruleForm.email)
    //   // console.log(res)
    //
    // },
    // 注册用户
    async registerUser () {
      const _this = this
      // const res = await api.emailVerify(this.form.emailCode).then(resp=>{
      //   if (resp.status === 200) {
      //     // console.log(this.ruleForm)
      //     const res = api.registerUser(this.ruleForm).then(resp=>{
      //       if (resp.status == 200) {
      //         _this.$message({
      //           message: '注册成功',
      //           type: 'success'
      //         })
      //         _this.setUsername(resp.data.data.username)
      //         _this.$router.push('/login')
      //       }else{
      //         _this.$message({
      //           message: '注册失败',
      //           type: 'error'
      //         })
      //       }
      //     })
      //     // console.log(res)
      //     // if (res.data.code === 209) {
      //     //   console.log('注册成功')
      //     //   this.$message({
      //     //     message: '注册成功',
      //     //     type: 'success'
      //     //   })
      //     // }
      //   }
      // })
      // console.log(this.form.emailCode)
      // if (res.data.code === 200) {
      //   console.log('邮箱校验成功')
      //   const res = await api.registerUser(this.ruleForm)
      //   if (res.data.code === 200) {
      //     console.log('注册成功')
      //     this.$message({
      //       message: '注册成功',
      //       type: 'success'
      //     })
      //   }
      // }
      await api.register(_this.ruleForm).then(resp => {
        console.log('发起注册请求'+JSON.stringify(resp))
        _this.$message({
          message: '注册成功！',
          type: 'success'
        })
        _this.$router.push('/login')
      })
      this.dialogFormVisible = false

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // async resetVerify () {
    //   const res = await api.getVerify()
    //   // const res = await getVerify()
    //   this.verify = res.data
    // },
    loginPage () {
      this.$router.push('/login')
    },
    // async handleAvatarSuccess(res, file) {
    //   // console.log('上传成功')
    //   this.imageUrl = URL.createObjectURL(file.raw)
    //   //const resp = await api.upLoadHeadPicture()
    //   //console.log(resp)
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // },
  },
  // async created () {
  //   await this.resetVerify()
  // },
}
</script>

<style scoped>
  .content{
    position: absolute;
    width: 100%;height: 100%;
    background-image: url("../../assets/bg.jpg");
    background-size: cover;
    background-position: center;

  }
  .register{
    width: 400px;height: 600px;
    background-color: white;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 4px;
    opacity: 0.99;
    box-shadow: 2px 2px 10px #000000;
  }

  .el-form{
    float: left;
    margin-top: 100px;
  }
  .el-form-item{
    width: 340px;

  }

  h3{
    position: absolute;
    left: 50%;
    margin-top: 50px;
    transform: translate(-50%,-50%);
  }

  .username{
  }
  .password{

  }
  /*.email{*/
  /*  float: right;*/
  /*  margin-right: 70px;*/
  /*  margin-top: -126px;*/
  /*  margin-left: 200px;*/
  /*}*/



  .inputVerify{
    float: right;
    width: 210px;
    margin-right: 200px;
    margin-top: -65px;
  }
  .imgVerify{
    width: 120px;
    cursor: pointer;
    float: right;
    margin-top: -60px;
    margin-right: 70px;
  }
  .resetVerify{
    float: right;
    font-size: 12px;
    cursor: pointer;
    margin-right: 80px;
    margin-top: -30px;
  }
  .login{
    /*position: relative;*/
    font-size: 12px;
    color: blue;
    cursor: pointer;
    float: right;
    margin-right: 70px;
    margin-top: -36px;
    /*z-index: 1;*/
  }
  .btn{
    margin: 0 auto;
    /*padding-top: 10px;*/
  }


  .avatar-uploader {
    width: 60px;height: 60px;
    margin-top: 10px;
    margin-left: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    /*position: relative;*/
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 10px;
    height: 10px;
    position: relative;
    left: 20px;
    top: 10px;
    /*line-height: 178px;*/
    /*text-align: center;*/
  }
  .avatar {
    width: 100%;height: 100%;
  }

  .headPhoto{
    margin-left: 30px;
  }

  .email-verify{
    margin-top: -10px;
  }
  .input-emailVerify{
    width: 360px;
  }
  /deep/ .el-dialog{
    width: 600px;
  }
  /*.btn-upLoad{*/
  /*  float: left;*/
  /*  margin-top: -30px;*/
  /*}*/
</style>
