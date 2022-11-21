<template>
  <el-menu
    default-active="2"
    class="el-icon-document"
    @open="handleOpen"
    @close="handleClose"
    background-color="#BBC7D3"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-menu-item index="1" @click="toUserManager">
      <i class="el-icon-user-solid"></i>
      <span slot="title">管理员</span>
    </el-menu-item>
    <el-menu-item index="2" @click="toItemManager">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="3" @click="toDataStatistics">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">用户反馈</span>
    </el-menu-item>
    <el-menu-item index="4" @click="toUserOpinion">
      <i class="el-icon-chat-dot-square"></i>
      <span slot="title">用户言论</span>
    </el-menu-item>
    <el-menu-item index="5" @click="toUserRequestLog">
      <i class="el-icon-notebook-1"></i>
      <span slot="title">请求日志</span>
    </el-menu-item>
  </el-menu>
</template>

<script>



export default {
  name: 'Navigation',
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    toUserManager(){
      this.$router.push('/manager')
    },
    toItemManager(){
      this.$router.push('/user')
    },
    toDataStatistics(){
      this.$router.push('/feedback')
    },
    toUserOpinion(){
      this.$router.push('/userOpinion')
    },
    toUserRequestLog(){
      this.$router.push('/requestLog')
    }
  }

}
</script>

<style scoped lang="less">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

</style>
