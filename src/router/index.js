var routers = [{
  path: '/add',
  name: 'add',
  component(resolve) {
    require(['../views/add.vue'], resolve)
  }
},{
  path: '/',
  name: 'list',
  component(resolve) {
    require(['../views/list.vue'], resolve)
  }
}];
export default routers
