<template>
    <div class="university-form">      
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
          <input
            v-model="universityStore.university.contact_number"
            
            mask="'+7 (###) ###-##-##'"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            class="name-field"
            required
          />
        </div>
      </div>
  
      <div class="documents-section">
        <div class="documents-header">
          <h3>Документы</h3>
          <div class="document-actions">
            <!-- FIXME: Добавить действия для работы с отчетами отчета-->
            <button class="btn">Сформировать документ</button>
            <button class="btn">Добавить шаблон</button>
            <button class="btn">Редактировать</button>
          </div>
        </div>
  
        <div class="documents-list">
          <div 
            v-for="(doc, index) in documents" 
            :key="index"
            class="document-item"
          >
            <span class="doc-date">{{ doc.date }}</span>
            <!-- FIXME: Добавить действие на удаление отчета-->
            <button 
              class="btn"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
  
      <div class="form-actions">
        <RouterLink :to="{ path: '../supervisor' }" class="btn">Отмена</RouterLink>
        <button class="btn" @click="save">Добавить</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUniversityStore } from '@/stores/university-store';
import { ref } from 'vue';
  
  interface Document {
    date: string;
    name?: string;
  }
  
  const universityStore = useUniversityStore()
  
  const documents = ref<Document[]>([]);
  
  
  const save = async () => {
    // Логика сохранения
    console.log('Сохранение данных:',
      await universityStore.sendInfo()
    );
  };
  
  const cancel = () => {
    // Возврат к предыдущему компоненту
  };
  </script>
  
  <style scoped>
  
  
  
  .documents-section {
    border-top: 2px solid #eee;
    padding-top: 20px;
  }
  
  .documents-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .document-actions {
    display: flex;
    gap: 10px;
  }
  
  .documents-list {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;
  }
  
  .document-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .document-item:last-child {
    border-bottom: none;
  }
  

 
  
  
  .form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>