<template>
  <form class="practice-form" @submit.prevent="handleSubmit">
    <div class="form-field-title triple-column">
      <div class="name-field">
        <label>Фамилия</label>
        <input
          v-model="studentStore.student.User.surname"
          type="text"
          placeholder="Иванов"
          required
        />
      </div>
      <div class="name-field">
        <label>Имя</label>
        <input
          v-model="studentStore.student.User.name"
          type="text"
          placeholder="Иван"
          required
        />
      </div>
      <div class="name-field">
        <label>Отчество</label>
        <input
          v-model="studentStore.student.User.patronymic"
          type="text"
          placeholder="Иванович"
        />
      </div>
    </div>

    <div class="form-field-title">
      <label>Вид практики</label>
      <input v-model="formData.practiceType" type="text" required />
    </div>

    <div class="form-field-title dual-column">
      <div class="name-field">
        <label>Курс</label>
        <input
          v-model="studentStore.student.course"
          type="number"
          placeholder="1"
          :max="6"
          required
        />
      </div>
      <div class="name-field">
        <label>Группа</label>
        <input
          v-model="studentStore.student.group"
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
          v-model="formData.practiceStartDate"
          type="date"
          required
          @change="updateEndDateMin"
        />
      </div>
      <div class="name-field">
        <label>Окончание практики</label>
        <input v-model="formData.practiceEndDate" type="date" required />
      </div>
    </div>

    <div class="form-field-title">
      <label>Название Университета/Колледжа</label>
      <select v-model="formData.institution" required>
        <option
          v-for="institution in institutions"
          :key="institution"
          :value="institution"
        >
          {{ institution }}
        </option>
      </select>
    </div>

    <div class="form-field-title">
      <label>Направление (профиль) обучения</label>
      <input v-model="formData.studyDirection" type="text" required />
    </div>

    <div class="form-field-title">
      <label>Руководитель практики от Университета</label>
      <input v-model="formData.supervisor" type="text" required />
    </div>

    <div class="form-field-title">
      <label>Почта для связи</label>
      <input v-model="studentStore.student.User.email" type="email" required />
    </div>

    <button type="submit" class="submit-btn">{{ sendButtonMessage }}</button>
  </form>
  <FormSentPopup
    :show-modal="showModal"
    :status="resStatus"
    :message="resMessage"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import type { PracticeForm } from "@/interfaces";
import FormSentPopup from "../components/FormSentPopup.vue";
import { ref } from "vue";
import { useStudentStore } from "@/stores.ts/student-store";

const showModal = ref(false);
const resMessage = ref("");
const resStatus = ref<'success' | 'error'>("success");
const sendButtonMessage = ref('Отправить')

const studentStore = useStudentStore()

const formData = ref<PracticeForm>({
  Student: {
    course: 1,
    group: "",
    User: {
      name: "",
      surname: "",
      patronymic: "",
      email: "",
    },
  },
  practiceType: "",
  practiceStartDate: "",
  practiceEndDate: "",
  studyDirection: "",
  supervisor: "",
  institution: "",
});

const institutions = ref([
  "Уральский Федеральный Университет",
  "Московский Государственный Университет",
  "Санкт-Петербургский Политехнический Университет",
  "Казанский Федеральный Университет",
]);

async function handleSubmit() {
  console.log("Form data:", formData.value);

  try {
    sendButtonMessage.value = "Отправляем...";
    const response = await studentStore.sendInfo();
    
    resStatus.value = "success";
    resMessage.value = "Форма отправлена успешно";
  } catch (err) {
    resStatus.value = "error";
    resMessage.value = `Произошла ошибка при отправке формы`;
  } finally {
    showModal.value = true;
    sendButtonMessage.value = "Отправить"
  }
  console.log(resMessage.value);
  console.log(resStatus.value);
}

const closeModal = () => {
  showModal.value = false;
  resStatus.value = "success";
  resMessage.value = "";
};

const updateEndDateMin = () => {
  if (formData.value.practiceEndDate < formData.value.practiceStartDate) {
    formData.value.practiceEndDate = formData.value.practiceStartDate;
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
