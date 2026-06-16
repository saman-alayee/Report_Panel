<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-gray-50'">
    <Sidebar />
    
    <!-- Main Content -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="{
        'ml-64': !isSidebarCollapsed && !isMobile,
        'ml-20': isSidebarCollapsed && !isMobile,
        'ml-0': isMobile
      }"
    >
      <!-- Desktop Topbar -->
      <Topbar v-if="!isMobile" />
      
      <!-- Mobile Header -->
      <div v-if="isMobile" class="mobile-header fixed top-0 left-0 right-0 h-[60px] flex items-center justify-between px-4 z-[999] backdrop-blur-lg border-b" :class="[
        isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'
      ]">
        <button 
          @click="toggleMobileSidebar"
          class="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105" 
          :class="[
            isDarkMode ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        
        <div class="mobile-logo">
          <span class="text-base font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Api Report Daart
          </span>
        </div>
        
        <button 
          @click="toggleTheme"
          class="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105" 
          :class="[
            isDarkMode ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
          ]"
        >
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
      
      <!-- Main Content Area -->
      <main 
        class="min-h-screen transition-all duration-300"
        :class="{
          'pt-[90px] px-8 pb-8': !isMobile,
          'pt-[76px] px-4 pb-4': isMobile,
          'pt-[72px] px-3 pb-3': isSmallMobile,
          'pt-[68px] px-2 pb-2': isExtraSmallMobile
        }"
      >
        <div class="max-w-[1600px] mx-auto">
          <Transition name="fade-slide" mode="out-in">
            <slot />
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Sidebar from '~/components/elements/sidebar/index.vue';
import Topbar from '~/components/elements/topbar/index.vue';

const isDarkMode = ref(true);
const isSidebarCollapsed = ref(false);
const isMobile = ref(false);
const isSmallMobile = ref(false);
const isExtraSmallMobile = ref(false);

// Check mobile breakpoints
const checkBreakpoints = () => {
  if (process.client) {
    const width = window.innerWidth;
    isMobile.value = width < 768;
    isSmallMobile.value = width < 480;
    isExtraSmallMobile.value = width < 360;
    
    // If mobile, ensure sidebar is not in desktop mode
    if (isMobile.value) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.remove('sidebar--collapsed');
      }
    }
  }
};

// Listen for sidebar state changes
const checkSidebarState = () => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    isSidebarCollapsed.value = sidebar.classList.contains('sidebar--collapsed');
  }
};

// Toggle mobile sidebar
const toggleMobileSidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('sidebar--mobile-open');
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = sidebar.classList.contains('sidebar--mobile-open') ? 'hidden' : '';
  }
};

// Check theme
const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

const toggleTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }
  localStorage.setItem('theme', isDarkMode.value ? 'light' : 'dark');
  isDarkMode.value = !isDarkMode.value;
};

let observer = null;
let resizeTimeout = null;

onMounted(() => {
  checkTheme();
  checkSidebarState();
  checkBreakpoints();
  
  // Observe sidebar changes
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    observer = new MutationObserver(checkSidebarState);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
  }
  
  // Watch for theme changes
  const themeObserver = new MutationObserver(checkTheme);
  themeObserver.observe(document.documentElement, { attributes: true });
  
  // Watch for resize events with debounce
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      checkBreakpoints();
    }, 250);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener('resize', checkBreakpoints);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Animations - kept as CSS since Tailwind doesn't have built-in transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color, #94a3b8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-hover-color, #64748b);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Light mode scrollbar */
.light ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}

.light ::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>