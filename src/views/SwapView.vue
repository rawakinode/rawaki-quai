
<template>
    <div class="swap-box">
        <span class="box-title">Swap</span>
        <span class="box-text">Select pair token to exchange</span>
        <div class="setting-icon" @click="toggleSetting()">
            <img src="../assets/icons/web/setting.svg" alt="">
        </div>
        <br>
        <TokenSelectFirst />
        <br>
        <TokenSelectSecond />
        <div class="swap-info" style="margin-top: 25px;"><span>Price</span><span style="float: right;">1 {{
            $store.state.globalVariable.token_symbol_1 }} > {{ $store.state.globalVariable.token_symbol_2 }}</span>
        </div>
        <div class="swap-info"><span>Trading Fee</span><span style="float: right;">{{ $store.state.globalVariable.token_amount_1 * 0.3 / 100 }} {{
            $store.state.globalVariable.token_symbol_1 }}</span></div>
        <div class="swap-info"><span>Slipage</span><span style="float: right;">{{ $store.state.globalVariable.slippage
        }}%</span></div>
        <div class="swap-info"><span>Deadline</span><span style="float: right;">{{ $store.state.globalVariable.deadline }}
                m</span></div>
        <br>
        <button class="button-disable" v-if="$store.state.globalVariable.address == null">Unlock Wallet</button>
        <button v-else-if="$store.state.globalVariable.token_amount_1 == ''" class="button-disable">Enter Amount</button>
        <button v-else-if="$store.state.globalVariable.token_balance_1 < $store.state.globalVariable.token_amount_1" class="button-disable"
            style="background-color: #482828;">Insufficient {{ $store.state.globalVariable.token_symbol_1 }}
            Balance</button>
        <button v-else class="button-primary">Swap</button>
    </div>

    <Setting :settingVisibility="settingVisibility" :toggleSetting="toggleSetting" />
</template>

<script setup>

import { ref, onMounted } from 'vue';
import Setting from '../components/Setting.vue';
import TokenSelectFirst from '../components/token/TokenSelectFirst.vue';
import TokenSelectSecond from '../components/token/TokenSelectSecond.vue';
import { useStore } from 'vuex';

const $store = useStore();
const settingVisibility = ref(false)

const toggleSetting = () => {
    settingVisibility.value = !settingVisibility.value
}

onMounted(() => {
    $store.commit('updateGlobal', { route: 'swap' })
})

</script>

<style>
/* TOKEN LIST */
.select-token-box {
    max-width: 350px;
    background-color: rgb(34, 34, 45);
    display: block;
    margin: auto;
    padding: 30px 30px;
    overflow: hidden;
    min-height: 100vh;
}

/* SWAP */
.swap-box {
    max-width: 350px;
    background-color: rgb(34, 34, 45);
    display: block;
    margin: auto;
    margin-top: 7rem;
    padding: 30px 30px;
    border-radius: 2rem;
    overflow: hidden;
}

.swap-pair-select {
    background-color: rgb(26, 25, 36);
    padding: 15px;
    border-radius: 1rem;
}

.swap-info {
    margin-top: 8px;
    font-size: 11px;
    color: darkgray;
}

.setting-icon {
    float: inline-end;
    margin-top: -40px;
    fill: goldenrod;
    cursor: pointer;
}

.balance-swap {
    font-size: 10px;
    color: darkgrey;
    float: right;
    margin-top: -20px;
}

.setting-icon:hover {
    filter: saturate(200%);
}

.swap-icon {
    background-color: rgb(64, 64, 87);
    border: none;
    padding-top: 7px;
    cursor: pointer;
}

.swap-icon:hover {
    background-color: rgb(77, 77, 114);
}

.select-token {
    background: rgb(29, 29, 40);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    color: aliceblue;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
}

.select-token:hover {
    background-color: rgb(61, 61, 80);
}

.input-amount {
    margin-top: 0.7rem;
    font-family: inherit;
    font-size: 18px;
    background: none;
    border: none;
    padding: 2px;
    text-decoration: none;
    color: aliceblue;
    width: 100%;
}</style>