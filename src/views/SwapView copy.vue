
<template>
    <div class="swap-box">
        <span class="box-title">Swap</span>
        <span class="box-text">Select pair token to exchange</span>
        <div class="setting-icon" @click="toggleSetting()">
            <img src="../assets/icons/web/setting.svg" alt="">
        </div>
        <br>
        <div class="swap-pair-select">
            <div>
                <button class="select-token" @click="selectToken(1)">
                    <img :src="firstToken.logoURI" height="20" alt="">
                    <span style="margin-left: 0.5rem; font-size: 14px;">{{ firstToken.symbol }}</span>
                </button>
                <!-- <span class="balance-swap">Max: <span>1000000000</span></span> -->
            </div>
            <input class="input-amount" type="number" min="0" placeholder="0" v-model="inputAmount1"
                @input="inputAmountPerform(1)">
        </div>
        <br>
        <div class="swap-pair-select">
            <div>
                <button class="select-token" @click="selectToken(2)">
                    <img :src="secondToken.logoURI" height="20" alt="">
                    <span style="margin-left: 0.5rem; font-size: 14px;">{{ secondToken.symbol }}</span>
                </button>
            </div>
            <input class="input-amount" type="number" min="0" placeholder="0" v-model="inputAmount2"
                @input="inputAmountPerform(2)">
        </div>
        <div class="swap-info" style="margin-top: 25px;"><span>Price</span><span style="float: right;">1 {{
            firstToken.symbol }} > 1 {{ secondToken.symbol }}</span></div>
        <div class="swap-info"><span>Trading Fee</span><span style="float: right;">0.01 {{ firstToken.symbol }}</span></div>
        <div class="swap-info"><span>Slipage</span><span style="float: right;">{{ slippage }}%</span></div>
        <br>
        <button class="button-primary">Swap</button>
    </div>

    <div class="popup" style="display: none;" ref="popup">
        <div class="select-token-box">
            <span style="font-size: 24px; font-weight: bold;display: block;">Select Token</span>
            <div class="setting-icon" style="margin-top: -30px;" @click="closePopUp()">
                <img src="../assets/icons/web/close.svg" alt="">
            </div>

            <br>
            <div style="overflow: hidden;"><input v-model="searchData" @input="performSearch" class="input-search"
                    type="text" placeholder="Search name or paste address"></div>
            <br><span style="color: aliceblue; font-size: 14px; margin-bottom: 1rem; display: block;">Token List</span>
            <div class="token-list">
                <div v-for="item_token in tokenlist" class="token-item" @click="itemSelectToken(item_token)">
                    <img height="25px" alt="" :src="item_token.logoURI">
                    <span style="margin-left: 10px;color: aliceblue;">{{ item_token.symbol }}</span>
                    <span style="margin-left: 10px;font-size: 12px; color: darkgrey;">{{ item_token.name }}</span>
                </div>
            </div>
        </div>
    </div>
    <p>{{ isConnect }}</p>

    <Setting :settingVisibility="settingVisibility" :toggleSetting="toggleSetting" :onDataReceived="getSettingData"/>
   
</template>

<script setup>

import { ref, onMounted} from 'vue';
import Setting from '../components/Setting.vue';
import jsonToken from '../assets/token/token-list.json'

const shard = ref('cyprus_1')


const popup = ref(null)
const firstOrSecondToken = ref(null)

const firstToken = ref(jsonToken[shard.value][0])
const secondToken = ref(jsonToken[shard.value][1])

const inputAmount1 = ref(null)
const inputAmount2 = ref(null)

const tokenlist = ref(jsonToken[shard.value]);

const searchData = ref()

const settingVisibility = ref(false)
const slippage = ref(null)
const deadline = ref(null)

const getSettingData = (data) => {
    slippage.value = data.valueSlippage.value
    deadline.value = data.valueDeadline.value
}

const toggleSetting = () => {
    settingVisibility.value = !settingVisibility.value
}

const inputAmountPerform = (v) => {
    const priceQuaiUsdt = 2.567
    if (v > 0) {
        if (v == 1) {
            inputAmount2.value = inputAmount1.value * priceQuaiUsdt
        } else {
            inputAmount1.value = inputAmount2.value / priceQuaiUsdt
        }
    }
}

const performSearch = () => {

    const keyword = searchData.value.toLowerCase()

    tokenlist.value = jsonToken[shard.value].filter(item =>
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
}

const selectToken = (a) => {
    firstOrSecondToken.value = a
    if (popup.value) {
        popup.value.style.display = popup.value.style.display === 'none' ? 'block' : 'none';
    }
}

const closePopUp = () => {
    popup.value.style.display = popup.value.style.display === 'block' ? 'none' : 'block';
    searchData.value = ''
    tokenlist.value = jsonToken[shard.value]
    firstOrSecondToken.value = null
}

const itemSelectToken = (v) => {

    const tokenSelected = v

    if (firstOrSecondToken.value == 1) {
        if (tokenSelected.address == secondToken.value.address) {
            secondToken.value = firstToken.value
        }
        firstToken.value = tokenSelected
    } else if (firstOrSecondToken.value == 2) {
        if (tokenSelected.address == firstToken.value.address) {
            firstToken.value = secondToken.value
        }
        secondToken.value = tokenSelected
    }
    closePopUp()
}

</script>

<style scoped>
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

.input-search {
    font-family: inherit;
    color: aliceblue;
    display: block;
    width: 100%;
    background-color: rgb(26, 25, 36);
    padding: 10px;
    border: none;
    border-radius: 1rem;
    box-sizing: border-box;
}

.token-list {
    overflow-y: scroll;
    min-height: 100vh;
}

.token-item {
    display: flex;
    align-items: center;
    padding: 15px 15px;
    cursor: pointer;
}

.token-item:hover {
    background-color: rgb(14, 14, 21);
}

.popup {
    position: fixed;
    width: 100%;
    min-height: 100%;
    display: flex;
    top: 0;
    left: 0;
    background-color: #000000b5;
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
}

</style>