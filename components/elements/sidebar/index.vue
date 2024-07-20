<template>
  <div class="sidebar-component-container shadow-md" :class="{ openSidebar: isOpen }">
    <div
      class="close-container flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
      @click="isOpen = !isOpen" :class="{ rotate: isOpen }">

      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-list"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>


    </div>

    <div class="menu-item-container mt-16">

      <div class="menu-item" @click="goClicks">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-index"
            viewBox="0 0 16 16">
            <path
              d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Clicks</div>
      </div>
      <div class="menu-item" @click="goAds">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-badge-ad"
            viewBox="0 0 16 16">
            <path
              d="m3.7 11 .47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11zm1.503-4.852.734 2.426H4.416l.734-2.426zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z" />
            <path
              d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Ads</div>
      </div>
      <div class="menu-item" @click="goMobiles">
        <div class="icon-container ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone"
            viewBox="0 0 16 16">
            <path
              d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </div>
        <div class="menu-title px-2" v-if="isOpen">Mobiles</div>
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

function logOut() {
  localStorage.removeItem('adminToken');
  router.push('/login_admin');
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
    width: 120%;

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
      align-items: start;

      &:hover {
        transition: 0.5s;
        background-color: #212226;
        color: #ffffff;
        display: flex;
        border-radius: 4px;
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
    transform: rotate(0);
  }
}

.openSidebar {
  width: 200px;
  padding: 48px;
}
</style>