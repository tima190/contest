export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Запретить доступ к защищенным страницам без авторизации
  if (!user.value && !['/login', '/signup'].includes(to.path)) {
    return navigateTo('/login')
  }

  // Перенаправлять авторизованных пользователей с auth-страниц
  if (user.value && ['/login', '/signup'].includes(to.path)) {
    return navigateTo('/dashboard')
  }
})