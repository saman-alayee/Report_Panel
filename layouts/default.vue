<!-- layouts/default.vue -->
<template>
  <div class="app" :class="{ 'dark': isDarkMode, 'light': !isDarkMode }">
    <Sidebar />
    <div class="app__main" :class="{ 'expanded': isSidebarCollapsed }">
      <Topbar />
      <main class="app__content">
        <div class="content-wrapper">
          <Transition name="fade-slide" mode="out-in">
            <slot />
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Sidebar from '~/components/elements/sidebar/index.vue';
import Topbar from '~/components/elements/topbar/index.vue';

const isDarkMode = ref(true);
const isSidebarCollapsed = ref(false);

// Listen for sidebar state changes
const checkSidebarState = () => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    isSidebarCollapsed.value = sidebar.classList.contains('sidebar--collapsed');
  }
};

// Observe sidebar changes
const setupObserver = () => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const observer = new MutationObserver(checkSidebarState);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    return observer;
  }
  return null;
};

// Check theme
const checkTheme = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
};

let observer = null;

onMounted(() => {
  checkTheme();
  observer = setupObserver();
  checkSidebarState();
  
  // Watch for theme changes
  const themeObserver = new MutationObserver(checkTheme);
  themeObserver.observe(document.documentElement, { attributes: true });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: var(--app-bg);
  transition: background 0.3s;
  
  &__main {
    margin-left: 260px;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.expanded {
      margin-left: 80px;
    }
  }
  
  &__content {
    padding: 90px 32px 32px 32px;
    min-height: 100vh;
  }
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
}

// Animations
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



// Global Theme Variables
:root.dark {
  --app-bg: #0f172a;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: rgba(51, 65, 85, 0.5);
  --accent-primary: #8b5cf6;
  --accent-secondary: #3b82f6;
  --accent-glow: rgba(139, 92, 246, 0.2);
  --card-bg: rgba(30, 41, 59, 0.7);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 25px 50px -12px rgb(0 0 0 / 0.5);
}

:root.light {
  --app-bg: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: rgba(203, 213, 225, 0.5);
  --accent-primary: #8b5cf6;
  --accent-secondary: #3b82f6;
  --accent-glow: rgba(139, 92, 246, 0.1);
  --card-bg: rgba(255, 255, 255, 0.7);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 25px 50px -12px rgb(0 0 0 / 0.15);
}

// Responsive
@media (max-width: 768px) {
  .app {
    &__main {
      margin-left: 80px;
    }
    
    &__content {
      padding: 80px 16px 16px 16px;
    }
  }
}
</style>