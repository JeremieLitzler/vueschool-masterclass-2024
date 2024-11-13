import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { h } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('@/views/SingleProjectView.vue'),
    },

    {
      //catchAll is a wild card predefined in Vue to match all possible paths
      // (.*) matches any characters
      // * matches the previous patterns as many times as necessary
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: h('p', { style: 'color:red' }, '404 Not found'),
    },
    {
      //catchAll is a wild card predefined in Vue to match all possible paths
      // (.*) matches any characters
      // * matches the previous patterns as many times as necessary
      path: '/projects/:catchAll(.*)*',
      name: 'project-not-found',
      component: h('p', { style: 'color:red' }, 'Project not found'),
    },
  ],
})

export default router
