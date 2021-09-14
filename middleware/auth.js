export default function ({ app }) {
  // If the user is not authenticated
  app.router.beforeResolve((to, from, next) => {
    if (app.store.getters['auth/isLogged']) {
      next()
    } else {
      next('/index')
    }
  })
}
