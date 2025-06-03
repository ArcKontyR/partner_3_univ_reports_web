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
        { path: '/supervisor/university/report', component: () => import('@/components/ReportForm.vue') }
      ],
      props:{
        msg: "Партнер"
      }
    },
    {
      path: '/student',
      component: () => import('@/views/StudentView.vue'),
      props:{
        msg: "Студент"
      }
    },
  ],
})

export default router
