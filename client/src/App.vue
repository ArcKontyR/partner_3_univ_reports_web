<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";

const baseURL = __API_PATH__;
const isLoading = ref(false);
const message = ref("");

async function fetchAPI() {
  try {
    // Set loading state to true
    isLoading.value = true;

    // Send a GET request to the server
    const response = await fetch(baseURL);

    // Parse the JSON response
    const data = await response.json();

    // Update the message with the response data
    message.value = data.message;
  } catch (error) {
    // Handle errors
    message.value = "Error fetching data";
    console.error(error);
  } finally {
    // Reset loading state
    isLoading.value = false;
  }
}
</script>

<template>
  <!-- Button to trigger the fetchAPI function -->
  <button @click="fetchAPI">Fetch</button>

  <!-- Display loading message while fetching data -->
  <p v-if="isLoading">Loading...</p>

  <!-- Display the response message if available -->
  <p v-else-if="message">{{ message }}</p>
</template>


<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/supervisor">About</RouterLink>
        <RouterLink to="/student">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template> -->

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
