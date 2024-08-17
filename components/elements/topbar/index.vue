<template>
  <div>
    <div>
      <div class="flex justify-end bg-gray-950 space-x-3 p-5" style="height: 4.5rem;">
        <button @click="logOut" class="hover:bg-slate-200 bg-slate-50 text-dark-900 font-semibold py-0 px-2 hover:border-slate-100 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z" />
          </svg>
        </button>

        <div class="flex items-center gap-4">
          <div class="font-medium text-white">
            <div>{{ fullName }}</div>
            <!-- <div class="text-sm text-slate-50 dark:text-gray-50">Joined in August 2014</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useAdminStore } from '~/stores/login'; // Import the Pinia store
import { useRouter } from 'vue-router';

const fullName = ref('');
const adminStore = useAdminStore();
const router = useRouter();

function logOut() {
     adminStore.logout(router)
  }onMounted(() => {
  fullName.value = Cookies.get('fullname') || 'Guest';
});
</script>
<style scoped></style>