<template>
  <div  v-if="showModal" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ message }}</h3>
      </div>
      <div class="modal-footer">
        <button class="modal-ok-btn" @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

defineProps({
  showModal: Boolean,
  status: {
    type: String as () => 'success' | 'error' ,
    default: 'success'
  },
  message: {
    type: String,
    default: ''
  }
});

defineEmits(['close']);

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
  background: #D9D9D9;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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