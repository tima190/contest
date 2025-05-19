<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="header-content">
        <nuxt-link to="/" class="title">
          <h1>contest</h1>
        </nuxt-link>
        <div class="nav-buttons">
          <nuxt-link to="/dashboard"><h3 v-if="user">{{ userNickname }}</h3></nuxt-link>
          <nuxt-link to="/login"><a-button type="primary" class="">Вход</a-button></nuxt-link>
          
          <nuxt-link to="/signup"><a-button>Регистрация</a-button></nuxt-link>
          <a-button v-if="user" @click="handleLogout">Выйти</a-button>
        </div>
          
      </div>
    </a-layout-header>

    <a-layout-content class="content">
      <div class="content-inner">
        <slot />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const handleLogout = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
const surveys = ref([]);
const userNickname = ref('');
const logs = ref([]);

onMounted(async () => {
  if (!user.value) return;

  const { data: profile, error: profileError } = await supabase
  .from('profile')
  .select('display_name')
  .eq('id', user.value.id)
  .maybeSingle();

if (profileError) {
  console.error('Ошибка при получении ника:', profileError.message);
} else if (profile) {
  console.log('Полученный профиль:', profile);
  userNickname.value = profile.display_name;
}


});
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
  position: sticky;
  top: 0;
  z-index: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  color: inherit;
  text-decoration: none;
  margin: 0;
}

.title h1 {
  margin: 0;
  font-size: 20px;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content {
  padding: 24px;
  background: #fff;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 112px);
}

.mr-8 {
  margin-right: 8px;
}
</style>