<template>
    <div>
      <h1 class="font-bold text-3xl pt-4 pb-10">Ads Request</h1>
  
      <!-- Filter Section -->
      <!-- <div class="p-4 space-y-4 flex flex-wrap justify-start">
        <div class="flex items-center space-x-2 w-36">
          <label for="publisherIdFilter" class="text-gray-700 dark:text-gray-300">Publisher ID:</label>
          <input type="text" id="publisherIdFilter" v-model="store.selectedPublisherId" @change="applyFilter"
            class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            placeholder="Enter Publisher ID" />
        </div>
        <div class="flex items-center space-x-2 w-36">
          <label for="campaignIdFilter" class="text-gray-700 dark:text-gray-300">Campaign ID:</label>
          <input type="text" id="campaignIdFilter" v-model="store.selectedCampaignId" @change="applyFilter"
            class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            placeholder="Enter Campaign ID" />
        </div>
        <div class="flex items-center space-x-2 w-32">
          <label for="webFilter" class="text-gray-700 dark:text-gray-300">Web:</label>
          <select id="webFilter" v-model="store.selectedWeb" @change="applyFilter"
            class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
            <option value="all">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      </div> -->
  
      <!-- Data Table -->
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">Publisher ID</th>
              <th scope="col" class="px-6 py-3">Campaign ID</th>
              <th scope="col" class="px-6 py-3">Created</th>
              <th scope="col" class="px-6 py-3">Origin</th>
              <th scope="col" class="px-6 py-3">Web</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="store.isLoading">
              <td colspan="7" class="px-6 py-4 text-center">
                <Spinner />
              </td>
            </tr>
            <tr v-else-if="store.error">
              <td colspan="7" class="px-6 py-4 text-center text-red-500">{{ store.error }}</td>
            </tr>
            <tr v-else v-for="(item, index) in filteredData_ads" :key="item._id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ (store.currentPage - 1) * store.perPage + index + 1 }}</td>
              <td class="px-6 py-4">{{ item.publisher_id || 'N/A' }}</td>
              <td class="px-6 py-4">{{ item.campaign_id || 'N/A' }}</td>
              <td class="px-6 py-4">{{ formatDate(item.created) }}</td>
              <td class="px-6 py-4">{{ item.origin || 'N/A' }}</td>
        
                   <td class="px-6 py-4">
              <span
                :class="{ 'bg-red-100 text-red-800 border-red-400': !item.web, 'bg-green-100 text-green-800 border-green-400': item.web }"
                class="text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700">
                {{ item.web !== undefined ? item.web.toString() : 'N/A' }}
              </span>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    <!-- Pagination Controls -->
    <div class="flex p-5 justify-center items-center py-4 space-x-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <!-- Previous Page Button -->
      <button
        class="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        :disabled="store.currentPage === 1" @click="previousPage">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Page Indicator -->
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Page {{ store.currentPage }} of {{ store.totalPages }}
      </span>

      <!-- Next Page Button -->
      <button
        class="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        :disabled="store.currentPage === store.totalPages" @click="nextPage">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Page Number Input -->
      <input type="number" v-model.number="inputPage"
        class="w-20 h-10 px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-center transition-all duration-300"
        @keyup.enter="goToPage" min="1" :max="store.totalPages" placeholder="Page" />
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useClicksStore } from '../../stores/ads';
  import Spinner from '../elements/loading/index.vue';
  
  // Pinia store
  const store = useClicksStore();
  const inputPage = ref<number | null>(null);

  // Computed properties
  const filteredData_ads = computed(() => {
    return store.data.filter(item => {
      const matchesWeb = store.selectedWeb === 'all' || item.web === (store.selectedWeb === 'true');
      const matchesPublisherId = !store.selectedPublisherId || item.publisher_id.includes(store.selectedPublisherId);
      const matchesCampaignId = !store.selectedCampaignId || item.campaign_id.includes(store.selectedCampaignId);
  
      return matchesWeb && matchesPublisherId && matchesCampaignId;
    });
  });
  
  // Method to convert Unix timestamp to a human-readable date
  const formatDate = (unixTimestamp: number | null) => {
    if (!unixTimestamp) return 'N/A';
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString(); // Format date as needed (e.g., 'MM/DD/YYYY')
  };
  
  // Other methods
  const applyFilter = () => {
    store.fetchData(1); // Fetch data from the first page after applying filter
  };
  
  const nextPage = () => {
    store.nextPage();
  };
  
  const previousPage = () => {
    store.previousPage();
  };
  
  onBeforeUnmount(() => {
    store.resetData(); // Reset data when the component is destroyed
  });
  const goToPage = () => {
  if (inputPage.value !== null && inputPage.value > 0 && inputPage.value <= store.totalPages) {
    store.fetchData(inputPage.value);
    inputPage.value = null
  }
};
  // On component mount
  onMounted(() => {
    store.fetchData(store.currentPage);
  });
  </script>
  