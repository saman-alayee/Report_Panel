<template>
    <div>
        <Clicks/>
    </div>
</template>

<script setup>
import Clicks from '~/components/pageComponents/clicks.vue';
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss" scoped>

</style>