import axios from '@/http/request'


const api = {
  // getVerify(){
  //   return axios.get('resource/img_verify_code?time='+new Date())
  // },
  // 通过电话登录
  loginByTelephone(ruleForm){
    return axios.post('/sys_user/loginByTelephone',ruleForm)
  },
  // 通过用户名登录
  loginByUsername(ruleForm){
    return axios.post('/sys_user/loginByUserName',ruleForm)
  },

  // 获取用户信息(通过电话号码)
  getUserInfo(telephone){
    return axios.get('/sys_user/selectInfo',{params:{searchCondition:telephone}})
  },

  // 注册
  register(ruleForm){
    return axios.post('/sys_user/register',ruleForm)
  },

  // 获取管理员列表
  getManagerList(){
    return axios.get('/sys_user/selectAll')
  },

  // 按照页码获取用户列表信息
  getUserList(page){
    return axios.get('/user/selectAll',{params:{current:page}})
  },

  // 根据用户ID删除一个用户
  deleteUserById(id){
    return axios.delete('/user/deleteById/'+id)
  },

  // 根据ID批量删除选择的用户
  deleteUsersByChanced(ids){
    return axios.delete('/user/deleteByIds',{params:{ids:ids}})
  },

  // 按条件（用户名）查询用户信息
  getUserInfoByUsername(searchCondition) {
    return axios.get('/user/selectByUserNameOrNickName',{params: {searchCondition:searchCondition}})
  },

  // 按照页码获取所有的反馈信息条目
  getAllFeedback(page){
    return axios.get('/imFeedBack/selectAll/'+page)
  },

  // 根据id查询反馈条目
  selectFeedbackById(id){
    return axios.get('/imFeedBack/selectByUserId/'+id)
  },

  // 根据页码获取用户言论信息
  getOpinionList(page){
    return axios.get('/imTalk/selectAll/'+page)
  },

  // 查询指定日期之前的言论
  selectOpinionByTimeBefore(time){
    return axios.get('/imTalk/selectBeforeTime',{params:{time:time}})
  },

  // 通过id删除某条言论
  deleteOpinion(id){
    return axios.delete('/imTalk/deleteById/',{params:{id}})
  },

  // 根据页码获取所有http请求日志
  getAllRequestLog(id){
    return axios.get('/weblog/selectAll/'+id)
  }




  // registerUser(ruleForm){
  //   return axios.post('/user/register',ruleForm)
  // },
  // upLoadHeadPhoto(file){
  //   return axios.post('/resource/file_upload',{
  //     data:{
  //       file:file
  //     },
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // },

  // uploadFile(params) {
  //   return axios.post("/resource/file_upload",params,{headers:{"Content-Type": "multipart/form-data"}})
  // },
  // 请求邮箱验证码
  // getEmailCode(email){
  //   return axios.get("/resource/send_email/?email="+email)
  // },
  // 邮箱验证码校验
  // emailVerify(emailCode){
  //   return axios.get("/resource/register_check_code/?emailCode="+emailCode)
  // },
  // 获取所有文章列表
  // getArticleList(){
  //   return axios.get("/article/listArticle")
  // },
  // 根据标题查询文章
  // getArticleByTitle(title){
  //   return axios.get("/article/queryArticleByLikeTitle",{params:{title}})
  // },

  //根据id删除文章
  // deleteArticleById(id){
  //   return axios.delete("/article/deleteArticleById/"+id)
  // },

  // 获取文章栏目
  // getArticleTag(){
  //   return axios.get("/article/queryAllTag")
  // },

  // 发表文章(添加文章)
  // addArticle(params){
  //   return axios.post("/article/insertArticle",params)
  // },

  // 获取用户列表
  // getUserList(){
  //   return axios.get("/user/listUser")
  // },

  // 通过用户名查询用户
  // getUserByUserName(userName){
  //   return axios.get("/user/queryUserByName?username=" + userName)
  // }
}
export default api

// export default function getVerify(){
//   return axios.get('resource/img_verify_code?time='+new Date())
// }

