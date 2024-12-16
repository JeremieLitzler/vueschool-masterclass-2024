// the import below requires the following line
// to be added to `env.d.ts` to register the global
// typed in the IDE.
// otherwise, there will be an TS error.
//
// <reference types="unplugin-vue-router/client" />
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const routesSkippingGetSession = [RouterPathEnum.Login as string, RouterPathEnum.Register as string]
router.beforeEach(async (to, _from) => {
  if (!routesSkippingGetSession.includes(to.path)) {
    const { stillAuthenticated } = await useAuthStore().getSession()
    if (!stillAuthenticated) router.push(RouterPathEnum.Login as string)
  }
})

export default router
