const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Members', name: 'Members', component: () => import('pages/MembersManager.vue') },
      { path: 'Projects', name: 'Projects', component: () => import('pages/ProjectsManager.vue') },
      { path: 'Projects/AddProject', name: 'AddProject', component: () => import('pages/AddProject.vue') }
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