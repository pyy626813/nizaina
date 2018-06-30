<template>
  <div class="listPage">
    <div class="hd-top">
      where are you?
    </div>
    <div class="body">
      <div class="hd-list">
        <Input placeholder="请输入完整姓名" style="width: 78%"/>
        <Button type="primary" style="width: 20%">你在哪</Button>
        <div class="tip">此DAPP基于星云链，查看用户隐私信息或登记信息需使用：<a href="https://nebulas.io/cn/resources.html" target="_blank">星云链钱包</a></div>
      </div>

      <div class="bd-list">
        <!--<div class="list">
          <span>王小猫</span>
          <span>女</span>
          <span>12岁</span>
          <span style="width: 120px">说明说明。。。。</span>
          <Button type="ghost">我在这</Button>
        </div>
        <div class="list">
          <span>王小猫</span>
          <span>女</span>
          <span>12岁</span>
          <span style="width: 120px">说明说明说明说明说明说明。。。。</span>
          <Button type="ghost">我在这</Button>
        </div>-->
      </div>
      <Button type="success" size="small" style="margin-left: 8px;" @click="toAddUser">去登记&nbsp;<Icon type="arrow-right-c"></Icon></Button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  methods:{
    toAddUser(){
      this.$router.push({name:'add'});
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
  .listPage {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .body {
      min-width: 500px;
      max-width: 600px;
      padding: 20px;
      border-radius: 10px;
      background-color: rgba(225, 225, 225, .8);
      box-shadow: 0px 0px 40px #ffffff;
      margin: 0 auto;
    }
    .hd-top {
      text-align: center;
      margin: 0 auto;
      //margin-left: 10%;
      line-height: 2.6;
      font-size: 36px;
      color: #ffffff;
      font-weight: 200;
      padding-top: 20px;
      letter-spacing: 2px;
    }
    .hd-list {
      text-align: center;
      margin: 0 auto;
      .tip {
        text-align: left;
        padding: 8px;
      }
    }
    .bd-list {
      margin: 0 auto;
      width: 100%;
      .list {
        text-align: center;
        margin-bottom: 20px;
        span {
          text-align: left;
          display: inline-block;
          width: 88px;
        }
        .ivu-btn {
          span {
            width: 36px;
          }
        }
      }
    }
  }
</style>
