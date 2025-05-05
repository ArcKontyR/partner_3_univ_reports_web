<script setup lang="ts">
import SupervisorForm from "../components/SupervisorForm.vue";
defineProps<{
  msg: string;
}>();
</script>

<template>
  <main>
    <h2 class="form-header">{{ msg }}</h2>
    <SupervisorForm />
  </main>
</template>
