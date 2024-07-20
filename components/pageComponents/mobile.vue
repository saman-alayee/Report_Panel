<template>
    <div>
        <h1 class="font-bold text-3xl pt-4 pb-6">
            Clicks Mobile
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-2">
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Pie />
            </div>
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Doughnut />
            </div>
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Area />
            </div>
          
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Progressive />
            </div>
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <lineChart />
            </div>
        </div>
        <div class="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <TextInput v-model="searchQuery" iconSrc="/images/icons/search.svg" placeholder="Search for items..."
                :dropdownItems="menuItems" dropdownButtonText="Filter" label="Search" />
            <div class="">
                <Dropdown :buttonText="'Filter'" :items="menuItems" />
            </div>
        </div>

        <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">no</th>
                        <th scope="col" class="px-6 py-3">view_id</th>
                        <th scope="col" class="px-6 py-3">publisher_id</th>
                        <th scope="col" class="px-6 py-3">campaign_id</th>
                        <th scope="col" class="px-6 py-3">requests</th>
                        <th scope="col" class="px-6 py-3">counted</th>
                        <th scope="col" class="px-6 py-3">ip</th>
                        <th scope="col" class="px-6 py-3">location</th>
                        <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(product, index) in paginatedCards" :key="index">

                        <td class="px-6 py-4">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ product.name }}
                        </th>
                        <td class="px-6 py-4">{{ product.color }}</td>
                        <td class="px-6 py-4">{{ product.category }}</td>
                        <td class="px-6 py-4">{{ product.requests }}</td>
                        <td class="px-6 py-4">{{ product.counted }}</td>
                        <td class="px-6 py-4">{{ product.ip }}</td>
                        <td class="px-6 py-4">{{ product.location ? product.location : 'Loading...' }}</td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center mt-4">
            <button @click="previousPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-inherit text-dark border hover:bg-slate-200  rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </button>
            <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-inherit text-dark border hover:bg-slate-200 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        </div>
    </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';
import Dropdown from '../elements/dropdown/index.vue';
import TextInput from '../elements/inputs/textInput.vue';
import Pie from '../elements/chart/pie.vue';
import Doughnut from '../elements/chart/doughnut.vue';
import Area from '../elements/chart/area.vue';
import Progressive from '../elements/chart/progressive.vue';
import lineChart from '../elements/chart/lineChart.vue';

const menuItems = ref([
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' }
]);

const products = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10); // Number of items per page

const fetchLocation = async (ip) => {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
};

const loadLocations = async () => {
    for (let product of products.value) {
        const locationData = await fetchLocation(product.ip);
        if (locationData) {
            product.location = `${locationData.city}, ${locationData.country}`;
        } else {
            product.location = 'Location not found';
        }
    }
};

onMounted(() => {
    // Sample data; replace with actual data fetching logic
    products.value = [
        // Add multiple product objects here as needed
        { name: 'sam MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null },
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null }, { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', ip: '192.8.55.8', location: null },
        // Add more products
    ];
    loadLocations();
});

const filteredCards = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        return products.value;
    }
    return products.value.filter(card =>
        card.name.toLowerCase().includes(query)
    );
});

const paginatedCards = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = startIndex + perPage.value;
    return filteredCards.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / perPage.value);
});

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>