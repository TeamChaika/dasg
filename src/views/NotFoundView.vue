<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Запрошенный URL "{{ $route.path }}" не существует</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>