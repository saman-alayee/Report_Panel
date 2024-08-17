<template>
    <div>
        <Publishers/>
    </div>
</template>

<script setup>
import Publishers from '~/components/pageComponents/publishers.vue';
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss" scoped>

</style>