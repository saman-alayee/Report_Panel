<template>
  <div class="sidebar-component-container shadow-md" :class="{ openSidebar: isOpen }">
    <div
      class="close-container flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
      @click="isOpen = !isOpen" :class="{ rotate: isOpen }">

      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 6h18M3 12h18M3 18h18" />
      </svg>


    </div>

    <div class="menu-item-container mt-16">

      <div class="menu-item" @click="goClicks">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M11.71 17.99A5.993 5.993 0 0 1 6 12c0-3.31 2.69-6 6-6c3.22 0 5.84 2.53 5.99 5.71l-2.1-.63a3.999 3.999 0 1 0-4.81 4.81zM22 12c0 .3-.01.6-.04.9l-1.97-.59c.01-.1.01-.21.01-.31c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8c.1 0 .21 0 .31-.01l.59 1.97c-.3.03-.6.04-.9.04c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10m-3.77 4.26L22 15l-10-3l3 10l1.26-3.77l4.27 4.27l1.98-1.98z" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Clicks</div>
      </div>
      <div class="menu-item" @click="goMobiles">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
            <path fill="currentColor"
              d="m1073 1664l-57 56l72 72H832v-128zm143 256l128 128H512q-27 0-50-10t-40-27t-28-41t-10-50V128q0-27 10-50t27-40t41-28t50-10h1024q27 0 50 10t40 27t28 41t10 50v1264l-128 128V128H512v1792zm813-482l-557 557l-269-269l90-91l179 179l467-467z" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Mobiles</div>
      </div>
      <div class="menu-item" @click="goAds">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
            <g fill="currentColor">
              <path
                d="m3.7 11l.47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11zm1.503-4.852l.734 2.426H4.416l.734-2.426zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043c.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2c-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z" />
              <path
                d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            </g>
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Ads</div>
      </div>

      <div class="menu-item" @click="goCampaign">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.15em" height="1.15em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M18 13v-2h4v2zm1.2 7L16 17.6l1.2-1.6l3.2 2.4zm-2-12L16 6.4L19.2 4l1.2 1.6zM5 19v-4H4q-.825 0-1.412-.587T2 13v-2q0-.825.588-1.412T4 9h4l5-3v12l-5-3H7v4zm6-4.55v-4.9L8.55 11H4v2h4.55zm3 .9v-6.7q.675.6 1.088 1.463T15.5 12t-.413 1.888T14 15.35M7.5 12" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Campaigns</div>
      </div>
      <div class="menu-item" @click="goPublishers">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048">
            <path fill="currentColor"
              d="M1760 1590q66 33 119 81t90 107t58 128t21 142h-128q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149h-128q0-73 20-142t58-128t91-107t119-81q-75-54-117-135t-43-175q0-79 30-149t82-122t122-83t150-30q79 0 149 30t122 82t83 123t30 149q0 94-42 175t-118 135m-224-54q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m-512 80q-32 37-58 77t-46 86q-53-55-128-85t-152-30H256V384H128v1408h787q-14 31-23 63t-15 65H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v640q-58-57-128-95V384h-128v369q-32-9-64-13t-64-4V256h-256q-70 0-136 24t-120 71zm-128-13V351q-54-46-120-70t-136-25H384v1280h256q67 0 132 17t124 50" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Publishers</div>
      </div>
      <div class="menu-item" @click="logOut">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M13.477 21.245H8.34a4.92 4.92 0 0 1-5.136-4.623V7.378A4.92 4.92 0 0 1 8.34 2.755h5.136"/><path stroke-miterlimit="10" d="M20.795 12H7.442"/><path stroke-linejoin="round" d="m16.083 17.136l4.404-4.404a1.04 1.04 0 0 0 0-1.464l-4.404-4.404"/></g></svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Logout</div>
      </div>


    </div>
    <!-- <div class="logo-botton" v-if="isOpen">
        <img src="@/assets/images/menu.png" width="20" alt="" />
      </div>
      <div class="logo-botton" v-if="!isOpen">
        <img src="@/assets/images/menu.png" width="20" alt="" />
      </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const router = useRouter();

function openMenu() {
  isOpen.value = !isOpen.value;
}

function goClicks() {
  router.push('/dashboard/clicks');
}
function goAds() {
  router.push('/dashboard/ads');
}
function goMobiles() {
  router.push('/dashboard/mobile');
}
function goCampaign() {
  router.push('/dashboard/campaign');
}
function goPublishers() {
  router.push('/dashboard/publishers');
}

function logOut() {
  localStorage.removeItem('adminToken');
  router.push('/');
}
</script>


<style lang="scss" scoped>
.sidebar-component-container {
  width: 72px;
  height: 100%;
  background-color: #020617;
  transition: all 0.3s;
  padding: 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  box-shadow: #a5a5a5;

  .user-profile-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .img-container {
      width: 32px;
      height: 32px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  .menu-item-container {
    width: 140%;

    .icon-container {
      margin-top: 7px;
    }

    .menu-item {
      width: 100%;
      height: 32px;
      color: #ffffff;
      border-radius: 1px;
      transition: all 0.3s;
      cursor: pointer;
      margin-bottom: 16px;
      display: flex;
      justify-content: start;
      font-weight: 400;
      align-items: start;

      &:hover {
        transition: 0.5s;
        background-color: #ffffff;
        color: #000000;
        display: flex;
        border-radius: 32px;
        justify-content: center;
      }

      .menu-title {
        margin-right: 16px;
        margin-top: 4px;
      }
    }
  }


  .close-container {
    position: absolute;
    top: 30px;
    left: 10px;
    transform: rotate(180deg);
    cursor: pointer;
    color: #ffffff;
    width: 30px;
  }

  .rotate {

  }
}

.openSidebar {
  width: 200px;
  padding: 48px;
}
</style>