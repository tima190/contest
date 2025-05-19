<script setup>
import { onMounted, ref } from 'vue';
const user = useSupabaseUser();
const client = useSupabaseClient();

const userNickname = ref('');

onMounted(async () => {
  if (!user.value) {
    console.warn('Пользователь не авторизован');
    return;
  }

  console.log('ID пользователя:', user.value.id);

  const { data: profile, error } = await client
    .from('profile')
    .select('display_name')
    .eq('id', user.value.id)
    .maybeSingle();

  if (error) {
    console.error('Ошибка при получении ника:', error.message);
  } else if (profile) {
    console.log('Найден профиль:', profile);
    userNickname.value = profile.display_name;
  } else {
    console.warn('Профиль не найден');
  }

});
</script>

<template>
  <div>
    <p v-if="userNickname">Добро пожаловать, {{ userNickname }}!</p>
    <p v-else>Загрузка ника...</p>
  </div>
</template>
