<template>
    <div class="swap-pair-select">
        <div>
            <button class="select-token" @click="openPopUpSelectToken()">
                <img :src="$store.state.globalVariable.token_logo_2" height="20" alt="" style="border-radius: 50%;">
                <span style="margin-left: 0.5rem; margin-top: -2px; font-size: 14px;">{{ $store.state.globalVariable.token_symbol_2 }}</span>
            </button>
        </div>
        <span style="float: right;font-size: 11px;color: gray;margin-top: -22px;">Bal: {{
            $store.state.globalVariable.token_balance_2 }}</span>
        <input class="input-amount" type="number" min="0" placeholder="0" v-model="inputAmount"
            @input="inputAmountPerform(this.value)">
    </div>

    <PopUpSelectToken :popUpVisible="isPopupVisible" :sendTokenJson="tokenlist" :onPopUpClosed="openPopUpSelectToken" :firstOrSecond="second"/>
</template>

<script setup>
import PopUpSelectToken from './PopUpSelectToken.vue';
import {getBalance } from '../../utilities/getBalance'
import { ref, watch, onMounted} from 'vue'
import { useStore } from 'vuex';

const $store = useStore();
const inputAmount = ref($store.state.globalVariable.token_amount_2)
const isPopupVisible = ref(false)
const tokenlist = ref($store.state.globalVariable.tokenlist)
const token = ref(tokenlist.value[0])
const second = 2

const priceExampleQUAIUSDT = 1.343

onMounted(()=>{
    $store.commit('updateGlobal', {
        token_logo_2: token.value.logoURI,
        token_name_2: token.value.name,
        token_symbol_2: token.value.symbol,
        token_contract_2: token.value.address,
        token_amount_2: '',
    })
})

const openPopUpSelectToken = () => {
    console.log("clicked");
    isPopupVisible.value = !isPopupVisible.value
}

const inputAmountPerform = () => {
    $store.commit('updateGlobal', {
        token_amount_2: inputAmount.value,
        token_amount_1: (inputAmount.value == '') ? '' : inputAmount.value * (1 / priceExampleQUAIUSDT)
    })
}

watch(() => $store.state.globalVariable.token_amount_2, (v) => {
  inputAmount.value = v;
});

watch(() => $store.state.globalVariable.get_account, (v) => {
    tokenlist.value = $store.state.globalVariable.tokenlist
}, { deep: true})

watch(() => $store.state.globalVariable.address, async () => {
    await getBalance(2)
})

watch(() => $store.state.globalVariable.token_contract_2, async () => {
    await getBalance(2)
})



</script>