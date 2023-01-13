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
      }, 
      {
        path: '/view/messageBoard',
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
        path: '/view/friendlyLinks',
        name: 'FriendlyLinks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
        import(
          '@/views/friendlyLinks/FriendlyLinksView.vue'
        ),
      },]
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
    path: '/comment',
    name: 'CommentView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
    import(
      '@/views/comment/CommentView.vue'
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
