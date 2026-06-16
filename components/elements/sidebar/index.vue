<!-- sidebar/index.vue -->
<template>
  <>
    <!-- Mobile Header with Hamburger Button -->
    <div class="mobile-header" :class="{ 'dark': isDarkMode, 'light': !isDarkMode }" v-if="isMobile">
      <button class="mobile-menu-btn" @click="openMobileSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="mobile-logo">
        <span class="logo-text">Api Report Daart</span>
      </div>
      <div class="mobile-placeholder"></div>
    </div>

    <!-- Overlay for click outside -->
    <div 
      class="sidebar__overlay" 
      v-if="isMobileOpen" 
      @click="closeMobileSidebar"
      @touchstart="closeMobileSidebar"
    ></div>

    <!-- Sidebar -->
    <div 
      class="sidebar" 
      :class="{ 
        'sidebar--collapsed': !isOpen, 
        'sidebar--mobile-open': isMobileOpen,
        'dark': isDarkMode, 
        'light': !isDarkMode 
      }"
      ref="sidebarRef"
    >
      
      <!-- Toggle Button (Desktop only) -->
      <button class="sidebar__toggle" @click="toggleSidebar" title="Toggle Sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 19L4 12L11 5" v-if="isOpen"/>
          <path d="M13 5L20 12L13 19" v-else/>
        </svg>
      </button>

      <!-- Logo Area -->
      <div class="sidebar__logo" :class="{ 'sidebar__logo--hidden': !isOpen }">
        <div class="logo-icon">📊</div>
        <transition name="fade">
          <span v-if="isOpen" class="logo-text">Api Report Daart</span>
        </transition>
      </div>

      <!-- Mobile Close Button -->
      <button class="sidebar__mobile-close" @click="closeMobileSidebar" v-if="isMobileOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

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
import { ref, watch, onMounted, onBeforeUnmount, onUpdated, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '~/stores/login';

const isOpen = ref(true);
const isDarkMode = ref(true);
const isMobileOpen = ref(false);
const isMobile = ref(false);
const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();
const sidebarRef = ref(null);

const menuItems = [
  { title: 'Clicks', path: '/dashboard/clicks', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
  { title: 'Mobiles', path: '/dashboard/mobile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>' },
  { title: 'Campaigns', path: '/dashboard/campaign', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
  { title: 'Ads Requests', path: '/dashboard/ads', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
  { title: 'Users', path: '/dashboard/users', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
];

// Check if mobile
const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 768;
    if (!isMobile.value) {
      closeMobileSidebar();
    }
  }
};

// Open mobile sidebar
const openMobileSidebar = () => {
  isMobileOpen.value = true;
  document.body.style.overflow = 'hidden';
};

// Close mobile sidebar
const closeMobileSidebar = () => {
  isMobileOpen.value = false;
  document.body.style.overflow = '';
};

// Toggle sidebar (desktop)
const toggleSidebar = () => {
  if (!isMobile.value) {
    isOpen.value = !isOpen.value;
    localStorage.setItem('sidebarOpen', isOpen.value);
  }
};

// Navigate and close mobile sidebar
const navigate = (path) => {
  router.push(path);
  if (isMobile.value) {
    closeMobileSidebar();
  }
};

// Load sidebar state
const loadSidebarState = () => {
  if (process.client) {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      isOpen.value = savedState === 'true';
    }
  }
};

// SSR-safe theme loading
const loadTheme = () => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark';
    } else {
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

const isActive = (path) => {
  return route.path === path;
};

const logOut = () => {
  adminStore.logout(router);
};

// Handle resize events
const handleResize = () => {
  checkMobile();
  if (!isMobile.value) {
    closeMobileSidebar();
  }
};

// Handle click outside on mobile
const handleClickOutside = (event) => {
  if (isMobile.value && isMobileOpen.value) {
    const sidebar = sidebarRef.value;
    const overlay = document.querySelector('.sidebar__overlay');
    
    // Close if click is outside sidebar and not on hamburger button
    if (sidebar && !sidebar.contains(event.target)) {
      // Check if click is on hamburger button (to prevent closing when clicking the button)
      const hamburgerBtn = document.querySelector('.mobile-menu-btn');
      if (hamburgerBtn && !hamburgerBtn.contains(event.target)) {
        closeMobileSidebar();
      }
    }
  }
};

// Handle escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isMobileOpen.value) {
    closeMobileSidebar();
  }
};

onMounted(() => {
  loadTheme();
  loadSidebarState();
  checkMobile();
  
  if (process.client) {
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
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

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = '';
  }
});
</script>

<style lang="scss" scoped>
// Mobile Header
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 999;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
  
  .mobile-menu-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-primary);
    transition: all 0.2s;
    
    &:hover {
      background: var(--bg-hover);
    }
  }
  
  .mobile-logo {
    .logo-text {
      font-size: 16px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
  
  .mobile-placeholder {
    width: 40px;
  }
}

// Sidebar Overlay
.sidebar__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

// Sidebar
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
    width: 24px;
    height: 24px;
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
    z-index: 10;
    
    &:hover {
      transform: scale(1.1);
      background: var(--accent-primary);
      color: white;
      border-color: var(--accent-primary);
    }
  }
  
  &__mobile-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-primary);
    transition: all 0.2s;
    z-index: 10;
    
    &:hover {
      background: var(--bg-hover);
      transform: rotate(90deg);
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
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    white-space: nowrap;
  }
  
  &__nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
    overflow-y: auto;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 4px;
      
      &:hover {
        background: var(--accent-primary);
      }
    }
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
      
      .nav-item__icon svg {
        stroke: white;
      }
    }
    
    &__icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 20px;
        height: 20px;
      }
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
      white-space: nowrap;
    }
  }
  
  .logout-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
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

// Desktop styles
@media (min-width: 769px) {
  .mobile-header {
    display: none;
  }
  
  .sidebar__mobile-close {
    display: none;
  }
}

// Mobile styles
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
    top: 60px;
    height: calc(100vh - 60px);
    
    &--mobile-open {
      transform: translateX(0);
    }
    
    &__toggle {
      display: none;
    }
    
    &__logo {
      padding: 20px 20px;
      margin-bottom: 20px;
    }
  }
  
  // Adjust main content for mobile header
  :global(.main-content) {
    padding-top: 60px;
  }
}
</style>