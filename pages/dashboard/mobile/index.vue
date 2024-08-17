<template>
    <div>
        <Mobile/>
    </div>
</template>

<script setup>
import Mobile from '~/components/pageComponents/mobile.vue';

definePageMeta({
  middleware: 'auth'
});
</script>

<style lang="scss" scoped>

</style>