<template>
    <div class="layout-container">
        <div class="sidebar-component">
            <Sidebar />
        </div>
        <div class="main-layout-component">
            <div class="container">
                <Topbar/>
                <div class="content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '~/components/elements/sidebar/index.vue';
import { computed, ref } from 'vue';
import Topbar from '~/components/elements/topbar/index.vue';

const closeMenu = ref(false);

const toggleSidebar = () => {
    closeMenu.value = !closeMenu.value;
};
</script>

<style lang="scss" scoped>
.sidebar-component {
    height: 100vh;
    flex: 1;
}

.main-layout-component {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    overflow-x: hidden;
    height: 100vh;
    .content {
        height: 100%;
        overflow:hidden ;
        margin-top: 24px;
        padding: 16px;
    }
}

.left-side-bar {
    width: 440px;
    background: rgba(166, 166, 166, 0.1);
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.05);
    border-radius: 0px 30px 30px 0px;
    padding: 0 10px;

    .left-bar-header {
        width: 350px;
        direction: ltr;
        display: flex;
        flex-direction: row;

        .icon-card {
            width: 45px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            background: #fff;
            margin: 10px 6px;
        }

        .switch-box {
            display: flex;
            flex-direction: row;
            margin: 22px 8px;

            .test {
                padding: 0px 6px;
            }
        }
    }
}

.layout-container {
    display: flex;

    .left-container {
        width: 100%;
    }

    .topbar {
        width: 100%;

        .title-container-top {
            width: 100%;
            height: 64px;
            background: #c4c4c4f5;
            display: flex;
            align-items: center;
            padding: 10px 20px;

            // position: fixed;
            // top: 110px;
            // left: 0;
            // z-index: 20000;
            p {
                color: #404141;
                text-align: right;
                margin-bottom: 0;
            }
        }
    }
}
</style>