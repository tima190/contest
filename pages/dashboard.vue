<template>
  <div class="p-4">
    <p class="text-lg font-semibold mb-4">Привет, {{ userNickname }}</p>

    <!-- Поле для смены ника -->
    <div class="mb-4">
      <label for="nickname" class="block text-sm font-medium text-gray-700 mb-1">Новый никнейм</label>
      <input
        id="nickname"
        type="text"
        v-model="newNickname"
        placeholder="Введите новый ник"
        class="border rounded p-2 w-full"
      />
      <button
        @click="applyNickname"
        :disabled="isUpdating"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ isUpdating ? 'Сохраняем...' : 'Применить' }}
      </button>
    </div>

    <div class="logs">
      <h3 class="font-medium text-gray-800 mb-2">Логи сессии:</h3>
      <div v-for="(log, index) in logs" :key="index" class="log-entry text-sm text-gray-600">
        [{{ log.timestamp }}] {{ log.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = useSupabaseUser();
const client = useSupabaseClient();
const userNickname = ref('');
const newNickname = ref('');
const isUpdating = ref(false);
const logs = ref([]);

// Загрузка текущего ника
onMounted(async () => {
  if (!user.value) return;

  const { data: profile, error } = await client
    .from('profile')
    .select('display_name')
    .eq('id', user.value.id)
    .maybeSingle();

  if (error) {
    console.error('Ошибка при получении ника:', error.message);
  } else if (profile) {
    userNickname.value = profile.display_name;
    newNickname.value = profile.display_name; // Предзаполнить поле
  }
});

// Функция для обновления ника
async function applyNickname() {
  if (!newNickname.value.trim()) return;
  isUpdating.value = true;

  const { error } = await client
    .from('profile')
    .update({ display_name: newNickname.value.trim() })
    .eq('id', user.value.id);

  isUpdating.value = false;

  if (error) {
    console.error('Ошибка при обновлении ника:', error.message);
  } else {
    userNickname.value = newNickname.value.trim();
    console.log('Никнейм успешно обновлён');
    window.location.reload()
  }
}
</script>
