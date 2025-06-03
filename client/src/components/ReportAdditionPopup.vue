<template>
  <div v-if="showModal" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="section">
        <div
          class="drop-zone"
          :class="{ 'drag-active': dragActive }"
          @dragover.prevent="dragActive = true"
          @dragenter.prevent="dragActive = true"
          @dragleave="dragActive = false"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <div class="drop-content">
            <p v-if="!selectedFile">
              Перетащите файл сюда или нажмите для выбора
            </p>

            <p v-else>{{ selectedFile.name }}</p>
            <p v-if="errorMessage?.length">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <h3 class="form-title">Настройка отображаемых полей</h3>
        <FieldSelector
          v-model="selectedFields"
          @change="handleFieldSelectorChange"
        />
        <div class="actions">
          <input
            ref="fileInput"
            type="file"
            hidden
            accept=".doc,.docx,.pdf"
            @change="handleFileSelect"
          />
          <button type="button" class="modal-ok-btn" @click="$emit('close')">
            Отменить
          </button>

          <button
            type="button"
            class="modal-ok-btn"
            :disabled="!canUpload"
            @click="sendFile()"
          >
            Добавить шаблон
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "@/main";
import axios from "axios";
import mammoth from "mammoth";
import { computed, ref } from "vue";
import FieldSelector from "./models/FieldSelector.vue";
const props = defineProps({
  showModal: Boolean,
  universityId: {
    type: String,
    default: "",
  },
});

defineEmits(["close"]);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const selectedFields = ref<string[]>([]);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const dragActive = ref(false);

const canUpload = computed(() => {
  return selectedFile.value;
});

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFieldSelectorChange = (selectedKeys: string[]) => {
  console.log("Получены выбранные ключи в родителе:", selectedKeys);
};

const handleDrop = async (event: DragEvent) => {
  dragActive.value = false;
  if (event.dataTransfer?.files?.length) {
    await handleFile(event.dataTransfer.files[0]);
  }
};

async function findString(file: File, str: string): Promise<Boolean> {
  const result = await mammoth.convertToHtml({
    arrayBuffer: await file.arrayBuffer(),
  });
  const html = result.value;
  return html.includes(str);
}

const handleFile = async (file: File) => {
  errorMessage.value = null;
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMessage.value = "Недопустимый формат файла";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = "Файл слишком большой (макс. 5MB)";

    return;
  }

  if (!await findString(file, "#table#")) {
    errorMessage.value = "Файл не содержит тег #table#";

    return;
  }

  selectedFile.value = file;
  isLoading.value = true;
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  await handleFile(input.files[0]);
};

const sendFile = async () => {
  try {
    await uploadFile(selectedFile.value!);
  } catch (error) {
    errorMessage.value = "Ошибка при обработке файла";
  } finally {
    isLoading.value = false;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  }
};

const uploadFile = async (file: File) => {
  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("keys", JSON.stringify(selectedFields.value))

    const response = await api.post(
      `/supervisor/${props.universityId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    successMessage.value = "Файл успешно загружен!";
    console.log("Ответ сервера:", response.data);
  } catch (error) {
    handleUploadError(error);
  } finally {
    isLoading.value = false;
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  }
};

const handleUploadError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    errorMessage.value = error.response?.data?.message || "Ошибка сервера";
  } else {
    errorMessage.value = "Неизвестная ошибка при загрузке файла";
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 95%;
  max-width: 500px;
  animation: modalSlide 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-footer {
  text-align: center;
  margin: 2.5rem 0rem 1rem;
}

.modal-ok-btn {
  padding: 0.5rem 1.5rem;
  background: #d9d9d9;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.drop-zone {
  border: 2px dashed #ced4da;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.drag-active {
  border-color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}

@keyframes modalSlide {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .modal {
    width: 95%;
    padding: 1rem;
  }
}
</style>
