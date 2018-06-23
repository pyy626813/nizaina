//通用工具类
var Common = (function () {
  var common = {};
  //value = undefind 取值，否则设置缓存值
  common.cache = function (name, value) {
    if (!this.store) {
      console.error('store尚未注册到common中');
      return;
    }
    var cacheData = this.store.state.cacheData;
    if (value == undefined) {
      return cacheData[name];
    }
    cacheData[name] = value;
  };

  /*//直接通过state属性值拿到缓存值
   common.getStateValue = function (vue, name) {
   if (!vue) {
   return null;
   }
   var arr = name.split('.');
   var cur = vue.$store.state;
   arr.forEach(item => {
   if (cur) {
   cur = cur[item];
   } else {
   return false;
   }
   });
   return cur;
   }*/

  return common;
})();
export default Common;
