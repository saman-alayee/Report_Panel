<!-- topbar/index.vue -->
<template>
  <header class="topbar" :class="{ 'dark': isDarkMode, 'light': !isDarkMode }">
    <div class="topbar__container">
      <!-- Page Title (Dynamic) -->
      <div class="topbar__title">
        <h1>{{ pageTitle }}</h1>
        <p class="breadcrumb">{{ breadcrumb }}</p>
      </div>
      
      <!-- Right Section -->
      <div class="topbar__actions">
        <!-- User Profile -->
        <div class="user-profile" @click="toggleDropdown">
          <div class="user-avatar">
            <span>{{ userInitials }}</span>
          </div>
          <div class="user-info" v-if="!isMobile">
            <div class="user-name">{{ fullName }}</div>
            <div class="user-role">Admin</div>
          </div>
          <svg class="dropdown-arrow" :class="{ rotated: isDropdownOpen }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          
          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <a href="#" @click.prevent="goToProfile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Add New Users
              </a>
              
              <div class="dropdown-divider"></div>
              <a href="#" @click.prevent="logOut">
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { useAdminStore } from '~/stores/login';

const route = useRoute();
const router = useRouter();
const adminStore = useAdminStore();
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const isDarkMode = ref(true);
const isMobile = ref(false);

const fullName = ref(Cookies.get('fullname') || 'Admin User');

const userInitials = computed(() => {
  return fullName.value.split(' ').map(n => n[0]).join('').toUpperCase();
});

const pageTitle = computed(() => {
  const path = route.path.split('/').pop();
  return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
});

const breadcrumb = computed(() => {
  const paths = route.path.split('/').filter(p => p);
  return `Home / ${paths.join(' / ')}`;
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (e) => {
  if (!e.target.closest('.user-profile')) {
    isDropdownOpen.value = false;
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
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
  isDarkMode.value = document.documentElement.classList.contains('dark');
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  window.addEventListener('resize', checkMobile);
  checkMobile();
  checkTheme();
  
  // Watch for theme changes
  const observer = new MutationObserver(checkTheme);
  observer.observe(document.documentElement, { attributes: true });
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  window.removeEventListener('resize', checkMobile);
});
</script>

<style lang="scss" scoped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 260px;
  height: 70px;
  background: var(--topbar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 999;
  transition: all 0.3s;
  
  &__container {
    height: 100%;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__title {
    h1 {
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }
    
    .breadcrumb {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }
  }
  
  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999999;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background: var(--bg-hover);
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  
  .user-info {
    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .user-role {
      font-size: 11px;
      color: var(--text-secondary);
    }
  }
  
  .dropdown-arrow {
    transition: transform 0.2s;
    color: var(--text-secondary);
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--dropdown-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  min-width: 180px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 1000;
  
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s;
    
    &:hover {
      background: var(--bg-hover);
    }
    
    svg {
      width: 16px;
      height: 16px;
      color: var(--text-secondary);
    }
  }
  
  .dropdown-divider {
    height: 1px;
    background: var(--border-color);
    margin: 4px 0;
  }
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.2s;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// Responsive
@media (max-width: 768px) {
  .topbar {
    left: 80px;
    
    &__container {
      padding: 0 16px;
    }
    
    .user-info {
      display: none;
    }
  }
}


</style>