<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Campaigns
        </h1>
        <p class="text-sm mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
          Manage and monitor your advertising campaigns
        </p>
      </div>
      
      <!-- Stats Cards -->
      <div class="flex gap-3">
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Total Campaigns</div>
          <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ store.totalCount || store.data.length }}</div>
        </div>
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Active</div>
          <div class="text-2xl font-bold text-green-500">{{ activeCampaigns }}</div>
        </div>
        <div class="px-4 py-2 rounded-xl" :class="isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'">
          <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Mobile Ready</div>
          <div class="text-2xl font-bold text-purple-500">{{ mobileCampaigns }}</div>
        </div>
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
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">#</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Campaign Name</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Size</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Campaign ID</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Type</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Status</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Platforms</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Install</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Bid</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">CTR</th>
              <th class="px-4 py-4 text-left font-semibold" :class="isDarkMode ? 'text-slate-200' : 'text-gray-700'">Assets</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading State -->
            <tr v-if="store.isLoading">
              <td colspan="11" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-3">
                  <Spinner />
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">Loading campaigns...</span>
                </div>
              </td>
            </tr>

            <!-- Error State -->
            <tr v-else-if="store.error">
              <td colspan="11" class="px-6 py-12 text-center">
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
              <td colspan="11" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="isDarkMode ? 'text-slate-500' : 'text-gray-400'">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">No campaigns found</span>
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
              <td class="px-4 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ (store.currentPage - 1) * store.perPage + index + 1 }}
              </td>
              
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img 
                    :src="item.image_url" 
                    :alt="item.name"
                    class="w-10 h-10 rounded-lg object-cover"
                    @error="handleImageError"
                  />
                  <div>
                    <div class="font-medium" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ item.name || 'N/A' }}</div>
                    <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
                      {{ item.category || 'Uncategorized' }}
                    </div>
                  </div>
                </div>
              </td>
              
              <td class="px-4 py-4 text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                {{ item.width }} x {{ item.height }}
              </td>
              
              <td class="px-4 py-4 font-mono text-xs" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">
                #{{ item.campaign_ID }}
              </td>
              
              <td class="px-4 py-4">
                <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full" :class="[
                  item.type === 'banner' 
                    ? (isDarkMode ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200')
                    : item.type === 'LOGO'
                    ? (isDarkMode ? 'bg-purple-900/50 text-purple-400 border border-purple-500/30' : 'bg-purple-50 text-purple-700 border border-purple-200')
                    : (isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600')
                ]">
                  {{ item.type || 'N/A' }}
                </span>
              </td>
              
              <td class="px-4 py-4">
                <span 
                  :class="[
                    item.activate 
                      ? (isDarkMode ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200')
                      : (isDarkMode ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200')
                  ]"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="item.activate ? 'bg-green-500' : 'bg-red-500'"></span>
                  <span :class="item.activate ? (isDarkMode ? 'text-green-400' : 'text-green-700') : (isDarkMode ? 'text-red-400' : 'text-red-700')">
                    {{ item.activate ? 'Active' : 'Inactive' }}
                  </span>
                </span>
              </td>
              
              <td class="px-4 py-4">
                <div class="flex gap-1">
                  <span v-if="item.mobile" class="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'" title="Mobile">
                    📱
                  </span>
                  <span v-if="item.web" class="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded" :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'" title="Web">
                    💻
                  </span>
                </div>
              </td>
              
              <td class="px-4 py-4">
                <span 
                  :class="[
                    item.install 
                      ? (isDarkMode ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200')
                      : (isDarkMode ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200')
                  ]"
                  class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                >
                  <span :class="item.install ? (isDarkMode ? 'text-green-400' : 'text-green-700') : (isDarkMode ? 'text-red-400' : 'text-red-700')">
                    {{ item.install ? 'Yes' : 'No' }}
                  </span>
                </span>
              </td>
              
              <td class="px-4 py-4">
                <div>
                  <span class="font-semibold text-green-500">${{ item.bid }}</span>
                  <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-gray-500'">
                    Daily: ${{ item.dailybudget }}
                  </div>
                </div>
              </td>
              
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-12 h-1 rounded-full bg-gray-200 overflow-hidden">
                    <div class="h-full rounded-full" :class="getCtrColor(item.ctr)" :style="{ width: `${Math.min(item.ctr, 100)}%` }"></div>
                  </div>
                  <span class="text-xs font-mono" :class="isDarkMode ? 'text-slate-300' : 'text-gray-600'">{{ item.ctr?.toFixed(1) || 0 }}%</span>
                </div>
              </td>
              
              <td class="px-4 py-4">
                <div class="flex gap-2">
                  <a :href="item.image_url" target="_blank" class="p-1.5 rounded-lg transition-colors" :class="isDarkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'" title="View Image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </a>
                  <a v-if="item.redirect_url" :href="item.redirect_url" target="_blank" class="p-1.5 rounded-lg transition-colors" :class="isDarkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'" title="Redirect URL">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
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
        Showing {{ (store.currentPage - 1) * store.perPage + 1 }} to {{ Math.min(store.currentPage * store.perPage, store.totalCount || store.data.length) }} of {{ store.totalCount || store.data.length }} campaigns
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useCampaignStore } from '../../stores/campaign';
import Spinner from '../elements/loading/index.vue';

const store = useCampaignStore();
const isDarkMode = ref(true);

const selectedActivate = ref<'all' | 'true' | 'false'>('all');
const selectedType = ref<'all' | string>('all');
const selectedMobile = ref<'all' | 'true' | 'false'>('all');
const selectedWeb = ref<'all' | 'true' | 'false'>('all');
const selectedInstall = ref<'all' | 'true' | 'false'>('all');
const campaignId = ref<string>('');
const name = ref<string>('');
const inputPage = ref<number | null>(null);

const hasActiveFilters = computed(() => {
  return campaignId.value || name.value || selectedType.value !== 'all' || 
         selectedActivate.value !== 'all' || selectedMobile.value !== 'all' || 
         selectedWeb.value !== 'all' || selectedInstall.value !== 'all';
});

const activeCampaigns = computed(() => {
  return store.data.filter((item: any) => item.activate === true).length;
});

const mobileCampaigns = computed(() => {
  return store.data.filter((item: any) => item.mobile === true).length;
});

const getCtrColor = (ctr: number) => {
  if (ctr >= 70) return 'bg-green-500';
  if (ctr >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const applyFilter = () => {
  store.setFilters({
    activate: selectedActivate.value,
    type: selectedType.value,
    mobile: selectedMobile.value,
    web: selectedWeb.value,
    install: selectedInstall.value,
    campaignId: campaignId.value,
    name: name.value,
  });
  store.fetchData(1);
};

const clearCampaignFilter = () => {
  campaignId.value = '';
  applyFilter();
};

const clearNameFilter = () => {
  name.value = '';
  applyFilter();
};

const clearTypeFilter = () => {
  selectedType.value = 'all';
  applyFilter();
};

const clearStatusFilter = () => {
  selectedActivate.value = 'all';
  applyFilter();
};

const clearMobileFilter = () => {
  selectedMobile.value = 'all';
  applyFilter();
};

const clearWebFilter = () => {
  selectedWeb.value = 'all';
  applyFilter();
};

const clearInstallFilter = () => {
  selectedInstall.value = 'all';
  applyFilter();
};

const clearAllFilters = () => {
  campaignId.value = '';
  name.value = '';
  selectedType.value = 'all';
  selectedActivate.value = 'all';
  selectedMobile.value = 'all';
  selectedWeb.value = 'all';
  selectedInstall.value = 'all';
  applyFilter();
};

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = 'https://placehold.co/300x250?text=No+Image';
};

const refreshData = () => {
  store.fetchData(store.currentPage);
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

const checkTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

onMounted(() => {
  store.fetchData(1);
  checkTheme();
  const observer = new MutationObserver(checkTheme);
  observer.observe(document.documentElement, { attributes: true });
});

onBeforeUnmount(() => {
  store.resetData();
});
</script>