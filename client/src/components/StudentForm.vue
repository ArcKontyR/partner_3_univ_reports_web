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
      <!-- FIXME: Требует v-model для practice.type -->
      <input 
       
        type="text" required />
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
        <!-- FIXME: Требует v-model для deadlines.start -->
        <input
          
          type="date"
          required
          @change="updateEndDateMin"
        />
      </div>
      <div class="name-field">
        <label>Окончание практики</label>
        <!-- FIXME: Требует v-model для deadlines.end -->
        <input 
          
          type="date" 
          required />
      </div>
    </div>

    <div class="form-field-title">
      <label>Название Университета/Колледжа</label>
      <select required>
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
      <input type="text" required />
    </div>

    <div class="form-field-title">
      <label>Руководитель практики от Университета</label>
      <select required>
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
      <input v-model="studentStore.student.User.email" type="email" required />
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

const showModal = ref(false);
const resMessage = ref("");
const resStatus = ref<'success' | 'error'>("success");
const sendButtonMessage = ref('Отправить')

const studentStore = useStudentStore()
const universityStore = useUniversityStore()
const supervisorStore = useSupervisorStore()

universityStore.getUniversities()
supervisorStore.getSupervisors()



async function handleSubmit() {

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
  // FIXME: Требует изменения после добавления v-model к соответствующим полям
  // if (formData.value.practiceEndDate < formData.value.practiceStartDate) {
  //   formData.value.practiceEndDate = formData.value.practiceStartDate;
  // }
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
