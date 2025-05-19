<template>
  <div>
    <h1>Проверьте вашу почту</h1>
    <p>Мы отправили ссылку для подтверждения на {{ email }}</p>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const email = ref('')

onMounted(async () => {
  if (route.hash) {
    const { data, error } = await supabase.auth.verifyOtp({
      type: 'email',
      token_hash: route.hash.replace('#', '')
    })
    
    if (!error) {
      await navigateTo('/dashboard')
    }
  }
})
</script>