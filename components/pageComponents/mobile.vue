<template>
  <div>
    <h1 class="font-bold text-3xl pt-4 pb-10">Clicks Mobile</h1>

    <!-- Filter Section -->
    <div class="mb-4 flex space-x-4">
      <div class="w-42">
        <label for="campaignIdFilter" class="mr-2">Campaign ID</label>
        <input type="text" id="campaignIdFilter" v-model="selectedCampaignId"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          @keypress.enter="applyFilter" placeholder="Enter campaign ID" />
      </div>
      <div class="w-42">
        <label for="publisherIdFilter" class="mr-2">Publisher ID</label>
        <input type="text" id="publisherIdFilter" v-model="selectedPublisherId"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          @keypress.enter="applyFilter" placeholder="Enter publisher ID" />
      </div>
      <div class="w-36">
        <label for="countedFilter" class="">Counted</label>
        <select id="countedFilter" v-model="selectedCounted"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          @change="applyFilter">
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <!-- <div class="w-42">
        <label for="dateFilter" class="mr-2">Date</label>
        <input type="date" id="dateFilter" v-model="selectedDate"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          @change="applyFilter" />
      </div> -->
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Publisher ID</th>
            <th scope="col" class="px-6 py-3">Campaign ID</th>
            <th scope="col" class="px-6 py-3">Requested</th>
            <th scope="col" class="px-6 py-3">Counted</th>
            <th scope="col" class="px-6 py-3">IP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.isLoading">
            <td colspan="6" class="px-6 py-4 text-center">
              <Spinner />
            </td>
          </tr>

          <tr v-else-if="store.error">
            <td colspan="6" class="px-6 py-4 text-center text-red-500">{{ store.error }}</td>
          </tr>
          <tr v-else v-for="(item, index) in store.data" :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ (store.currentPage - 1) * store.perPage + index + 1 }}</td>
            <td class="px-6 py-4">{{ item.publisher_ID || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.campaign_ID || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.requested || 'N/A' }}</td>
            <td v-if="item.counted == false" class="px-6 py-4"><span
                class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{{
                  item.counted !== undefined ? item.counted.toString() : 'N/A' }}</span>
            </td>
            <td v-if="item.counted == true" class="px-6 py-4"><span
                class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{{
                  item.counted !== undefined ? item.counted.toString() : 'N/A' }}</span>
            </td>
            <td class="px-6 py-4">{{ item.ip || 'N/A' }}</td>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useClicksMobileStore } from '../../stores/clicksMobile';
import Spinner from '../elements/loading/index.vue';

// Pinia store
const store = useClicksMobileStore();

// Component state
const selectedPublisherId = ref<string | null>(null);
const selectedCampaignId = ref<string | null>(null);
const selectedCounted = ref<'all' | 'true' | 'false'>('all');
const selectedDate = ref<string | null>(null);
  const inputPage = ref<number | null>(null);
// Methods

const applyFilter = () => {
  store.applyFilters(
    selectedPublisherId.value,
    selectedCampaignId.value,
    selectedCounted.value,
    selectedDate.value
  );
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
    inputPage.value = null
  }
};
// On component mount
onMounted(() => {
  store.fetchData(store.currentPage);
});

onBeforeUnmount(() => {
  store.resetData(); // Reset data when the component is destroyed
});

</script>
