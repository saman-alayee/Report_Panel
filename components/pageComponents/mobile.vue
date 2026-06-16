<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Mobile Clicks Analytics
        </h1>
        <p class="text-sm mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
          Track mobile click traffic and conversions
        </p>
      </div>
      
      <!-- Stats Cards -->
      <div class="flex gap-3">
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Total Mobile Clicks</div>
          <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ store.totalCount }}</div>
        </div>
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Conversion Rate</div>
          <div class="text-2xl font-bold text-green-500">{{ conversionRate }}%</div>
        </div>
      </div>
    </div>

    <!-- Filter Section - Only Date Filter -->
    <div class="rounded-2xl p-6 backdrop-blur-sm border" :class="[
      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
    ]">
      <div class="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-purple-500">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        <h3 class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">Date Filter</h3>
        <button 
          v-if="hasActiveFilters" 
          @click="clearDateFilter"
          class="ml-auto text-xs text-purple-500 hover:text-purple-400"
        >
          Clear filter
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Start Date Filter -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
            Start Date
          </label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-400'">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input 
              type="date" 
              v-model="start"
              @change="applyDateFilter"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
            />
          </div>
        </div>

        <!-- End Date Filter -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
            End Date
          </label>
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-400'">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input 
              type="date" 
              v-model="end"
              @change="applyDateFilter"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all focus:ring-2 focus:outline-none"
              :class="[
                isDarkMode 
                  ? 'bg-slate-900 border-slate-600 text-white focus:ring-purple-500/50 focus:border-purple-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-purple-500/30 focus:border-purple-500'
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Active Filters Display -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4 pt-4 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-gray-200'">
        <span class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Active filters:</span>
        <span v-if="start" class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'">
          From: {{ formatDateShort(start) }}
          <button @click="clearStart" class="hover:text-red-500">&times;</button>
        </span>
        <span v-if="end" class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'">
          To: {{ formatDateShort(end) }}
          <button @click="clearEnd" class="hover:text-red-500">&times;</button>
        </span>
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
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Publisher ID</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Campaign ID</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Requested</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Status</th>
              <th class="px-6 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">IP Address</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading State -->
            <tr v-if="store.isLoading">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <Spinner />
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Loading mobile clicks data...</span>
                </div>
              </td>
            </tr>

            <!-- Error State -->
            <tr v-else-if="store.error">
              <td colspan="6" class="px-6 py-12 text-center">
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
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="isDarkMode ? 'text-slate-500' : 'text-gray-400'">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">No mobile click data found</span>
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
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.publisher_ID || 'N/A' }}
              </td>
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.campaign_ID || 'N/A' }}
              </td>
              <td class="px-6 py-4 text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ formatDate(item.requested) }}
              </td>
              <td class="px-6 py-4">
                <span 
                  v-if="item.counted === true"
                  class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full"
                  :class="isDarkMode ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Counted
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full"
                  :class="isDarkMode ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Not Counted
                </span>
              </td>
              <td class="px-6 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.ip || 'N/A' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-3 p-3 md:p-4 rounded-2xl" :class="[
      isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-gray-200 shadow-sm'
    ]">
      <!-- Info -->
      <div class="text-xs md:text-sm text-center md:text-left" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
        Showing {{ (store.currentPage - 1) * store.perPage + 1 }} - {{ Math.min(store.currentPage * store.perPage, store.totalCount) }} of {{ store.totalCount }}
      </div>
      
      <!-- Controls -->
      <div class="flex items-center gap-2">
        <button
          @click="previousPage"
          :disabled="store.currentPage === 1"
          class="p-2 rounded-xl transition disabled:opacity-50"
          :class="[
            store.currentPage === 1
              ? (isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400')
              : (isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <span class="text-xs md:text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
          {{ store.currentPage }} / {{ store.totalPages }}
        </span>

        <button
          @click="nextPage"
          :disabled="store.currentPage === store.totalPages"
          class="p-2 rounded-xl transition disabled:opacity-50"
          :class="[
            store.currentPage === store.totalPages
              ? (isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400')
              : (isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useClicksMobileStore } from '../../stores/clicksMobile';
import Spinner from '../elements/loading/index.vue';

const store = useClicksMobileStore();

// Theme detection
const isDarkMode = ref(true);

// Date filter states
const start = ref<string | null>(null);
const end = ref<string | null>(null);
const inputPage = ref<number | null>(null);

// Computed
const hasActiveFilters = computed(() => {
  return start.value !== null || end.value !== null;
});

const conversionRate = computed(() => {
  if (store.totalCount === 0) return 0;
  const counted = store.data.filter((item: any) => item.counted === true).length;
  return ((counted / store.totalCount) * 100).toFixed(1);
});

// Methods
const applyDateFilter = () => {
  store.setDateRange(start.value, end.value);
};

const clearStart = () => {
  start.value = null;
  applyDateFilter();
};

const clearEnd = () => {
  end.value = null;
  applyDateFilter();
};

const clearDateFilter = () => {
  start.value = null;
  end.value = null;
  store.clearDateFilter();
};

const nextPage = () => {
  store.nextPage();
};

const previousPage = () => {
  store.previousPage();
};

const goToPage = () => {
  if (inputPage.value !== null && inputPage.value > 0 && inputPage.value <= store.totalPages) {
    store.fetchData(inputPage.value);
    inputPage.value = null;
  }
};

const refreshData = () => {
  store.fetchData(store.currentPage);
};

const formatDate = (date: string) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString();
};

const formatDateShort = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};

// Theme check
const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

onMounted(() => {
  store.fetchData(1);
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