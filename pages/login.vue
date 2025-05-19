<template>
  <div class="auth-container">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <nuxt-link to="/signup">Нет аккаунта? Зарегистрироваться</nuxt-link>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (supabaseError) throw supabaseError

    await navigateTo('/dashboard')
    
  } catch (err) {
    error.value = getErrorMessage(err.message)
    console.error('Ошибка входа:', err)
  } finally {
    loading.value = false
  }
}

const getErrorMessage = (code) => {
  const errors = {
    'Invalid login credentials': 'Неверный email или пароль',
    'Email not confirmed': 'Email не подтвержден',
    'Too many requests': 'Слишком много попыток. Попробуйте позже'
  }
  return errors[code] || 'Ошибка входа'
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