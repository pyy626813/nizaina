var routers = [{
  path: '/',
  name: 'index',
  component(resolve) {
    require(['../views/index.vue'], resolve)
  }
},{
  path: '/list',
  name: 'list',
  component(resolve) {
    require(['../views/list.vue'], resolve)
  }
}];
export default routers
