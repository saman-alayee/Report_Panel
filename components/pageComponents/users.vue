<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Users Management
        </h1>
        <p class="text-sm mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
          Manage system users and their credentials
        </p>
      </div>
      
      <!-- Stats Cards -->
      <div class="flex gap-3">
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Total Users</div>
          <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ store.totalCount }}</div>
        </div>
        <button 
          @click="openAddModal"
          class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 transform hover:scale-[1.02] flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add User
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="rounded-2xl overflow-hidden border" :class="[
      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
    ]">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr :class="isDarkMode ? 'bg-slate-900/50 border-b border-slate-700' : 'bg-gray-50 border-b border-gray-200'">
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">#</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Username</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Publisher ID</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">User ID</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading State -->
            <tr v-if="store.isLoading">
              <td colspan="5" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <Spinner />
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Loading users...</span>
                </div>
              </td>
            </tr>

            <!-- Error State -->
            <tr v-else-if="store.error">
              <td colspan="5" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span class="text-red-500">{{ store.error }}</span>
                  <button @click="refreshData" class="mt-2 px-4 py-2 text-sm rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition">
                    Try Again
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-else-if="store.data.length === 0">
              <td colspan="5" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="isDarkMode ? 'text-slate-500' : 'text-gray-400'">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">No users found</span>
                  <button @click="openAddModal" class="mt-2 px-4 py-2 text-sm rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition">
                    Add your first user
                  </button>
                </div>
              </td>
            </tr>

            <!-- Data Rows -->
            <tr 
              v-for="(item, index) in store.data" 
              :key="item._id"
              class="border-b transition-colors duration-150"
              :class="[
                isDarkMode 
                  ? 'border-slate-700 hover:bg-slate-700/50' 
                  : 'border-gray-100 hover:bg-gray-50'
              ]"
            >
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ (store.currentPage - 1) * store.perPage + index + 1 }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                    {{ getInitials(item.username) }}
                  </div>
                  <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ item.username || 'N/A' }}
                  </span>
                </div>
               </td>
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.publisherId || 'N/A' }}
               </td>
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.id || 'N/A' }}
               </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                 
                  <button 
                    @click="confirmDelete(item.id)"
                    class="p-1.5 rounded-lg transition-colors"
                    :class="isDarkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-red-400' : 'hover:bg-gray-100 text-gray-500 hover:text-red-600'"
                    title="Delete User"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl" :class="[
      isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-gray-200 shadow-sm'
    ]">
      <div class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
        Showing {{ (store.currentPage - 1) * store.perPage + 1 }} to {{ Math.min(store.currentPage * store.perPage, store.totalCount) }} of {{ store.totalCount }} users
      </div>
      
      <div class="flex items-center gap-3">
        <button
          @click="previousPage"
          :disabled="store.currentPage === 1"
          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="[
            store.currentPage === 1
              ? (isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400')
              : (isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span>Previous</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">Page</span>
          <input
            type="number"
            v-model.number="inputPage"
            @keyup.enter="goToPage"
            :min="1"
            :max="store.totalPages"
            class="w-16 text-center py-1.5 rounded-lg border transition-all focus:ring-2 focus:outline-none"
            :class="[
              isDarkMode 
                ? 'bg-slate-900 border-slate-600 text-white focus:ring-purple-500/50' 
                : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-purple-500/30'
            ]"
          />
          <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
            of {{ store.totalPages }}
          </span>
        </div>

        <button
          @click="nextPage"
          :disabled="store.currentPage === store.totalPages"
          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="[
            store.currentPage === store.totalPages
              ? (isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400')
              : (isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
          ]"
        >
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeModal">
      <div class="relative w-full max-w-md rounded-2xl border shadow-2xl transition-all duration-300" :class="[
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      ]">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b" :class="isDarkMode ? 'border-slate-700' : 'border-gray-200'">
          <h2 class="text-xl font-semibold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            {{ isEditing ? 'Edit User' : 'Add New User' }}
          </h2>
          <button @click="closeModal" class="transition-colors" :class="isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="submitUser" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Username *
            </label>
            <input 
              v-model="userForm.username"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Publisher ID *
            </label>
            <input 
              v-model="userForm.publisherId"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
              placeholder="Enter publisher ID"
            />
          </div>

          <div v-if="!isEditing">
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Password *
            </label>
            <input 
              v-model="userForm.password"
              type="password"
              required
              class="w-full px-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
              placeholder="Enter password"
            />
          </div>

          <div v-if="isEditing">
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              New Password (optional)
            </label>
            <input 
              v-model="userForm.password"
              type="password"
              class="w-full px-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <!-- Error Message -->
          <div v-if="store.addUserError" class="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-xl text-sm">
            {{ store.addUserError }}
          </div>

          <!-- Modal Footer -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 rounded-xl border transition-all duration-200"
              :class="[
                isDarkMode 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              ]"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="store.isAddingUser || store.isUpdatingUser"
              class="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!store.isAddingUser && !store.isUpdatingUser">{{ isEditing ? 'Update' : 'Create' }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeDeleteModal">
      <div class="relative w-full max-w-md rounded-2xl border shadow-2xl transition-all duration-300" :class="[
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      ]">
        <div class="p-6">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-center mb-2" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Delete User
          </h3>
          <p class="text-center mb-6" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
            Are you sure you want to delete user <span class="font-semibold">{{ userToDelete?.username }}</span>? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button
              @click="closeDeleteModal"
              class="flex-1 px-4 py-2 rounded-xl border transition-all duration-200"
              :class="[
                isDarkMode 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              ]"
            >
              Cancel
            </button>
            <button
              @click="deleteUser"
              :disabled="store.isDeletingUser"
              class="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!store.isDeletingUser">Delete</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUsersStore } from '../../stores/users';
