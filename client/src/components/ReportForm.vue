<template>
  <div class="pdf-viewer">
    <div ref="pdfContainer" class="pdf-container"></div>
    <div v-if="!isPDFSupported" class="unsupported-message">
      Ваш браузер не поддерживает встроенный просмотр PDF.
    </div>
  </div>
  <Popup
    :show-modal="showModal"
    :status="resStatus"
    :message="resMessage"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
import Popup from "./Popup.vue";
import { ref, onMounted } from 'vue'
import PDFObject from 'pdfobject'
import api from '@/main';
import { useReportStore } from '@/stores/report-store'
import { useRoute } from "vue-router";

const pdfContainer = ref(null)
const isPDFSupported = ref(true)

const showModal = ref(false);
const resMessage = ref("");
const resStatus = ref<"success" | "error">("success");

const url = ref<string | undefined>(undefined)

const route = useRoute();

const reportId = route.query.id!.toString();
const reportStore = useReportStore();

reportStore.getReport(reportId)

onMounted(()=>{
  url.value = `${api.defaults.baseURL!.toString()}/supervisor/report/files${reportStore.report.University?.sample_path}/${reportId}`

  handleInitialize()
})

async function handleInitialize() {
  try {
    initializePDF()
    resStatus.value = "success";
  } catch (err) {
    resStatus.value = "error";
    resMessage.value = `${(err as Error).message}`;
    showModal.value = true;
  }
}

const closeModal = () => {
  showModal.value = false;
  resStatus.value = "success";
  resMessage.value = "";
};

const initializePDF = () => {
  if (!PDFObject.supportsPDFs) {
    isPDFSupported.value = false
    throw new Error('Браузер не поддерживает просмотр PDF-документов')
  }

  const options: PDFObject.Options = {
    pdfOpenParams: {
      view: 'FitW',
      pagemode: 'thumbs', 
      search: 'lorem',
      toolbar: 1, 
      navpanes: 1,
    } 
  } 
  console.log(url.value)
  const pdfInstance = PDFObject.embed(url.value!, pdfContainer.value, options)

    if (!pdfInstance) {
      throw new Error('Не удалось загрузить PDF-документ')
    }
}

</script>

<style scoped>
.pdf-viewer {
  width: 90%;
  height: 90vh;
  border: 1px solid #ccc;
  margin: 20px;
}

.pdf-container {
    display: flex;
  width: 100%;
  height: 100%;
  
  justify-content: center;
}

.unsupported-message {
  padding: 20px;
  background: #ffeeba;
  border: 1px solid #ffc107;
  border-radius: 4px;
  margin: 20px;
  text-align: center;
}

.unsupported-message a {
  color: #007bff;
  text-decoration: underline;
}
</style>