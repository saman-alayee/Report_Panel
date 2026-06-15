<!-- sidebar/index.vue -->
<template>
  <div class="sidebar" :class="{ 'sidebar--collapsed': !isOpen, dark: isDarkMode, light: !isDarkMode }">
    <!-- Logo Area -->
    <div class="sidebar__logo" :class="{ 'sidebar__logo--hidden': !isOpen }">
      <div class="logo-icon"></div>
      <transition name="fade">
        <span v-if="isOpen" class="logo-text">Api Report Daart</span>
      </transition>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar__nav">
      <div 
        v-for="item in menuItems" 
        :key="item.path"
        class="nav-item"
        :class="{ 'nav-item--active': isActive(item.path) }"
        @click="navigate(item.path)"
      >
        <div class="nav-item__icon" v-html="item.icon"></div>
        <transition name="slide">
          <span v-if="isOpen" class="nav-item__title">{{ item.title }}</span>
        </transition>
        <div v-if="isActive(item.path)" class="nav-item__active-indicator"></div>
      </div>
    </nav>

    <!-- Bottom Section -->
    <div class="sidebar__footer">
      <!-- Theme Toggle -->
      <button class="theme-toggle" @click="toggleTheme">
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
        <span v-if="isOpen" class="theme-toggle__text">{{ isDarkMode ? 'Light' : 'Dark' }} Mode</span>
      </button>

      <!-- Logout Button -->
      <button class="logout-btn" @click="logOut">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <transition name="slide">
          <span v-if="isOpen" class="logout-btn__text">Logout</span>
        </transition>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '~/stores/login';

const isOpen = ref(true);
const isDarkMode = ref(true);
const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();

const menuItems = [
  { title: 'Clicks', path: '/dashboard/clicks', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
  { title: 'Mobiles', path: '/dashboard/mobile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>' },
  { title: 'Ads', path: '/dashboard/ads', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>' },
  { title: 'Campaigns', path: '/dashboard/campaign', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
  { title: 'Users', path: '/dashboard/users', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
];

// SSR-safe theme loading
const loadTheme = () => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark';
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkMode.value = prefersDark;
    }
    applyTheme();
  }
};

const applyTheme = () => {
  if (process.client) {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  }
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  applyTheme();
};

const navigate = (path) => {
  router.push(path);
};

const isActive = (path) => {
  return route.path === path;
};

const logOut = () => {
  adminStore.logout(router);
};

// Handle client-side only operations
onMounted(() => {
  loadTheme();
  
  // Watch for system theme changes
  if (process.client) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode.value = e.matches;
        applyTheme();
      }
    };
    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 260px;
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  
  &--collapsed {
    width: 80px;
  }
  
  &__toggle {
    position: absolute;
    right: -12px;
    top: 24px;
    width: 28px;
    height: 28px;
    padding: 4px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-primary);
    transition: all 0.2s;
    box-shadow: var(--shadow-sm);
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 32px 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border-color);
    
    &--hidden {
      justify-content: center;
      padding: 32px 0;
    }
  }
  
  .logo-icon {
    font-size: 32px;
  }
  
  .logo-text {
    font-size: 20px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  &__nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 0.2s;
    position: relative;
    
    &:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
      transform: translateX(4px);
    }
    
    &--active {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      box-shadow: 0 4px 12px var(--accent-glow);
      
      &:hover {
        transform: translateX(0);
      }
    }
    
    &__icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    &__title {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
    
    &__active-indicator {
      position: absolute;
      right: 0;
      width: 3px;
      height: 20px;
      background: white;
      border-radius: 3px;
    }
  }
  
  &__footer {
    padding: 20px 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .theme-toggle, .logout-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--text-secondary);
    transition: all 0.2s;
    width: 100%;
    
    &:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
    
    &__text {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

// Animations
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.2s;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

// Dark/Light Theme Variables
:root.dark {
  --bg-primary: rgba(15, 23, 42, 0.95);
  --bg-secondary: #1e293b;
  --bg-hover: rgba(51, 65, 85, 0.6);
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: rgba(51, 65, 85, 0.5);
  --accent-primary: #8b5cf6;
  --accent-secondary: #3b82f6;
  --accent-glow: rgba(139, 92, 246, 0.3);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-lg: 0 25px 50px -12px rgb(0 0 0 / 0.5);
}

:root.light {
  --bg-primary: rgba(255, 255, 255, 0.98);
  --bg-secondary: #f8fafc;
  --bg-hover: rgba(241, 245, 249, 0.8);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: rgba(203, 213, 225, 0.5);
  --accent-primary: #8b5cf6;
  --accent-secondary: #3b82f6;
  --accent-glow: rgba(139, 92, 246, 0.2);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-lg: 0 25px 50px -12px rgb(0 0 0 / 0.15);
}
</style>