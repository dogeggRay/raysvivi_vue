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
    redirect:"/view/blogList",
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
        meta:{ keepAlive: true,
          module:"blogList"}
      },{
        path: '/view/blogDetail',
        name: 'blogDetail',
        component: () =>
          import(
            '@/views/blog/detail/blogDetail.vue'
          ),
        meta:{ keepAlive: true,
        module:"blogDetail"}
      },{
        path: '/view/about',
        name: 'aboutPage',
        component: () =>
          import(
            '@/views/about/AboutView.vue'
          ),
        meta:{ keepAlive: false,
          module:"about"}  
      }, 
      {
        path: '/view/messageBoard',
        name: 'MessageBoardPage',
        component: () =>
        import(
          '@/views/messageBoard/MessageBoard.vue'
        ),
        meta:{ keepAlive: true,
          module:"messageBoard"} 
      },   
      {
        path: '/view/friendlyLinks',
        name: 'FriendlyLinks',
        component: () =>
        import(
          '@/views/friendlyLinks/friendlyLinksView.vue'
        ),
        meta:{ keepAlive: true,
          module:"friendlyLinks"} 
      },{
        path: '/view/structure',
        name: 'structure',component: () =>
        import(
          '@/views/structure/structure_page.vue'
        )
      }]
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
      '@/views/component/CommentView.vue'
    ),
    meta:{ keepAlive: false}
  },  
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'adminMain',
    component: () => import(/* webpackChunkName: "login" */ '@/views/admin/adminMain.vue'),
    redirect:"/admin/adminBlog",
    children: [
      {
        path: '/admin/adminBlog',
        name: 'adminBlog',
        component: () =>
          import(
            '@/views/admin/adminBlog.vue'
          ),
          meta:{ keepAlive: false} 
      },{
        path: '/admin/adminStructure',
        name: 'adminStructure',
        component: () =>
          import(
            '@/views/admin/adminStructure.vue'
          ),
          meta:{ keepAlive: false} 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
