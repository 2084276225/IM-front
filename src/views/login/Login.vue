<template>
  <div class="login">
    <div class="content">
      <h3>登录</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
        <el-form-item class="input" label="账号" prop="username" placeholder="请输入电话或用户名">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="input" label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
<!--        选择登录方式-->
        <template>
          <el-radio v-model="radio" label="1">电话登录</el-radio>
          <el-radio v-model="radio" label="2">用户名登录</el-radio>
        </template>
        <!--        验证码-->
<!--        <el-form-item class="inputVerify" prop="verify_code">-->
<!--          <el-input type="text" v-model="ruleForm.verify_code"></el-input>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;          <el-input class="inputVerify" type="text" v-model="ruleForm.verify" autocomplete="off"></el-input>&ndash;&gt;-->
<!--          <img class="imgVerify" :src="verify" alt="图片走丢了" @click="resetVerify">-->
<!--          <a class="resetVerify" @click="resetVerify">看不清换一张</a>-->


<!--        <el-checkbox class="remember" label="记住密码" name="type" v-model="remember"></el-checkbox>-->
        <a class="gotoRegister" @click="Register">注册</a>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('ruleForm')" :disabled="false">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import api from '@/api'
import {mapState,mapMutations} from 'vuex'
const Base64 = require("js-base64").Base64
import axios from "axios";
// import getVerify from '@/api'
export default {
  name: 'loginPage',
  computed: {
    ...mapState('users', {
      userName: "username",
    })
  },
  watch:{
    // radio(newValue){
    //   console.log('选择了'+newValue)
    // }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
    }
    // const validatePass3 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入验证码'))
    //   }
    // }
    return {
      verify:'',
      remember:false,
      radio: '1',
      ruleForm: {
        username: '',
        password: '',
        // verify_code: ''
      },
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        // verify_code: [
        //   { validator: validatePass3, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {

    ...mapMutations('users',{
      setIsLogin: 'setIsLogin',
    }),

    setCookie(c_name, c_pwd, exudate) {
      //账号，密码 ，过期的天数
      var exudate = new Date();

      exudate.setTime(exudate.getTime() + 24 * 60 * 60 * 1000 * exudate); //保存的天数
      document.cookie =
        "username=" + c_name + ";path=/;expires=" + exudate.toLocaleString();
      document.cookie =
        "password=" + c_pwd + ";path=/;expires=" + exudate.toLocaleString();
    },

    getCookie(name) {
      let arr = document.cookie.split(";");
      //["_ga=GA1.1.1756734561.1561034020", " mobile=123" password=456"]
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split("="); // ["_ga", "GA1.1.1756734561.1561034020"]
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },


    async submitForm (formName) {
      // console.log("用户名---" + this.ruleForm.username)
      // console.log("密码----" + this.ruleForm.password)
      // console.log("验证码---" + this.ruleForm.verify_code)
      const _this = this
      // console.log(this.ruleForm)
      // 通过电话登录
      if (this.radio === '1') {
        let obj = {telephone:_this.ruleForm.username,password:_this.ruleForm.password}
        await api.loginByTelephone(obj).then(res=>{
          console.log('发起电话登录请求'+JSON.stringify(res))
          if (res.data.code === 200) {
            localStorage.setItem('telephone',res.data.data)
            // localStorage.setItem('username',this.ruleForm.username)
            // localStorage.setItem('password',this)
            // sessionStorage.setItem('Authorization',res.data.token)
            // sessionStorage.setItem('nickname',res.data.user.nickname)
            // sessionStorage.setItem('avatar',res.data.user.avatar)
            api.getUserInfo(localStorage.getItem('telephone')).then(resp => {
              console.log('获取用户信息'+JSON.stringify(resp))
              sessionStorage.setItem('username',resp.data.data.username)
              sessionStorage.setItem('avatar',resp.data.data.avatar)
              sessionStorage.setItem('email',resp.data.data.email)
              sessionStorage.setItem('sex',resp.data.data.sex)
              sessionStorage.setItem('createTime',resp.data.data.createTime)
              sessionStorage.setItem('nickname',resp.data.data.nickname)
              sessionStorage.setItem('telephone',resp.data.data.telephone)
            })
            _this.setIsLogin(true)
            _this.$router.push('/')
            _this.$message({
              message: '登录成功',
              type: 'success'
            })
          }else {
            _this.$message({
              // message: res.data.msg,
              message: '登录失败',
              type: 'error'
            })
          }
        })
        // 通过用户名登录
      }else if(this.radio === '2') {
        await api.loginByUsername(this.ruleForm).then(res=>{
          // console.log(res)
          if (res.data.code === 200) {
            localStorage.setItem('username',this.ruleForm.username)
            // localStorage.setItem('password',this)
            // sessionStorage.setItem('Authorization',res.data.token)
            // sessionStorage.setItem('nickname',res.data.user.nickname)
            // sessionStorage.setItem('avatar',res.data.user.avatar)
            _this.setIsLogin(true)
            _this.$router.push('/')
            _this.$message({
              message: '登录成功',
              type: 'success'
            })
          }else {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }

      // if (this.remember === true) {
      //   let password = Base64.encode(this.ruleForm.password); // base64加密
      //   this.setCookie(this.ruleForm.username,password,7)
      // }else {
      //   this.setCookie('','',-1)
      // }
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
    // async resetVerify () {
    //   // const res = await getVerify()
    //   const res = await api.getVerify()
    //   this.verify = res.data
    // },
    Register () {
      this.$router.push('/register')
    }
  },
  mounted () {
    const username = localStorage.getItem('username')
    this.ruleForm.username = username
  },
  async created () {
    // await this.resetVerify()
    console.log(this.userName)
    if (this.userName) {
      this.ruleForm.username = this.userName
    }
    // 在页面加载时从cookie获取登录信息
    // let username = this.getCookie("username")
    // let password =this.getCookie("password")
    // console.log(Base64)

  },

}
</script>

<style scoped >
  .login{
    position : absolute;
    width : 100%;
    height : 100%;
    background-image: url("../../assets/bg.jpg");
    background-repeat: no-repeat;
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
  }

  h3{
    position: absolute;
    left: 50%;
    margin-top: 50px;
    transform: translate(-50%,-50%);
  }
  .content{
    width: 450px;height: 400px;
    background-color: white;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    opacity: 0.99;
    box-shadow: 2px 2px 10px #000000;
  }
  .el-form{
    width: 360px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .btn{
    width: 340px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate( -55%,-50%);
    margin-top: 60px;

  }
  .remember{
    margin-left: 10px;
    float: left;
    margin-top: 20px;
  }

  .input{
  }

  .inputVerify{
    width: 170px;
  }
  .imgVerify{
    float: right;
    width: 160px;
    margin-left: 30px;
    margin-top: -60px;
    cursor: pointer;
  }
  .resetVerify{
    float: right;
    font-size: 12px;
    margin-left: 260px;
    margin-top: -16px;
    cursor: pointer;
  }
  .gotoRegister{
    position: relative;
    font-size: 12px;
    color: blue;
    float: right;
    padding-top: 20px;
    margin-right: 10px;
    cursor: pointer;
    z-index: 1;
  }

</style>
