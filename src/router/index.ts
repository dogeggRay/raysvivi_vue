import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue')
  // }, 
  {
    path: '/',
    name: 'root',
    redirect:"/view/boxOffice",
  }, 
  {
    path: '/view',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "login" */ '@/views/main/LayoutView.vue'),
    redirect:"/view/boxOffice",
    children: [
      {
        path: '/view/boxOffice',
        name: 'BoxOfficeViewPage',
        component: () =>
          import(
            '@/views/spider/BoxOfficeView.vue'
          ),
      },{
        path: '/view/about',
        name: 'aboutPage',
        component: () =>
          import(
            '@/views/about/AboutView.vue'
          ),
      }]
  },   
  {
    path: '/MessageBoard',
    name: 'MessageBoardPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
    import(
      '@/views/messageBoard/MessageBoard.vue'
    ),
  },
  {
    path: '/Statement',
    name: 'StatementPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
    import(
      '@/views/statement/statement_page.vue'
    ),
  },  
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
