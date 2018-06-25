<template>
  <div class="listPage">
    <div class="hd-list">
      <Input placeholder="请输入查找姓名" style="width: 400px"/>
      <Button type="primary">你在哪</Button>
    </div>
    <div class="bd-list">
      <div class="list">
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
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style rel="stylesheet/scss" lang="scss">
  body{
    background-image: url("../assets/images/listBg.jpg");
    background-size: cover;
    //background-color: #eaffea;
  }
  .listPage{
    width: 100%;
    height: 100%;
    margin:0 auto;
    padding:140px 20px 40px;
    .hd-list{
      text-align: center;
      margin: 0 auto;
    }
    .bd-list{
      margin: 0 auto;
      width: 100%;
      padding: 30px;
      .list{
        text-align: center;
        margin-bottom: 20px;
        span{
          text-align: left;
          display: inline-block;
          width: 88px;
        }
        .ivu-btn{
          span{
            width: 36px;
          }
        }
      }
    }
  }
</style>
