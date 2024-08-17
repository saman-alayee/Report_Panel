<template>
    <div class="flex justify-center">
      <div class="pt-6 lg:w-2/6 lg:mt-44 md:mt-8 w-full pb-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-sm mx-auto mb-8 pt-2 text-2xl">
          <h1>Sign in to your account</h1>
        </div>
    
        <!-- Error Alert -->
        <div v-if="error" class="mb-4 max-w-sm mx-auto">
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error }}</span>
            <span @click="clearError" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 0 0-1.414-1.414L10 7.586 7.066 4.652a1 1 0 1 0-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 12.414l2.934 2.934a1 1 0 0 0 1.414-1.414L11.414 10l2.934-2.934z"/>
              </svg>
            </span>
          </div>
        </div>
    
        <form @submit.prevent="handleLogin" class="max-w-sm mx-auto">
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input v-model="email" type="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com" required />
          </div>
          <div class="mb-5 relative">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input v-model="password" :type="inputType" id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required />
           
          </div>
          <div class="flex items-center mb-4">
            <input id="show-password-checkbox" type="checkbox" v-model="showPassword" @change="togglePassword"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="show-password-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mb-8 mt-2 px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span v-if="!loading">Sign in</span>
            <span v-else>
              <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAdminStore } from '~/stores/login'; 
    
  const adminStore = useAdminStore();
  const router = useRouter();  // Get the router instance
    
  const email = ref('');
  const password = ref('');
  const inputType = ref('password');
  const showPassword = ref(false);
  const loading = ref(false); // New state for loading
  const error = computed(() => adminStore.error); // Bind to store error state
    
  function togglePassword() {
    inputType.value = showPassword.value ? 'text' : 'password';
  }
    
    
  // Clear the error message
  function clearError() {
    adminStore.error = null;
  }
    
  async function handleLogin() {
    if (!email.value || !password.value) {
      adminStore.error = 'Please fill in all fields.';
      return;
    }
      
    loading.value = true; // Start loading spinner
    await adminStore.login(email.value, password.value, router); // Pass the router instance here
    loading.value = false; // Stop loading spinner
      
    // The redirect will happen automatically if login is successful
  }
  </script>
  