'use strict';

//用户隐私信息属性
var secretProps = ['_address', '_phone'];

class response {
  static ok(data, msg) {
    return {code: 0, data: data, msg: msg}
  }

  static fail(msg) {
    return {code: -1, msg: msg}
  }
}

var wxm = function () {
  LocalContractStorage.defineProperty(this, "adminAddress");
  //{名称：[address]}
  LocalContractStorage.defineMapProperty(this, "nameMap");
  //{address:userInfo}
  LocalContractStorage.defineMapProperty(this, "userMap");
};

wxm.prototype = {
  init () {
    this.admin = Blockchain.transaction.from;
  },
  addUserInfo (user) {
    var from = Blockchain.transaction.from;
    user = user || {};
    var name = user.name;
    if (!name) {
      return response.fail('name property is required');
    }
    //同个地址用户名称发生变化
    var oldUser = this.userMap[from];
    if (oldUser && oldUser.name != name) {
      this._deleteOldName(oldUser.name, from);
    }

    var addresses = this.nameMap[name];
    var addresses = this.nameMap[name];
    if (addresses) {
      addresses.push(user)
    } else {
      addresses = [user];
    }
    this.nameMap.set(name, addresses);
    this.userMap.set(from, user);
    return response.ok();
  },
  searchUsers (name) {
    if (!name) {
      return response.ok([]);
    }
    var addresses = this.nameMap[name];
    var users = [];
    if (addresses && addresses.length > 0) {
      addresses.forEach(address => {
        var user = this.userMap.get(address);
        if (user) {
          this._deleteSecretValues(user);
          users.push(user);
        }
      });
    }
    return response.ok(users);
  },
  //查看用户隐私信息
  getSecretInfo (fromAddress) {
    if (!fromAddress) {
      return response.fail();
    }
    var user = this.userMap[fromAddress];
    var rs = {};
    if (user) {
      secretProps.forEach(prop => {
        rs = user[prop];
      });
    }
    return rs;
  },
  //提现至管理员
  withdraw (value) {
    var address = Blockchain.transaction.from;
    if (address == this.admin) {
      return response.fail('you are not admin');
    }
    var result = Blockchain.transfer(address, value);
    if (result) {
      return response.ok();
    } else {
      return response.fail('withdraw fail');
    }
  },
  //删除原始用户名称对应地址信息
  _deleteOldName (name, address) {
    var ads = this.nameMap[name] || [];
    if (ads.length > 0) {
      ads.forEach((ad, index) => {
        if (ad == address) {
          ads.splice(index, 1);
          return false;
        }
      });
      if (ads.length == 0) {
        this.nameMap.delete(name);
      } else {
        this.nameMap.set(name, ads);
      }
    }
  },
  //删除用户隐私字段
  _deleteSecretValues(user) {
    secretProps.forEach(prop => {
      delete user[prop];
    });
  }
};

module.exports = wxm;
