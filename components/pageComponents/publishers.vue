<template>
  <div>
    <h1 class="font-bold text-3xl pt-4 pb-10">Publishers</h1>

    <!-- Filter Section -->
    <Icon name="my-icon:foo" />

    <!-- Data Table -->
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Publisher ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Actions</th> <!-- New column for the button -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.isLoading">
            <td colspan="7" class="px-6 py-4 text-center">
              <Spinner />
            </td>
          </tr>
          <!-- Show no data message if there is no data -->
          <tr v-else-if="!store.isLoading && store.data.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              No data available
            </td>
          </tr>
          <tr v-else-if="store.error">
            <td colspan="7" class="px-6 py-4 text-center text-red-500">{{ store.error }}</td>
          </tr>
          <tr v-else v-for="(item, index) in filteredData" :key="item._id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">{{ (store.currentPage - 1) * store.perPage + index + 1 }}</td>
            <td class="px-6 py-4">{{ item._id || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.publisherId || 'N/A' }}</td>
            <td class="px-6 py-4">{{ item.username || 'N/A' }}</td>
            <td class="px-6 py-4">
              <!-- New button to open the modal -->
              <button @click="openModal(item)" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Generate token
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex p-5 justify-center items-center py-4">
      <button class="px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:bg-stone-400"
        :disabled="store.currentPage === 1" @click="previousPage">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <span class="text-sm text-gray-500 p-4 dark:text-gray-400">
        Page {{ store.currentPage }} of {{ store.totalPages }}
      </span>
      <button class="px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:bg-stone-400"
        :disabled="store.currentPage === store.totalPages" @click="nextPage">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" @click="closeModalOnClickOutside"
      class=" fixed inset-0 bg-gray-500  bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white lg:w-1/2 w-3/4 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Generate token</h2>
        <form class="mt-4" @submit.prevent="generateToken">
          <div>
            <label for="campaignIdFilter" class="mr-2">Username</label>
            <input type="text" id="username" v-model="modalItem.username"
              class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter username" />
          </div>
          <div class="mt-4">
            <label for="campaignIdFilter" class="mr-2">Publisher Id</label>
            <input type="text" id="publisher id " v-model="modalItem.publisherId"
              class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter Publisher ID" />
          </div>
          <div class="mt-4">
            <label for="campaignIdFilter" class="mr-2 mt-4">Password</label>
            <input type="password" id="password" v-model="password"
              class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter password" />
          </div>

          <div class="flex gap-2">
            <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Close
            </button>
            <button type="submit" class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Generate token
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useClicksStore } from '../../stores/publishers';
import Spinner from '../elements/loading/index.vue';
import axios from 'axios';

const store = useClicksStore();

const selectedCounted = ref<'all' | 'true' | 'false'>('all');
const isModalOpen = ref(false);
const modalItem = ref<any>(null);
const password = ref(null);

const filteredData = computed(() => {
  return store.data.filter(item => {
    if (selectedCounted.value === 'all') return true;
    return item.counted === (selectedCounted.value === 'true');
  });
});

const applyFilter = () => {
  store.fetchData(1); // Fetch data from the first page after applying filter
};

const nextPage = () => {
  store.nextPage();
};

const previousPage = () => {
  store.previousPage();
};

const openModal = (item: any) => {
  modalItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
const closeModalOnClickOutside = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const generateToken = async () => {
  try {
    const response = await axios.post('https://api.daartads.com/tracker/api/v1/v1/auth/login', {
      username: modalItem.value.username, // Assuming username as email
      password: password.value,
      publisherId: modalItem.value.publisherId
    });

    const { token } = response.data;

    // Assuming token and user are refs to store the result
    token.value = token;

    console.log("Token generated successfully:", token.value);

    closeModal(); // Close modal after successful submission
  } catch (err: any) {
    console.error("Error generating token:", err.message || err);
  }
};


// On component mount
onMounted(() => {
  store.fetchData(store.currentPage);
});
</script>

<style scoped>
.fixed {
  z-index: 9999;
}
</style>
