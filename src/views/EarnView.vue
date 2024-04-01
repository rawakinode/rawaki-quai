<template>

</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted } from 'vue'

const $store = useStore();
onMounted(()=>{
    $store.commit('updateGlobal', {route: 'earn'})
})
</script>