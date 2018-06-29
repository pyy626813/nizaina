<template>
  <div class="submit">
    <div class="hd-top">
      logo {{title}}
    </div>
    <div class="bd-content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input type="text" number v-model="formValidate.age" placeholder="请输入年龄"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="Male">帅哥</Radio>
            <Radio label="Female">美女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="说明" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="说明..."></Input>
        </FormItem>
        <hr class="hr-br" />
        <div class="hr-line">隐私信息</div>
        <FormItem label="地址" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="手机号" prop="mail">
          <Input v-model="formValidate.mail" placeholder="请输入手机号"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
         <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>-->
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            title:'Welcome',
            formValidate: {
              name: '',
              age: '',
              mail: '',
              gender: '',
              interest:[],
              desc: ''
            },
            ruleValidate: {
              name: [
                { required: false, message: 'The name cannot be empty', trigger: 'blur' }
              ],
              age: [
                { required: false, message: 'Mailbox cannot be empty', trigger: 'blur' },
                { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
              ],
              gender: [
                { required: false, message: 'Please select gender', trigger: 'change' }
              ],
              interest: [
                { required: false, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
              ],
              desc: [
                { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
              ]
            }
          }
      },
      methods: {
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  body{
    background-image: url("../assets/images/bannerBg1.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0.5;
  }
  .submit{
    width: 100%;
    height: 100%;

    .hd-top{
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
    .bd-content{
      color: #333333;
      background-color: #fff;
      width: 500px;
      margin: 0 auto;
      //margin-top: 20px;
     // margin-left: 10%;
      padding: 40px 40px 20px 20px;
      border-radius: 10px;
      background-color: rgba(225,225,225,.7);
      box-shadow: 0px 0px 40px #ffffff;
      .ivu-form .ivu-form-item-label{
        color: #333333;
      }
      .ivu-btn-ghost{
        color: #ffffff;
      }
      .ivu-btn-ghost:hover{
        color: #2d8cf0;
      }
    }
    .hr-br{
      border: none;
      height: 1px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(225, 225, 225, 0.9), rgba(0, 0, 0, 0));
      margin-top: 30px;
      margin-left: 40px;
      margin-bottom: 30px;
      /*border: 0;
      border-bottom: 1px dashed #ccc;
      background: #999;*/
    }
    .hr-line{
      margin-top: 30px;
      margin-left: 80px;
      margin-bottom: 30px;
      padding: 0 20px 0;
      line-height: 1px;
      border-left: 135px dashed #ddd;
      border-right: 135px dashed #ddd;
      text-align: center;
    }
  }
</style>
