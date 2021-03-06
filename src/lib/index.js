//时间
import Moment from 'moment';
//通用工具类
import commmon from './common';

import nasTool from './nasTool';

//jq
import './deferred'
//原型增强
import 'iview/dist/styles/iview.css';
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/common.scss';

const install = function (Vue, config = {}) {
  if (install.installed) return;


  nasTool.init();
  nasTool.vue = Vue;

  global.moment = Moment;
  global.$commmon = commmon;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {install}
