<template>
  <div class="partner-container">
    <div class="section">
      <h3 class="title">Список учебных заведений в базе</h3>

      <div class="list">
        <div
          v-for="(university, i) in universityStore.universities"
          :key="i"
          :value="university"
          class="item"
        >
          <div class="title">{{ university.title }}</div>
          <div class="actions">
            <RouterLink
              :to="{
                path: `/supervisor/university`,
                query: { id: university.id },
              }"
              class="btn"
              >Выбрать</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <RouterLink :to="{ path: '/supervisor/university' }" class="btn">Добавить учебное заведение</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUniversityStore } from "@/stores/university-store";

const universityStore = useUniversityStore();
universityStore.getUniversities();
</script>

<style scoped>
.institutions-section {
  margin-top: 30px;
}

.action-column {
  text-align: center;
}
</style>
