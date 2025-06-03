<template>
  <div class="field-selector">
    <MultiSelect 
      v-model="selectedFields" 
      :options="groupedFields" 
      option-label="label"
      option-value="key"
      option-group-label="label"
      option-group-children="items"
      placeholder="Выберите поля"
      display="chip"
      :max-selected-labels="2"
      selected-items-label="Выбрано: {0}"
      group
      @change="handleChange"
    >
    </MultiSelect>
  </div>
</template>

<script setup lang="ts">
import { MultiSelect } from 'primevue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    required: true,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const groupedFields = computed(() => fieldDefinitions.value);

const fieldDefinitions = computed(() => [
  {
    label: 'Практика',
    items: [
      { key: 'Practices.type', label: 'Тип практики' },
      { key: 'Practices.Deadlines.start', label: 'Начало практики' },
      { key: 'Practices.Deadlines.end', label: 'Окончание практики' },
    ]
  },
  {
    label: 'Направление',
    items: [
      { key: 'Practices.Direction.code', label: 'Код направления' },
      { key: 'Practices.Direction.title', label: 'Название направления' },
    ]
  },
  {
    label: 'Студент',
    items: [
      { key: 'Practices.Student.course', label: 'Курс' },
      { key: 'Practices.Student.group', label: 'Группа' },
      { key: 'Practices.Student.User.name', label: 'Имя студента' },
      { key: 'Practices.Student.User.surname', label: 'Фамилия студента' },
      { key: 'Practices.Student.User.patronymic', label: 'Отчество студента' },
    ]
  },
  {
    label: 'Руководитель',
    items: [
      { key: 'Practices.Supervisor.job_title', label: 'Должность руководителя' },
      { key: 'Practices.Supervisor.User.name', label: 'Имя руководителя' },
      { key: 'Practices.Supervisor.User.surname', label: 'Фамилия руководителя' },
      { key: 'Practices.Supervisor.User.patronymic', label: 'Отчество руководителя' },
    ]
  }
]);


const selectedFields = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});


function handleChange(event: any) {
  emit('change', event.value); 
}
</script>

<style scoped>
.field-selector {
  padding: 1em;
}
</style>

<style>
.p-multiselect {
  width: 100%;
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
  background: white !important;
  transition: border-color 0.3s;
}

.p-multiselect-label-container {
  padding: 0.8rem !important;
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.5rem !important;
}

.p-multiselect-label {
  padding: 0 !important;
  color: #444 !important;
  font-size: 1rem !important;
}

.p-multiselect-clear-icon {
  color: #8f8585 !important;
  margin-left: auto !important;
  transition: color 0.3s !important;
}

.p-multiselect-clear-icon:hover {
  color: #333 !important;
}

.p-multiselect-chip-item {
  margin: 0 !important;
}

.p-multiselect-chip {
  background: #e9e9e9 !important;
  border-radius: 16px !important;
  padding: 0.3rem 0.8rem !important;
  color: #333 !important;
  border: 1px solid #ddd !important;
}

.p-multiselect-chip-icon {
  margin-left: 0.5rem !important;
  color: #8f8585 !important;
}

.p-multiselect-overlay {
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.p-multiselect-filter-container {
  width: 100% !important;
  padding: 0 !important;
}

.p-multiselect-filter {
  width: 100% !important;
  padding: 0.8rem !important;
  border: 1px solid #ddd !important;
  border-radius: 4px !important;
}

.p-checkbox-checked {
  margin-right: 10px;
}

.p-multiselect-option-group {
  font-weight: 600 !important;
  text-align: center;
  padding: 0.75rem 1rem !important;
  background: #f5f5f5 !important;
}

.p-multiselect-option {
  padding: 0.75rem 1rem !important;
  background: #e8e8e8 !important;
  transition: background 0.3s !important;
}

.p-multiselect-option:hover {
  background: #f0f0f0 !important;
}

.p-multiselect-empty-message {
  padding: 1rem !important;
  color: #777 !important;
  text-align: center !important;
}

.p-multiselect-dropdown-icon,
.p-multiselect-loading-icon {
  color: #8f8585 !important;
}
</style>