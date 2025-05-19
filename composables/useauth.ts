export const useAuth = () => {
  const user = useState('user', () => null)
  
  const { $auth } = useNuxtApp()

  // Автоматическое обновление состояния
  $auth.onAuthStateChanged((authUser) => {
    user.value = authUser
  })

  return { user }
}