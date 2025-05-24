<template>
  <form class="practice-form" @submit.prevent="handleSubmit">
    <div class="form-field-title triple-column">
      <div class="name-field">
        <label>Фамилия</label>
        <input
          v-model="practiceStore.practice.Student.User.surname"
          type="text"
          placeholder="Иванов"
          required
        />
      </div>
      <div class="name-field">
        <label>Имя</label>
        <input
          v-model="practiceStore.practice.Student.User.name"
          type="text"
          placeholder="Иван"
          required
        />
      </div>
      <div class="name-field">
        <label>Отчество</label>
        <input
          v-model="practiceStore.practice.Student.User.patronymic"
          type="text"
          placeholder="Иванович"
        />
      </div>
    </div>

    <div class="form-field-title">
      <label>Вид практики</label>
      <input 
        v-model="practiceStore.practice.type"
        type="text" 
        required />
    </div>

    <div class="form-field-title dual-column">
      <div class="name-field">
        <label>Курс</label>
        <input
          v-model="practiceStore.practice.Student.course"
          type="number"
          placeholder="1"
          :max="6"
          required
        />
      </div>
      <div class="name-field">
        <label>Группа</label>
        <input
          v-model="practiceStore.practice.Student.group"
          type="string"
          placeholder=""
          required
        />
      </div>
    </div>

    <div class="form-field-title dual-column">
      <div class="name-field">
        <label>Начало практики</label>
        <input
          v-model="practiceStore.practice.Deadlines.start"
          type="date"
          required
          @change="updateEndDateMin"
        />
      </div>
      <div class="name-field">
        <label>Окончание практики</label>
        <input 
          v-model="practiceStore.practice.Deadlines.end"
          type="date" 
          required />
      </div>
    </div>

    <div class="form-field-title">
      <label>Название Университета/Колледжа</label>
      <select 
      v-model="practiceStore.practice.University"
      required>
        <option
          v-for="(university, i) in universityStore.universities"
          :key="i"
          :value="university"
        >
          {{ university.title }}
        </option>
      </select>
    </div>

    <div class="form-field-title">
      <label>Направление (профиль) обучения</label>
      <select 
      v-model="practiceStore.practice.Direction"
      required>
        <option
          v-for="(direction, i) in practiceStore.practice.University.Direction"
          :key="i"
          :value="direction"
        >
          {{ `${direction.code} - ${direction.title}` }}
        </option>
      </select>
    </div>

    <div class="form-field-title">
      <label>Руководитель практики от Университета</label>
      <select 
      v-model="practiceStore.practice.Supervisor"
      required>
        <option
          v-for="(supervisor, i) in supervisorStore.supervisors"
          :key="i"
          :value="supervisor"
        >
          {{ `${supervisor.User.surname} ${supervisor.User.name} ${supervisor.User.patronymic}`  }}
        </option>
      </select>
    </div>

    <div class="form-field-title">
      <label>Почта для связи</label>
      <input v-model="practiceStore.practice.Student.User.email" type="email" required />
    </div>

    <button type="submit" class="btn">{{ sendButtonMessage }}</button>
  </form>
  <FormSentPopup
    :show-modal="showModal"
    :status="resStatus"
    :message="resMessage"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import FormSentPopup from "../components/FormSentPopup.vue";
import { ref } from "vue";
import { useStudentStore } from "@/stores/student-store";
import { useUniversityStore } from "@/stores/university-store";
import { useSupervisorStore } from "@/stores/supervisor-store";
import { usePracticeStore } from "@/stores/practice-store";

const showModal = ref(false);
const resMessage = ref("");
const resStatus = ref<'success' | 'error'>("success");
const sendButtonMessage = ref('Отправить')
const directions = ref<Direction[]>([] as Direction[]);

const practiceStore = usePracticeStore()

const universityStore = useUniversityStore()
const supervisorStore = useSupervisorStore()

universityStore.getUniversities()
supervisorStore.getSupervisors()
practiceStore.clearData()


async function handleSubmit() {
  try {
    sendButtonMessage.value = "Отправляем...";
    const response = await practiceStore.sendInfo();
    
    resStatus.value = "success";
    resMessage.value = "Форма отправлена успешно";
  } catch (err) {
    resStatus.value = "error";
    resMessage.value = `Произошла ошибка при отправке формы`;
  } finally {
    showModal.value = true;
    sendButtonMessage.value = "Отправить"
  }
}

const closeModal = () => {
  showModal.value = false;
  resStatus.value = "success";
  resMessage.value = "";
};

const updateEndDateMin = () => {
  if (practiceStore.practice.Deadlines.end < practiceStore.practice.Deadlines.start) {
    practiceStore.practice.Deadlines.end = practiceStore.practice.Deadlines.start;
  }
};


</script>

<style scoped>
.triple-column {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.dual-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.name-field {
  position: relative;
}

.name-field label {
  margin-bottom: 4px;
}

.name-field input {
  width: 100%;
  padding: 0.8rem;
}

@media (max-width: 600px) {
  .triple-column {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
