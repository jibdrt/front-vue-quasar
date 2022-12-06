
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterForm.vue')},
      { path: '/notelist', component: () => import('pages/NoteList.vue' )},
      { path: '/filelist', component: () => import('pages/FileList.vue' )},
      { path: '/userprofil', component: () => import('pages/UserProfil.vue') },
      { path: '/changepassword', component: () => import('pages/ChangePassword.vue') },
      { path: '/editprofile', component: () => import('pages/ChangeCredent.vue') },
      { path: '/adminboard', component: () => import('pages/AdminBoard.vue') },
      { name: 'AdminUser',
        path: '/adminboard/:id',
        component: () => import('pages/AdminUser.vue') },
      {
        name: 'NoteDetail',
        path: '/notelist/:id',
        component: () => import('pages/NoteDetail.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
