<template>
    <div class="liquidity-box">
        <span class="box-title">Liquidity</span>
        <span class="box-text" style="margin-bottom: 2rem;">Add liquidity to receive LP tokens</span>
        <RouterLink to="/pools/add"><button class="button-primary">Add Liquidity</button></RouterLink>
        <br>
        <div style="text-align: center;">
            <Notes :message="`You don't have any liquidity`"/>
        </div>
        <span style="font-size: 12px; display: block;color: rgb(129, 135, 141);">Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</span>

    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Notes from '../components/Notes.vue';

const $store = useStore();
onMounted(()=>{
    $store.commit('updateGlobal', {route: 'pools'})
})
</script>

<style>
.liquidity-box {
    max-width: 350px;
    background-color: rgb(34, 34, 45);
    display: block;
    margin: auto;
    margin-top: 7rem;
    padding: 30px 30px;
    border-radius: 2rem;
    overflow: hidden;
}


</style>