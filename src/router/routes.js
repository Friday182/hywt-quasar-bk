
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'StudentHome', component: () => import('pages/StudentHome.vue') },
      { path: 'MentorHome', component: () => import('pages/MentorHome.vue') },
      { path: 'ShowTopics', component: () => import('pages/ShowTopics.vue') },
      { path: 'Membership', component: () => import('pages/Membership.vue') },
      { path: 'Products', component: () => import('pages/Products.vue') },
      { path: 'Curriculum', component: () => import('pages/Curriculum.vue') },
      { path: 'SchoolDic', component: () => import('pages/SchoolDic.vue') },
      { path: 'KeyDate', component: () => import('pages/KeyDate.vue') },
      { path: 'Contact', component: () => import('pages/Contact.vue') },
      { path: 'UserManual', component: () => import('pages/UserManual.vue') },
      { path: 'QandA', component: () => import('pages/QandA.vue') },
      { path: '*', component: () => import('pages/Error404.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
