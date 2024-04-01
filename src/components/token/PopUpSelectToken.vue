<template>
    <div v-if="popUpVisible" class="overlay">
        <div class="popup-box" style="max-width: 410px;">
            <span style="font-size: 24px; font-weight: bold;display: block;">Select Token</span>
            <div class="setting-icon" style="margin-top: -30px;" @click="closePopUp()">
                <img src="../../assets/icons/web/close.svg" alt="">
            </div>

            <br>
            <div style="overflow: hidden;"><input v-model="searchData" @input="performSearch" class="input-search"
                    type="text" placeholder="Search name or paste address"></div>
            <br><span style="color: aliceblue; font-size: 14px; margin-bottom: 1rem; display: block;">Common</span>
            <div class="token-item" @click="itemSelectToken(NativeQuai)">
                <img height="25px" alt="" :src="NativeQuai.logoURI" style="border-radius: 50%;">
                <span style="margin-left: 10px;color: aliceblue;">{{ NativeQuai.symbol }}</span>
                <span style="margin-left: 10px;font-size: 12px; color: darkgrey;">{{ NativeQuai.name }}</span>
            </div>
            <br><span style="color: aliceblue; font-size: 14px; margin-bottom: 1rem; display: block;">Token List</span>
            <div class="token-list">

                <div v-for="item_token in tokenlist" class="token-item" @click="itemSelectToken(item_token)">
                    <img height="25px" alt="" :src="item_token.logoURI" style="border-radius: 50%;">
                    <span style="margin-left: 10px;color: aliceblue;">{{ item_token.symbol }}</span>
                    <span style="margin-left: 10px;font-size: 12px; color: darkgrey;">{{ item_token.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import { useStore } from 'vuex';
import NativeQuai from '../../assets/token/native-quai.json'

const $store = useStore();

const { popUpVisible, onPopUpClosed, firstOrSecond } = defineProps(['popUpVisible', 'onPopUpClosed', 'firstOrSecond'])

const tokenlist = ref($store.state.globalVariable.tokenlist);
const searchData = ref()

const performSearch = () => {

    const keyword = searchData.value.toLowerCase()

    tokenlist.value = $store.state.globalVariable.tokenlist.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.symbol.toLowerCase().includes(keyword) ||
        item.address.toLowerCase().includes(keyword)
    )

    if (keyword.length == 42 && tokenlist.value.length == 0) {

        console.log('Cari dan import custom token.');

        tokenlist.value = [
            {
                name: "Custom Token",
                symbol: "CUSTOM",
                address: "0x3c5e4ab62ea35b39472dfc6344c80f724f90d47d",
                logoURI: ""
            }
        ]
    }

    console.log(tokenlist.value);
}

const closePopUp = () => {
    searchData.value = ''
    // tokenlist.value = 
    onPopUpClosed()
}

const itemSelectToken = (item) => {
    if (firstOrSecond == 1) {
        if (item.address == $store.state.globalVariable.token_contract_2) {
            $store.commit('updateGlobal', {
                token_logo_2: $store.state.globalVariable.token_logo_1,
                token_name_2: $store.state.globalVariable.token_name_1,
                token_symbol_2: $store.state.globalVariable.token_symbol_1,
                token_contract_2: $store.state.globalVariable.token_contract_1
            })
        }
        $store.commit('updateGlobal', {
            token_logo_1: item.logoURI,
            token_name_1: item.name,
            token_symbol_1: item.symbol,
            token_contract_1: item.address,
        })
    } else {
        if (item.address == $store.state.globalVariable.token_contract_1) {
            $store.commit('updateGlobal', {
                token_logo_1: $store.state.globalVariable.token_logo_2,
                token_name_1: $store.state.globalVariable.token_name_2,
                token_symbol_1: $store.state.globalVariable.token_symbol_2,
                token_contract_1: $store.state.globalVariable.token_contract_2
            })
        }
        $store.commit('updateGlobal', {
            token_logo_2: item.logoURI,
            token_name_2: item.name,
            token_symbol_2: item.symbol,
            token_contract_2: item.address,
        })
    }
    closePopUp()
}

watch(() => $store.state.globalVariable.get_account, (v) => {
    tokenlist.value = $store.state.globalVariable.tokenlist
}, { deep: true})

</script>