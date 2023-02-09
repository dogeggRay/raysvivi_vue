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
    redirect:"/view/blogList",
    children: [
      {
        path: '/view/boxOffice',
        name: 'BoxOfficeViewPage',
        component: () =>
          import(
            '@/views/spider/BoxOfficeView.vue'
          ),
      },{
        path: '/view/blogList',
        name: 'blogList',
        component: () =>
          import(
            '@/views/blog/list/blogList.vue'
          ),
        meta:{ keepAlive: true}
      },{
        path: '/view/blogDetail',
        name: 'blogDetail',
        component: () =>
          import(
            '@/views/blog/detail/blogDetail.vue'
          ),
        meta:{ keepAlive: true}
      },{
        path: '/view/about',
        name: 'aboutPage',
        component: () =>
          import(
            '@/views/about/AboutView.vue'
          ),
        meta:{ keepAlive: true}  
      }, 
      {
        path: '/view/messageBoard',
        name: 'MessageBoardPage',
        component: () =>
        import(
          '@/views/messageBoard/MessageBoard.vue'
        ),
        meta:{ keepAlive: true} 
      },   
      {
        path: '/view/friendlyLinks',
        name: 'FriendlyLinks',
        component: () =>
        import(
          '@/views/friendlyLinks/friendlyLinksView.vue'
        ),
        meta:{ keepAlive: true} 
      },{
        path: '/view/adminBlog',
        name: 'adminBlog',
        component: () =>
        import(
          '@/views/adminBlog/adminBlog.vue'
        ),
        meta:{ keepAlive: true} 
      },]
  },  
  {
    path: '/Statement',
    name: 'StatementPage',
    component: () =>
    import(
      '@/views/statement/statement_page.vue'
    ),
  },  
  {
    path: '/comment',
    name: 'CommentView',
    component: () =>
    import(
      '@/views/comment/CommentView.vue'
    ),
  },  
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
