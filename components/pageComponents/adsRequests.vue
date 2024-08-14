<template>
    <div>
        <h1 class="font-bold text-3xl pt-4 pb-10">Ads Request</h1>

        <!-- Filter Section -->
        <div class="p-4 space-y-4 flex justify-start">
            <div class="flex items-center space-x-2 w-32">
                <label for="webFilter" class="text-gray-700 dark:text-gray-300"> Web:</label>
                <select id="webFilter" v-model="selectedWeb" @change="applyFilter"
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
                        <td class="px-6 py-4">{{ item.created || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.origin || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.web !== null && item.web !== undefined ?
                            item.web.toString() : 'N/A' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex p-5 justify-center items-center py-4">
            <button class="px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:bg-stone-400"
                :disabled="store.currentPage === 1" @click="previousPage">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <span class="text-sm text-gray-500 p-4 dark:text-gray-400">
                Page {{ store.currentPage }} of {{ store.totalPages }}
            </span>
            <button class="px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:bg-stone-400"
                :disabled="store.currentPage === store.totalPages" @click="nextPage">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useClicksStore } from '../../stores/ads';
import Spinner from '../elements/loading/index.vue';

// Pinia store
const store = useClicksStore();

// Component state
const selectedWeb = ref<'all' | 'true' | 'false'>('all');

// Computed properties
const filteredData_ads = computed(() => {
    return store.data.filter(item => {
        if (selectedWeb.value === 'all') return true;
        return item.web === (selectedWeb.value === 'true');
    });
});

// Methods
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
// On component mount
onMounted(() => {
    store.fetchData(store.currentPage);
});
</script>