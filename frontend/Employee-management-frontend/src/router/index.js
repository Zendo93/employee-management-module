import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeForm from '../components/EmployeeForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add',
      name: 'add',
      component: EmployeeForm
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EmployeeForm,
      props: route => ({
        employeeId: Number(route.params.id),
      })
    }
  ]
})

export default router
