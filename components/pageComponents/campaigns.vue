<template>
    <div>
        <h1 class="font-bold text-3xl pt-4 pb-10">Campaigns</h1>

        <!-- Filter Section -->
        <div class="p-4 space-y-4 flex justify-around">
            <!-- Filter by Activate -->
            <div class="flex items-center space-x-2 mt-4">
                <label for="activatedFilter" class="text-gray-700 dark:text-gray-300"> Activate:</label>
                <select id="activatedFilter" v-model="selectedActivate" @change="applyFilter"
                    class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option value="all">All</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            <!-- Filter by Type -->
            <div class="flex items-center space-x-2">
                <label for="typeFilter" class="text-gray-700 dark:text-gray-300"> Type:</label>
                <select id="typeFilter" v-model="selectedType" @change="applyFilter"
                    class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option value="all">All</option>
                    <option value="LOGO">LOGO</option>
                    <option value="BANNER">BANNER</option>
                    <!-- Add more types as needed -->
                </select>
            </div>

            <!--  Mobile -->
            <div class="flex items-center space-x-2">
                <label for="mobileFilter" class="text-gray-700 dark:text-gray-300"> Mobile:</label>
                <select id="mobileFilter" v-model="selectedMobile" @change="applyFilter"
                    class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option value="all">All</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            <!--  Web -->
            <div class="flex items-center space-x-2">
                <label for="webFilter" class="text-gray-700 dark:text-gray-300"> Web:</label>
                <select id="webFilter" v-model="selectedWeb" @change="applyFilter"
                    class="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                    <option value="all">All</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            <!--  Install -->
            <div class="flex items-center space-x-2">
                <label for="installFilter" class="text-gray-700 dark:text-gray-300"> Install:</label>
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
                    <tr v-else v-for="(item, index) in filteredData" :key="item._id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4">{{ (store.currentPage - 1) * store.perPage + index + 1 }}</td>
                        <td class="px-6 py-4">{{ item.name || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.width + ' x ' + item.height || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.campaign_ID || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.type || 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.activate !== null && item.activate !== undefined ?
                            item.activate.toString() : 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.mobile !== null && item.mobile !== undefined ?
                            item.mobile.toString() : 'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.web !== null && item.web !== undefined ? item.web.toString() :
                            'N/A' }}</td>
                        <td class="px-6 py-4">{{ item.install !== null && item.install !== undefined ?
                            item.install.toString() : 'N/A' }}</td>
                        <td class="px-6 py-4">
                            <a :href="item.image_url" target="_blank" class="text-blue-500 hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                    <rect width="416" height="352" x="48" y="80" fill="none" stroke="currentColor"
                                        stroke-linejoin="round" stroke-width="32" rx="48" ry="48" />
                                    <circle cx="336" cy="176" r="32" fill="none" stroke="currentColor"
                                        stroke-miterlimit="10" stroke-width="32" />
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="32"
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
import { ref, computed, onMounted } from 'vue';
import { useClicksStore } from '../../stores/campaign';
import Spinner from '../elements/loading/index.vue';

// Pinia store
const store = useClicksStore();

// Component state
const selectedActivate = ref<'all' | 'true' | 'false'>('all');
const selectedType = ref<'all' | string>('all');
const selectedMobile = ref<'all' | 'true' | 'false'>('all');
const selectedWeb = ref<'all' | 'true' | 'false'>('all');
const selectedInstall = ref<'all' | 'true' | 'false'>('all');

// Computed properties
const filteredData = computed(() => {
    return store.data.filter(item => {
        const matchesActivate = selectedActivate.value === 'all' || item.activate === (selectedActivate.value === 'true');
        const matchesType = selectedType.value === 'all' || item.type === selectedType.value;
        const matchesMobile = selectedMobile.value === 'all' || item.mobile === (selectedMobile.value === 'true');
        const matchesWeb = selectedWeb.value === 'all' || item.web === (selectedWeb.value === 'true');
        const matchesInstall = selectedInstall.value === 'all' || item.install === (selectedInstall.value === 'true');

        return matchesActivate && matchesType && matchesMobile && matchesWeb && matchesInstall;
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

// On component mount
onMounted(() => {
    store.fetchData(store.currentPage);
});
</script>
