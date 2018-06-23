// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import Vuex from 'vuex'
import VuexConfig from './vuex'
import iView from 'iview';

//项目依赖文件
import lib from './lib';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(lib)
Vue.use(iView)

const store = new Vuex.Store(VuexConfig)

const router = new VueRouter({
  // mode: 'hash',
  //mode: 'history',
  routes
});

//使得通用工具类可直接操作vuex
$commmon.store = store;

router.beforeEach((to, from, next) => {
  //iView.LoadingBar.start()
  next();
});

router.afterEach(router => {
  //iView.LoadingBar.finish()
});

// 取消 Vue 所有的日志与警告。
// Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
