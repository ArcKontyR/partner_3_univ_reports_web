<template>
  <form class="university-form" @submit.prevent="handleSubmit">
    <div class="form-section">
      <div class="form-field-title">
        <label>Название учебного заведения</label>
        <input
          v-model="universityStore.university.title"
          type="text"
          placeholder="Введите название учебного заведения"
          class="name-field"
          required
        />
      </div>

      <div class="form-field-title">
        <label>Адрес</label>
        <input
          v-model="universityStore.university.address"
          type="text"
          placeholder="Введите полный адрес"
          class="name-field"
          required
        />
      </div>

      <div class="form-field-title">
        <label>Контактный телефон</label>
        <InputMask
          v-model="universityStore.university.contact_number"
          mask="+7 (999) 999-99-99"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          required
          unstyled
        />
      </div>
    </div>

    <div class="section">
      <div class="header">
        <h3>Документы</h3>
        <div class="actions">
          <button
            type="button"
            class="btn"
            :disabled="createReportButtonDisabled"
            @click="createReport"
          >
            {{ createReportButtonMessage }}
          </button>
          <button type="button" class="btn" @click="addTemplate">
            Добавить шаблон
          </button>
          <button type="button" class="btn">Редактировать</button>
        </div>
      </div>

      <div class="list">
        <div
          v-for="(report, i) in reportStore.reverse"
          :key="i"
          :value="report"
          class="item"
        >
          <span class="form-field-title">{{
            `Отчёт №${i + 1} от ${new Date(
              report.creation_date!.toString()
            ).toLocaleDateString()} - ${new Date(
              report.creation_date!.toString()
            ).toLocaleTimeString()}`
          }}</span>
          <div class="actions">
            <RouterLink
              type="button"
              :to="{
                path: '/supervisor/university/report',
                query: { id: report.id },
              }"
              class="btn"
              >Просмотр</RouterLink
            >
            <button type="button" class="btn" @click="deleteReport(report.id)">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <RouterLink
        type="button"
        :to="{ path: '/supervisor' }"
        class="btn"
        @click="clearData"
        >Назад</RouterLink
      >
      <button type="submit" class="btn">Добавить</button>
    </div>
  </form>
  <FormSentPopup
    :show-modal="showModal"
    :status="resStatus"
    :message="resMessage"
    @close="closeModal"
  />
  <ReportAdditionPopup
    :show-modal="addTemplateShowModal"
    :university-id="templateUID"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import FormSentPopup from "./Popup.vue";
import { useUniversityStore } from "@/stores/university-store";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useReportStore } from "@/stores/report-store";
import ReportAdditionPopup from "./ReportAdditionPopup.vue";

const route = useRoute();

const universityId = route.query.id?.toString();
const templateUID = ref<string>('')

const universityStore = useUniversityStore();
const reportStore = useReportStore();

const showModal = ref(false);
const resMessage = ref("");
const resStatus = ref<"success" | "error">("success");

const addTemplateShowModal = ref(false);
const createReportButtonMessage = ref("Сформировать отчёт");
const createReportButtonDisabled = ref(false);



const handleSubmit = async () => {
  try {
    const response = await universityStore.sendInfo();

    resStatus.value = "success";
    resMessage.value = "Форма отправлена успешно";
  } catch (err) {
    resStatus.value = "error";
    resMessage.value = `Произошла ошибка при отправке формы`;
  } finally {
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
  resStatus.value = "success";
  resMessage.value = "";
  addTemplateShowModal.value = false
};

const addTemplate = () => {
  templateUID.value = universityStore.university.id;
  addTemplateShowModal.value = true;
};

async function createReport() {
  createReportButtonMessage.value = "Формируем отчёт...";
  createReportButtonDisabled.value = true;
  await reportStore.sendInfo(universityId!);
  await reportStore.getReports(universityId!);
  createReportButtonMessage.value = "Сформировать отчёт";
  createReportButtonDisabled.value = false;
}

async function deleteReport(id: string) {
  await reportStore.deleteReport(id);
  await reportStore.getReports(universityId!);
}

async function clearData() {
  await universityStore.clearData();
  await reportStore.clearData();
}

onMounted(() => {
  if (universityId) {
    universityStore.getUniversity(universityId);
    reportStore.getReports(universityId);
  } else {
  }
});
</script>

<style scoped>
.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
