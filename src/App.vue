<template>
  <ui-header/>
  <main :class="$style.main">
    <router-view/>
  </main>
</template>

<script setup>
  import UiHeader from './components/ui-header.vue'
</script>

<style>
  @import url('./assets/styles/app.scss');
  @import url('./assets/styles/_vars.scss')
</style>

<style module lang="scss">;
  .main {
    padding-top: var(--header-height);
    min-height: 100vh;
    display: flex;
  }
</style>
