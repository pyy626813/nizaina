import nasTool from './nasTool';

class User {

  //登记用户
  static add(user, success) {
    nasTool.pay({
      func: 'addUserInfo',
      value: 0.01,
      args: [user]
    }, success);
  }

  //搜索用户
  static search(name, success) {
    nasTool.get({
      func: 'searchUsers',
      args: [name]
    }, rs => {
      success(rs.result ? JSON.parse(rs.result) : null);
    });
  }

  //查看用户隐私信息
  static getSecretInfo(address, success) {
    nasTool.pay({
      func: 'getSecretInfo',
      value:0.01,
      args: [address]
    }, success)
  }
}

export default User;
