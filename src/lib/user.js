import nasTool from './nasTool';
class User {

  //登记用户
  static add(user,success){
    nasTool.pay({
      func: 'addUserInfo',
      value:0.01,
      args: [user]
    }, success);
  }
}

export default User;
