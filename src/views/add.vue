<template>
  <div class="main">
    <div class="hd-top">
      where are you?
    </div>
    <div class="bd-content">
      <Form ref="userForm" :model="user" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="user.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input type="text" number v-model="user.age" placeholder="请输入年龄"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="user.gender">
            <Radio label="M">男</Radio>
            <Radio label="F">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="个性签名" prop="descr">
          <Input v-model="user.descr" type="textarea" :autosize="{minRows: 3,maxRows: 15}"></Input>
        </FormItem>
        <fieldset>
          <legend>&nbsp;&nbsp;隐私信息&nbsp;&nbsp;
            <!--<Tooltip content="他人" placement="right"><Icon type="help"></Icon></Tooltip>-->
          </legend>
        </fieldset>
        <FormItem label="联系地址" prop="_address">
          <Input v-model="user._address"></Input>
        </FormItem>
        <FormItem label="联系号码" prop="_phone">
          <Input v-model="user._phone"></Input>
        </FormItem>
        <FormItem label="备注" prop="_memo">
          <Input v-model="user._memo"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitUser">登记
            <small style="color: #ffeaea;">(需付0.01nas)</small>
          </Button>
          <Button type="success" @click="toList" style="float: right;">去找人&nbsp;<Icon type="arrow-right-c"></Icon>
          </Button>
          <!-- <Button type="ghost" @click="handleReset('user')" style="margin-left: 8px">重置</Button>-->
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import user from '../lib/user';

  export default {
    data() {
      return {
        user: {
          name: null,
          age: null,
          gender: 'M',
          descr: null,
          _address: null,
          _phone: null,
          _msg:null
        },
        ruleValidate: {
          name: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          age: [
            {type: 'number', required: true, message: '必填项', trigger: 'blur'},
            {type: 'number', Range: [1, 150], message: '年龄必须在1-150之间'}
          ],
          descr: [
            {required: true, message: '总得说点什么吧'},
            {type: 'string', max: 200, message: '不能超过200个字符', trigger: 'blur'}
          ],
          _phone: [
            {type: 'string', pattern: /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/, message: '格式不正确'}
          ],
          _address:[
            {required: true, message: '必填项',trigger: 'blur'},
            {type: 'string', max: 200, message: '不能超过200个字符', trigger: 'blur'}
          ],
          _memo:[
            {type: 'string', max: 100, message: '不能超过100个字符', trigger: 'blur'}
          ]
        },
        loadingModal: null
      }
    },
    methods: {
      submitUser() {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            user.add(this.user, res => {
              if(res.loading != undefined){
                this.loading(res.loading,res.msg);
              }else{
                this.loading(false);
                if(res.code == 0){
                  this.$Message.success('登记成功！');
                  this.toList();
                }else{
                  this.$Message.error(res.msg || '登记失败');
                }
              }
            });
          }
        })
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
        } else if(msg){
          this.$Message.info(msg);
        }
      },
      toList(){
        this.$router.push({name:'list'});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .main {
    width: 100%;
    height: 100%;

    .hd-top {
      width: 500px;
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
    .bd-content {
      color: #333333;
      min-width: 500px;
      max-width: 600px;
      margin: 0 auto;
      //margin-top: 20px;
      // margin-left: 10%;
      padding: 30px 60px 10px;
      border-radius: 10px;
      background-color: rgba(225, 225, 225, .8);
      box-shadow: 0px 0px 40px #ffffff;
      .ivu-form .ivu-form-item-label {
        color: #333333;
      }
      .ivu-btn-ghost {
        color: #ffffff;
      }
      .ivu-btn-ghost:hover {
        color: #2d8cf0;
      }
    }

    fieldset {
      border-top: 1px dashed #9e9e9e;
      border-left: none;
      border-right: none;
      border-bottom: none;
      padding-left: 75px;
      margin-bottom: 8px;
    }
  }
</style>
