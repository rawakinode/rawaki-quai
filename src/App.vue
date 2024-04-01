<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router'
import { getAccount, detectAccountChange } from './services/wallet/Wallet';

getAccount()
detectAccountChange()

</script>

<template>
  <div>
    <Navbar/>
    <RouterView/>
  </div>
</template>

<style scoped></style>

