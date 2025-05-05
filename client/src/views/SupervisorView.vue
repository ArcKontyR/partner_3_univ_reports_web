<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <main>
    <h2 class="form-header">{{ msg }}</h2>
    <RouterView />
  </main>
</template>
