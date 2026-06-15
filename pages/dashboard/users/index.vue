<template>
    <div>
        <Users/>
    </div>
</template>

<script setup>
import Users from '~/components/pageComponents/users.vue';
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss" scoped>

</style>