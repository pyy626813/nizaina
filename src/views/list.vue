<template>
  <div class="listPage">
    <div class="hd-top">
      where are you?
    </div>
    <div class="body">
      <div class="hd-list">
        <Input placeholder="请输入完整姓名" style="width: 78%" v-model="name" @keyup.native="keyupName($event)"/>
        <Button type="primary" style="width: 20%;margin-left: 1%;" @click="searchUser">你在哪</Button>
        <div class="tip" v-if="showTip">此DAPP基于星云链，查看用户隐私信息或登记信息需使用：<a href="https://nebulas.io/cn/resources.html"
                                                                       target="_blank">星云链钱包</a>
        </div>
      </div>
      <div class="bd-list" v-if="loadingUser || users">
        <div class="list" v-for="user in users">
          <div class="user">
            <span>{{user.name}}</span>
            <span>{{user.gender?genderTxt[user.gender]:'未知'}}</span>
            <span>{{user.age != null?user.age+'岁':null}}</span>
            <p>
              {{user.descr}}</p>
          </div>
          <Button type="ghost" class="btn-secret" @click="seeSecretInfo(user.nasAddress)" v-if="secertInfo[user.nasAddress]">隐私地址
            <Icon type="help"></Icon>
          </Button>
          <Tooltip :content="'查看需支付'+secretCost+'nas'" placement="right" v-else>
            <Button type="ghost" class="btn-secret" @click="seeSecretInfo(user.nasAddress)">隐私地址
              <Icon type="help"></Icon>
            </Button>
          </Tooltip>
        </div>
        <Spin size="large" fix v-if="loadingUser"></Spin>
        <div class="no-result" v-else-if="users && users.length == 0">找不到此人....</div>
      </div>

      <div class="btn-add-user">
        <Button type="success" size="small" @click="toAddUser">去登记&nbsp;<Icon type="arrow-right-c"></Icon>
        </Button>
      </div>
    </div>

    <Modal v-model="showSecretInfo" title="TA的隐私信息" @on-ok="showSecretInfo = false">
      <div class="secret-info">
        <div>地址：{{curSecretInfo._address}}</div>
        <div>电话：{{curSecretInfo._phone}}</div>
        <div>备注：{{curSecretInfo._memo}}</div>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="showSecretInfo=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import user from '../lib/user';

  export default {
    data() {
      return {
        first: 1,
        name: null,
        showTip: true,
        users: null,
        loadingUser: false,
        genderTxt: {
          M: '男',
          F: '女'
        },
        showSecretInfo: false,
        curSecretInfo: {},
        secretCost: 0.01,//查看隐私费用
        loadingModal: null
      }
    },
    methods: {
      toAddUser() {
        this.$router.push({name: 'add'});
      },
      keyupName(event) {
        if (event.key == 'Enter') {
          this.searchUser();
        }
      },
      searchUser() {
        var name = this.name;
        if (!name) {
          this.$Message.warning('请输入搜索姓名');
          return;
        }
        this.showTip = false;
        this.loadingUser = true;
        user.search(this.name, res => {
          this.loadingUser = false;
          if (res.code == 0) {
            this.setUsers(res.data);
          } else {
            this.$Message.error(res.msg || '查询失败');
          }
        });
      },
      setUsers(users) {
        var rs = [];
        if (users) {
          users.forEach(user => {
            if (user.nasAddress && user.name) {
              rs.push(user);
            }
          });
        }
        this.users = rs;
      },
      seeSecretInfo(address) {
        this.loadSecretInfo(address);
      },
      //加载隐私信息
      loadSecretInfo(address) {
        var info = this.secertInfo[address];
        if (info) {
          this.openSecretInfo(info);
        } else {
          this.$Message.info('需支付' + this.secretCost + 'nas');
          //去查区块链
          user.getSecretInfo(address, res => {
            console.log(res)
            if (res.loading != undefined) {
              this.loading(res.loading, res.msg);
            } else {
              this.loading(false);
              if (res.code == -2) {
                this.$Modal.error({
                  title: '结果',
                  content: '您支付的nas费用低于' + this.secretCost + '，无法查看！',
                  okText: '知道了'
                });
              } else if (res.code == 0) {
                this.$Message.success('交易成功！');
                this.$store.state.secertInfo[address] = res.data;
                this.openSecretInfo(res.data);
              } else {
                this.$Message.error(res.msg || '交易失败');
              }
            }
          });
        }
      },
      openSecretInfo(info) {
        this.showSecretInfo = true;
        this.curSecretInfo = info;
      },
      loading(value, msg) {
        if (this.loadingModal) {
          this.loadingModal();
        }
        if (value) {
          this.loadingModal = this.$Message.loading({
            content: msg,
            duration: 0
          });
        } else if (msg) {
          this.$Message.info(msg);
        }
      }
    },
    computed: {
      secertInfo() {
        return this.$store.state.secertInfo;
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  .ivu-spin-fix {
    background-color: rgba(225, 225, 225, 0.5) !important;
    border-radius: 10px !important;;
  }

  .listPage {
    .secret-info {
      div {
        line-height: 30px;
      }
    }
    .list .ivu-tooltip {
      vertical-align: top;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
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
        padding: 8px 8px 8px 0;
      }
    }
    .bd-list {
      min-height: 76px;
      position: relative;
      margin: 15px auto;
      padding: 8px 0;
      width: 100%;
      .list {
        text-align: left;
        margin: 10px 0;
        .user {
          width: 78%;
          display: inline-block;
          padding-left: 8px;
          span {
            height: 22px;
            line-height: 22px;
          }
        }
        span {
          text-align: left;
          display: inline-block;
          width: 30%;
        }
        .ivu-btn {
          span {
            width: 36px;
          }
        }
        .btn-secret {
          margin-left: 1%;
          vertical-align: top;
          border-color: #9096aa;
        }
      }
    }

    .no-result {
      text-align: center;
      height: 60px;
      line-height: 60px;
    }

    .btn-add-user {
      margin-top: 5px;
      text-align: right;
    }
  }
</style>
