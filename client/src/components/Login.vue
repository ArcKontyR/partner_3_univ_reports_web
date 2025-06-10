<template>
  <form @submit.prevent="handleLogin">
    <div class="form-section">
      <div class="form-field-title">
        <label>Логин</label>
        <input
          class="name-field"
          v-model="login"
          type="login"
          placeholder="Введите логин"
          required
        />
      </div>
      <div class="form-field-title">
        <label>Пароль</label>
        <input
          class="name-field"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          required
        />
      </div>

      <button class="btn" type="submit" :disabled="submitDisabled">{{ msg }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSupervisorStore } from "@/stores/supervisor-store";

const login = ref("");
const password = ref("");
const submitDisabled = ref(false)
const supervisorStore = useSupervisorStore();
const router = useRouter();
const msg = ref("Авторизоваться")

const handleLogin = async () => {
  try {
    msg.value = "Авторизуемся..."
    submitDisabled.value = true
    await supervisorStore.login(login.value, password.value);
    router.push("/supervisor");
  } catch (error) {
    alert("Login failed");
  } finally{
    msg.value = "Авторизоваться"
    submitDisabled.value = false
  }
};
</script>
