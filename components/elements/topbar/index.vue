<!-- topbar/index.vue -->
<template>
  <header 
    class="fixed top-0 right-0 h-[70px] backdrop-blur-lg border-b z-[999] transition-all duration-300"
    :class="[
      isMobile ? 'left-0' : (isSidebarCollapsed ? 'left-20' : 'left-64'),
      isDarkMode 
        ? 'bg-slate-900/95 border-slate-700 text-slate-100' 
        : 'bg-white/95 border-gray-200 text-slate-900'
    ]"
  >
    <div class="h-full px-4 md:px-8 flex justify-between items-center">
      <!-- Page Title -->
      <div>
        <h1 class="text-xl font-semibold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
          {{ pageTitle }}
        </h1>
        <p class="text-xs mt-0.5" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
          {{ breadcrumb }}
        </p>
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center gap-4 md:gap-5">
        <!-- User Profile -->
        <div 
          class="relative flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 z-[9999999]"
          :class="isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'"
          @click="toggleDropdown"
        >
          <!-- Avatar -->
          <div class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {{ userInitials }}
          </div>
          
          <!-- User Info -->
          <div class="hidden sm:block">
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              {{ name }}
            </div>
            <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
              Admin
            </div>
          </div>
          
          <!-- Dropdown Arrow -->
          <svg 
            class="transition-transform duration-200 w-4 h-4" 
            :class="[
              isDropdownOpen ? 'rotate-180' : '',
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            ]"
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          
          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div 
              v-if="isDropdownOpen" 
              class="absolute right-0 top-full mt-2 min-w-[180px] rounded-xl border shadow-lg overflow-hidden z-[1000]"
              :class="[
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-gray-200'
              ]"
            >
              <a 
                href="#" 
                @click.prevent="goToProfile"
                class="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200"
                :class="isDarkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-gray-50 text-gray-700'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Add New Users
              </a>
              
              <div class="h-px" :class="isDarkMode ? 'bg-slate-700' : 'bg-gray-200'"></div>
              
              <a 
                href="#" 
                @click.prevent="logOut"
                class="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200"
                :class="[
                  isDarkMode ? 'hover:bg-slate-700 text-red-400' : 'hover:bg-red-50 text-red-600'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { useAdminStore } from '~/stores/login';

const route = useRoute();
const router = useRouter();
const adminStore = useAdminStore();

// State
const isDropdownOpen = ref(false);
const isDarkMode = ref(true);
const isMobile = ref(false);
const isSidebarCollapsed = ref(false);
const name = ref(Cookies.get('name') || Cookies.get('name') || 'Admin User');

// Computed
const userInitials = computed(() => {
  return name.value.split(' ').map(n => n[0]).join('').toUpperCase();
});

const pageTitle = computed(() => {
  const path = route.path.split('/').pop();
  return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
});

const breadcrumb = computed(() => {
  const paths = route.path.split('/').filter(p => p);
  return `Home / ${paths.join(' / ')}`;
});

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (e) => {
  if (!e.target.closest('.relative')) {
    isDropdownOpen.value = false;
  }
};

const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 768;
  }
};

const checkSidebarState = () => {
  if (process.client) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      isSidebarCollapsed.value = sidebar.classList.contains('sidebar--collapsed');
    }
  }
};

const goToProfile = () => {
  router.push('/dashboard/users');
  isDropdownOpen.value = false;
};

const logOut = () => {
  adminStore.logout(router);
};

// Listen for theme changes
const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

// Watch for sidebar changes
const setupSidebarObserver = () => {
  if (process.client) {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
      return observer;
    }
  }
  return null;
};

let sidebarObserver = null;

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  window.addEventListener('resize', () => {
    checkMobile();
    checkSidebarState();
  });
  
  checkMobile();
  checkTheme();
  checkSidebarState();
  
  // Watch for theme changes
  const themeObserver = new MutationObserver(checkTheme);
  themeObserver.observe(document.documentElement, { attributes: true });
  
  // Watch for sidebar changes
  sidebarObserver = setupSidebarObserver();
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  window.removeEventListener('resize', checkMobile);
  if (sidebarObserver) sidebarObserver.disconnect();
});
</script>

<style scoped>
/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>