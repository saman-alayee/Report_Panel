<template>
  <div class="min-h-screen flex items-center justify-center ">
    <!-- Background Gradient -->


    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <div class="rounded-2xl backdrop-blur-sm border shadow-2xl transition-all duration-300 " :class="[
        isDarkMode 
          ? 'bg-slate-800/80 border-slate-700' 
          : 'bg-white/80 border-gray-200 shadow-lg'
      ]">
        
        <!-- Header -->
        <div class="text-center pt-8 pb-6">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 12V8H4v12h12"/>
              <polyline points="16 12 20 12 20 16"/>
              <line x1="4" y1="20" x2="20" y2="20"/>
              <line x1="4" y1="4" x2="4" y2="20"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p class="text-sm mt-2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
            Sign in to your account to continue
          </p>
        </div>

        <!-- Error Alert -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <div v-if="error" class="mx-6 mb-4">
            <div class="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl relative backdrop-blur-sm" role="alert">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span class="block sm:inline text-sm">{{ error }}</span>
              </div>
              <button @click="clearError" class="absolute top-1/2 -translate-y-1/2 right-3 text-red-500 hover:text-red-400 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </transition>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="p-6 pt-0">
          <!-- text Field -->
          <div class="mb-5">
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Username
            </label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-400'">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                <polyline points="22 6 12 13 2 6"/>
              </svg>
              <input 
                v-model="username" 
                type="text" 
                id="text"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
                :class="[
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
                ]"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Password
            </label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-400'">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input 
                v-model="password" 
                :type="inputType" 
                id="password"
                class="w-full pl-10 pr-12 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
                :class="[
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
                ]"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                :class="isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Show Password Checkbox -->
          <div class="flex items-center mb-6">
            <input 
              id="show-password-checkbox" 
              type="checkbox" 
              v-model="showPassword" 
              @change="togglePassword"
              class="w-4 h-4 rounded border focus:ring-2 focus:ring-purple-500"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-purple-500 focus:ring-purple-500/50' 
                  : 'bg-gray-50 border-gray-300 text-purple-500 focus:ring-purple-500/30'
              ]"
            />
            <label for="show-password-checkbox" class="ms-2 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
              Show Password
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="loading"
            class="relative w-full py-2.5 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            :class="[
              loading 
                ? 'bg-gradient-to-r from-purple-400 to-blue-400 cursor-wait' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30'
            ]"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              Sign in
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '~/stores/login';

const adminStore = useAdminStore();
const router = useRouter();

// Theme detection
const isDarkMode = ref(true);

// Form state
const username = ref('');
const password = ref('');
const inputType = ref('password');
const showPassword = ref(false);
const loading = ref(false);
const error = computed(() => adminStore.error);

// Methods
function togglePassword() {
  inputType.value = showPassword.value ? 'text' : 'password';
}

function clearError() {
  adminStore.clearError();
}

async function handleLogin() {
  if (!username.value || !password.value) {
    adminStore.error = 'Please fill in all fields.';
    return;
  }
  
  loading.value = true;
  await adminStore.login(username.value, password.value, router);
  loading.value = false;
}

// Check theme
const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

onMounted(() => {
  checkTheme();
  
  // Watch for theme changes
  const observer = new MutationObserver(() => {
    checkTheme();
  });
  observer.observe(document.documentElement, { attributes: true });
});
</script>
