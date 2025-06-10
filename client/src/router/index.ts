import { useSupervisorStore } from '@/stores/supervisor-store';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/supervisor',
      component: () => import('@/views/SupervisorView.vue'),
      children: [
        { path: '/supervisor', component: () => import('@/components/SupervisorForm.vue') },
        { path: '/supervisor/university', component: () => import('@/components/UniversityForm.vue') },
        { path: '/supervisor/university/report', component: () => import('@/components/ReportForm.vue') },
      ],
      meta: {
        requiresAuth: true
      },
      props: {
        msg: "Партнер"
      }
    },
    {
      path: '/student',
      component: () => import('@/views/StudentView.vue'),
      props: {
        msg: "Студент"
      }
    },
    {
      path: '/',
      component: () => import('@/views/SupervisorView.vue'),
      children: [
        {
          path: '/login',
          component: () => import('@/components/Login.vue'),
        },
        { path: '', redirect: "/student" },
      ],
      props: {
        msg: "Партнер - Авторизация"
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const supervisorStore = useSupervisorStore();

  if (to.meta.requiresAuth && !supervisorStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router