import Spinner from '../elements/loading/index.vue';

const store = useUsersStore();

// Theme detection
const isDarkMode = ref(true);

// Pagination
const inputPage = ref<number | null>(null);

// Modal states
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const editingUserId = ref<string | null>(null);
const userToDelete = ref<any>(null);

// Form data
const userForm = ref({
  username: '',
  password: '',
  publisherId: ''
});

// Methods
const fetchUsers = () => {
  store.fetchUsers(1);
};

const refreshData = () => {
  store.fetchUsers(store.currentPage);
};

const nextPage = () => {
  store.nextPage();
};

const previousPage = () => {
  store.previousPage();
};

const goToPage = () => {
  if (inputPage.value !== null && inputPage.value > 0 && inputPage.value <= store.totalPages) {
    store.fetchUsers(inputPage.value);
    inputPage.value = null;
  }
};

const openAddModal = () => {
  isEditing.value = false;
  editingUserId.value = null;
  userForm.value = {
    username: '',
    password: '',
    publisherId: ''
  };
  store.clearError();
  showModal.value = true;
};

const openEditModal = (user: any) => {
  isEditing.value = true;
  editingUserId.value = user._id;
  userForm.value = {
    username: user.username || '',
    password: '',
    publisherId: user.publisherId || ''
  };
  store.clearError();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editingUserId.value = null;
  userForm.value = {
    username: '',
    password: '',
    publisherId: ''
  };
  store.clearError();
};

const submitUser = async () => {
  if (isEditing.value && editingUserId.value) {
    const result = await store.updateUser(editingUserId.value, userForm.value);
    if (result.success) {
      closeModal();
    }
  } else {
    const result = await store.addUser(userForm.value);
    if (result.success) {
      closeModal();
    }
  }
};

const confirmDelete = (user: any) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
  store.clearError();
};

const deleteUser = async () => {
  if (userToDelete.value) {
    const result = await store.deleteUser(userToDelete.value);
    if (result.success) {
      closeDeleteModal();
    }
  }
};

const getInitials = (name: string) => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

// Theme check
const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

onMounted(() => {
  fetchUsers();
  checkTheme();
  
  const observer = new MutationObserver(() => {
    checkTheme();
  });
  observer.observe(document.documentElement, { attributes: true });
});

onBeforeUnmount(() => {
  store.resetData();
});
</script>