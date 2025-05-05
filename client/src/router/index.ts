import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/supervisor',
      name: 'supervisor',
      component: () => import('@/views/SupervisorView.vue'),
      props:{
        msg: "Партнер"
      }
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/views/StudentView.vue'),
      props:{
        msg: "Студент"
      }
    },
  ],
})

export default router
