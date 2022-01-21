import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/dashbord/Dashbord.vue')
      },
      {
        path: '/dokter',
        component: () => import('../views/dokter/Dokter.vue')
      },
      {
        path: '/dokter/pasien/:id',
        component: () => import('../views/dokter/DetailPasien.vue')
      },
      {
        path: '/resepsionis',
        component: () => import('../views/resepsionis/Resepsionis.vue')
      },
      {
        path: '/visitors',
        component: () => import('../views/visitor/Visitor.vue')
      },
      {
        path: '/transaction',
        component: () => import('../views/transaction/Transaction.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem('access_token') === null) {
      localStorage.removeItem('access_token')
      // localStorage.removeItem('refresh_token')
      next({
        name: 'Login',
      })
      return
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
