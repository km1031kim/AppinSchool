
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/SignUp', component: () => import('pages/SignUp.vue') },
      { path: '/ForgetPwd', component: () => import('pages/ForgetPwd.vue') },
      { path: '/UserMain', component: () => import('pages/UserMain.vue') },
      { path: '/myinfo', component: () => import('src/pages/myInfo.vue') },
      { path: '/updateInfo', component: () => import('src/pages/updateInfo.vue') }
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
  
]

export default routes
