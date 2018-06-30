'use strict';

//用户隐私信息属性
var secretProps = ['_address', '_phone'];

class response {
  static ok(data, msg) {
    return {code: 0, data: data, msg: msg}
  }

  static fail(msg,code) {
    return {msg: msg,code: code || -1}
  }
}

var wxm = function () {
  LocalContractStorage.defineProperty(this, "adminAddress");
  //查看隐私信息最低费用
  LocalContractStorage.defineProperty(this, "priceForSecret");
  //{名称：[address]}
  LocalContractStorage.defineMapProperty(this, "nameMap");
  //{address:userInfo}
  LocalContractStorage.defineMapProperty(this, "userMap");
};

wxm.prototype = {
  init() {
    this.adminAddress = Blockchain.transaction.from;
    this.priceForSecret = 0.01;
  },
  addUserInfo(user) {
    var value = Blockchain.transaction.value;
    if(value < 0.01){
      //支付金额不足0.01
      return response.fail('money is less than 0.01',-2);
    }

    var from = Blockchain.transaction.from;
    user = user || {};
    var name = user.name;
    if (!name) {
      return response.fail('name property is required');
    }
    //同个地址用户名称发生变化
    var oldUser = this.userMap.get(from);
    if (oldUser) {
      this._deleteOldUser(oldUser.name, from);
    }

    var addresses = this.nameMap.get(name);
    if (addresses) {
      addresses.push(from)
    } else {
      addresses = [from];
    }
    this.nameMap.set(name, addresses);
    this.userMap.set(from, user);
    return response.ok();
  },
  searchUsers(name) {
    if (!name) {
      return response.ok([], 'name is required');
    }
    var addresses = this.nameMap.get(name);
    var users = [];
    if (addresses && addresses.length > 0) {
      addresses.forEach(address => {
        var user = this.userMap.get(address);
        if (user) {
          this._deleteSecretValues(user);
          user.nasAddress = address;
          users.push(user);
        }
      });
    }
    return response.ok(users);
  },
  //查看用户隐私信息
  getSecretInfo(fromAddress) {
    if (!fromAddress) {
      return response.fail('缺少查看的用户地址');
    }

    var value = Blockchain.transaction.value;
    if (value < this.priceForSecret) {
      //支付金额不足
      return response.fail('money is less than ' + this.priceForSecret,-2);
    }

    var user = this.userMap.get(fromAddress);
    var rs = {};
    if (user) {
      secretProps.forEach(prop => {
        rs = user[prop];
      });
    }
    return rs;
  },
  //调整查看隐私信息手术费
  adjustPriceForSecret(price) {
    if (!this._isAdmin()) {
      return response.fail('operation not permitted');
    }
    if (!price) {
      price = 0;
    }
    this.priceForSecret = parseFloat(price);
    return super.ok(null, '调整后');
  },
  //提现至管理员
  withdraw(value) {
    var address = Blockchain.transaction.from;
    if (!this._isAdmin()) {
      return response.fail('operation not permitted');
    }
    var result = Blockchain.transfer(address, value);
    if (result) {
      return response.ok();
    } else {
      return response.fail('withdraw fail');
    }
  },
  _isAdmin() {
    var from = Blockchain.transaction.from;
    return from == this.adminAddress;
  },
  //删除原用户信息
  _deleteOldUser(name, address) {
    var ads = this.nameMap.get(name) || [];
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
