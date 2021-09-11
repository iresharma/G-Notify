export default function ({ app }) {
  // If the user is not authenticated
  app.router.beforeResolve((to, from, next) => {
    if (app.store.getters.isLogged) {
      next()
    } else if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  })
}
