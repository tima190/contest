<template>
  <div class="auth-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSignUp">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль (минимум 6 символов)" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Регистрация...' : 'Создать аккаунт' }}
      </button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <nuxt-link to="/login">Уже есть аккаунт? Войти</nuxt-link>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSignUp = async () => {
  try {
    loading.value = true
    error.value = ''

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (supabaseError) throw supabaseError

    // Автоматический вход после регистрации
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (loginError) throw loginError

    await navigateTo('/dashboard')
    
  } catch (err) {
    error.value = getErrorMessage(err.message)
    console.error('Ошибка регистрации:', err)
  } finally {
    loading.value = false
  }
}

const getErrorMessage = (code) => {
  const errors = {
    'User already registered': 'Пользователь с таким email уже существует',
    'Password should be at least 6 characters': 'Пароль должен содержать минимум 6 символов',
    'Invalid email': 'Некорректный формат email'
  }
  return errors[code] || code
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 20px;
}

.error {
  color: red;
  margin: 1rem 0;
}

/* Убедитесь, что все стили написаны корректно */
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

a {
  color: #007bff;
  text-decoration: none;
  display: block;
  margin-top: 1rem;
}
</style>