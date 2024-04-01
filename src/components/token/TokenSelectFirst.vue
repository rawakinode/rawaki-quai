<template>
    <div class="swap-pair-select">
        <div>
            <button class="select-token" @click="openPopUpSelectToken()">
                <img :src="$store.state.globalVariable.token_logo_1" height="20" alt="" style="border-radius: 50%;">
                <span style="margin-left: 0.5rem; margin-top: -2px; font-size: 14px;">{{
                    $store.state.globalVariable.token_symbol_1 }}</span>
            </button>
        </div>
        <span style="float: right;font-size: 11px;color: gray;margin-top: -22px;">Bal: {{
            $store.state.globalVariable.token_balance_1 }}</span>
        <input class="input-amount" type="number" min="0" placeholder="0" v-model="inputAmount"
            @input="inputAmountPerform()">
    </div>

    <PopUpSelectToken :popUpVisible="isPopupVisible" :onPopUpClosed="openPopUpSelectToken"
        :firstOrSecond="first" />
</template>

<script setup>

import PopUpSelectToken from './PopUpSelectToken.vue';
import NativeQuai from '../../assets/token/native-quai.json'
import {getBalance } from '../../utilities/getBalance'
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex';

const $store = useStore();
const inputAmount = ref($store.state.globalVariable.token_amount_1)
const isPopupVisible = ref(false)
const first = 1

const priceExampleQUAIUSDT = 1.343

onMounted(async () => {
    $store.commit('updateGlobal', {
        token_logo_1: NativeQuai.logoURI,
        token_name_1: NativeQuai.name,
        token_symbol_1: NativeQuai.symbol,
        token_contract_1: NativeQuai.address,
        token_amount_1: '',
    })
})
const openPopUpSelectToken = () => {
    isPopupVisible.value = !isPopupVisible.value
}

const inputAmountPerform = () => {
    $store.commit('updateGlobal', {
        token_amount_1: inputAmount.value,
        token_amount_2: (inputAmount.value == '') ? '' : inputAmount.value * priceExampleQUAIUSDT
    })

    console.log($store.state.globalVariable);
}

watch(() => $store.state.globalVariable.token_amount_1, (v) => {
    inputAmount.value = v;
})

watch(() => $store.state.globalVariable.address, async () => {
    await getBalance(1)
})

watch(() => $store.state.globalVariable.token_contract_1, async () => {
    await getBalance(1)
})

</script>
