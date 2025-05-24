<template>
  <div class="partner-container">
    <div class="institutions-section">
      <h3>Список учебных заведений в базе</h3>

      <div class="institutions-table">
        <div class="table-header">
          <div class="name-column">Название учебного заведения</div>
          <div class="action-column">Действие</div>
        </div>

        <div
          v-for="(university, i) in universityStore.universities"
          :key="i"
          :value="university"
          class="table-row"
        >
          <div class="name-column">{{ university.title }}</div>
          <div class="action-column">
            <RouterLink :to="{ path: `/supervisor/university`, query: {id : university.id} }" class="btn" @click="selectUniversity(university)">Выбрать</RouterLink>
            <!-- <button class="btn" @click="selectUniversity(university)">Выбрать</button> -->
          </div>
        </div>
      </div>
    </div>
    <RouterLink :to="{ path: '/supervisor/university' }" class="btn">Добавить учебное заведение</RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { University } from "@/interfaces";
import { useSupervisorStore } from "@/stores/supervisor-store";
import { useUniversityStore } from "@/stores/university-store";

const universityStore = useUniversityStore();
const supervisorStore = useSupervisorStore();

universityStore.getUniversities();
supervisorStore.getSupervisors();

</script>

<style scoped>
.institutions-section {
  margin-top: 30px;
}

.institutions-table {
  margin: 20px 0;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  padding: 12px 15px;
}

.table-header {
  background: #f8f9fa;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.table-row {
  border-bottom: 1px solid #eee;
}

.table-row:last-child {
  border-bottom: none;
}

.action-column{
    text-align: center;
}
</style>
