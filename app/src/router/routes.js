
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login/IndexPage.vue') },
      { path: '/register', component: () => import('pages/Register/RegisterForm.vue')},
      { path: '/notelist', component: () => import('pages/Note/NoteList.vue' )},
      { path: '/filelist', component: () => import('pages/File/FileList.vue' )},
      { path: '/userprofil', component: () => import('pages/Profile/UserProfil.vue') },
      { path: '/changepassword', component: () => import('pages/Profile/ChangePassword.vue') },
      { path: '/editprofile', component: () => import('pages/Profile/ChangeCredent.vue') },
      { path: '/adminboard', component: () => import('pages/Profile/AdminBoard.vue') },
      { name: 'AdminUser',
        path: '/adminboard/:id',
        component: () => import('pages/Profile/AdminUser.vue') },
      {
        name: 'NoteDetail',
        path: '/notelist/:id',
        component: () => import('pages/Note/NoteDetail.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
