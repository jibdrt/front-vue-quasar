
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterForm.vue')},
      { path: '/notelist', component: () => import('pages/NoteList.vue' )},
      { path: '/userprofil', component: () => import('pages/UserProfil.vue') },
      { path: '/adminboard', component: () => import('pages/AdminBoard.vue') },
      { name: 'AdminUserNotes',
        path: '/adminboard/:id',
        component: () => import('pages/AdminUserNotes.vue') },
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
