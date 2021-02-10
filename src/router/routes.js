
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/Index.vue')
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('../pages/todos')
  }
]

export default routes
