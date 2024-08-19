<template>
  <div>
    <h1 class="font-bold text-3xl pt-4 pb-10">Campaigns</h1>

    <!-- Filter Section -->
    <div class="mb-4 flex space-x-4">
      <!-- Filter by Campaign ID -->
      <div class=" space-x-2">
        <label for="campaignIdFilter" class="text-gray-700 dark:text-gray-300">Campaign ID</label>
        <input id="campaignIdFilter" v-model="campaignId" @keypress.enter="applyFilter" type="text"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          placeholder="Enter Campaign ID" />
      </div>

      <!-- Filter by Name -->
      <div class=" space-x-2">
        <label for="nameFilter" class="text-gray-700 dark:text-gray-300">Name</label>
        <input id="nameFilter" v-model="name" @keypress.enter="applyFilter" type="text"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          placeholder="Enter Name" />
      </div>
      <!-- Filter by Activate -->
      <div class="space-x-2">
        <label for="activatedFilter" class="text-gray-700 dark:text-gray-300">Activate</label>
        <select id="activatedFilter" v-model="selectedActivate" @change="applyFilter"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <!-- Filter by Type -->
      <div class=" space-x-2">
        <label for="typeFilter" class="text-gray-700 dark:text-gray-300">Type</label>
        <select id="typeFilter" v-model="selectedType" @change="applyFilter"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
          <option value="all">All</option>
          <option value="LOGO">LOGO</option>
          <option value="BANNER">BANNER</option>
          <!-- Add more types as needed -->
        </select>
      </div>

      <!-- Filter by Install -->
      <div class=" space-x-2">
        <label for="installFilter" class="text-gray-700 dark:text-gray-300">Install</label>
        <select id="installFilter" v-model="selectedInstall" @change="applyFilter"
          class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>




    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Size</th>
            <th scope="col" class="px-6 py-3">Campaign ID</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Activate</th>
            <th scope="col" class="px-6 py-3">Mobile</th>
            <th scope="col" class="px-6 py-3">Web</th>
            <th scope="col" class="px-6 py-3">Install</th>
            <th scope="col" class="px-6 py-3">Image URL</th>
            <th scope="col" class="px-6 py-3">Redirect URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.isLoading">
            <td colspan="11" class="px-6 py-4 text-center">
              <Spinner />
            </td>
          </tr>
          <tr v-else-if="store.error">
            <td colspan="11" class="px-6 py-4 text-center text-red-500">{{ store.error }}</td>
          </tr>
          <tr v-else v-for="(item, index) in store.data" :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ (store.currentPage - 1) * store.perPage + index + 1 }}</td>
            <td class="px-6 py-4">{{ item.name || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.width + ' x ' + item.height || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.campaign_ID || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.type || 'N/A' }}</td>
            <td class="px-6 py-4">
              <span
                :class="{ 'bg-red-100 text-red-800 border-red-400': !item.activate, 'bg-green-100 text-green-800 border-green-400': item.activate }"
                class="text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700">
                {{ item.activate !== undefined ? item.activate.toString() : 'N/A' }}
              </span>
            </td>
            <td class="px-6 py-4">{{ item.mobile !== null && item.mobile !== undefined ? item.mobile.toString() : 'N/A'
              }}</td>
            <td class="px-6 py-4">{{ item.web !== null && item.web !== undefined ? item.web.toString() : 'N/A' }}</td>
            <td class="px-6 py-4">
              <span
                :class="{ 'bg-red-100 text-red-800 border-red-400': !item.install, 'bg-green-100 text-green-800 border-green-400': item.install }"
                class="text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700">
                {{ item.install !== undefined ? item.install.toString() : 'N/A' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <a :href="item.image_url" target="_blank" class="text-blue-500 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                  <rect width="416" height="352" x="48" y="80" fill="none" stroke="currentColor" stroke-linejoin="round"
                    stroke-width="32" rx="48" ry="48" />
                  <circle cx="336" cy="176" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10"
                    stroke-width="32" />
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="32"
                    d="m304 335.79l-90.66-90.49a32 32 0 0 0-43.87-1.3L48 352m176 80l123.34-123.34a32 32 0 0 1 43.11-2L464 368" />
                </svg>
              </a>
            </td>
            <td class="px-6 py-4">
              <a v-if="item.redirect_url" :href="item.redirect_url" target="_blank"
                class="text-blue-500 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M10.616 16.077H7.077q-1.692 0-2.884-1.192T3 12t1.193-2.885t2.884-1.193h3.539v1H7.077q-1.27 0-2.173.904Q4 10.731 4 12t.904 2.173t2.173.904h3.539zM8.5 12.5v-1h7v1zm4.885 3.577v-1h3.538q1.27 0 2.173-.904Q20 13.269 20 12t-.904-2.173t-2.173-.904h-3.538v-1h3.538q1.692 0 2.885 1.192T21 12t-1.193 2.885t-2.884 1.193z" />
                </svg>
              </a>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCampaignStore } from '../../stores/campaign';
import Spinner from '../elements/loading/index.vue';

// Pinia store
const store = useCampaignStore();

// Component state
const selectedActivate = ref<'all' | 'true' | 'false'>('all');
const selectedType = ref<'all' | string>('all');
const selectedMobile = ref<'all' | 'true' | 'false'>('all');
const selectedWeb = ref<'all' | 'true' | 'false'>('all');
const selectedInstall = ref<'all' | 'true' | 'false'>('all');
const campaignId = ref<string>('');
const name = ref<string>('');
const inputPage = ref<number | null>(null);
// Methods
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
  store.fetchData(store.currentPage
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