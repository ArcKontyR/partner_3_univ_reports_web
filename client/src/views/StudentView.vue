<script setup lang="ts">
import StudentForm from '../components/StudentForm.vue'
defineProps<{
    msg: string
}>()
</script>

<template>
  <main>
    <h2 class="form-header">{{ msg }}</h2>
    <StudentForm/>
  </main>
</template>