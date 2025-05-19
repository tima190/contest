<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
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
  margin: 0;
  font-size: 20px;
}

.buttons {
  display: flex;
  align-items: center;
}

.mr-8 {
  margin-right: 8px;
}

.content {
  padding: 24px;
  background: #fff;
  flex: 1;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

/* Сброс стандартных отступов */
html, body {
  margin: 0;
  padding: 0;
}
</style>