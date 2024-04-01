<template>
    <div class="overlay" v-if="settingVisibility">
        <div class="popup-box" style="max-width: 410px;">
            <span style="font-size: 24px; font-weight: bold;display: block;">Settings</span>
            <div @click="closeSetting" class="setting-icon" style="margin-top: -30px;">
                <img src="../assets/icons/web/close.svg" alt="">
            </div>
            <br>
            <div style="font-size: 14px;margin-bottom: 10px;color: darkgray;">Slippage Tolerance</div>
            <div style="display: flex;justify-content: space-between;">
                <div style="flex: 1;margin-right: 0.2rem;">
                    <button @click="changeSlippage(0.2)" class="button-slippage">0.2%</button>
                </div>
                <div style="flex: 1;margin-right: 0.2rem;">
                    <button @click="changeSlippage(1)" class="button-slippage">1%</button>
                </div>
                <div style="flex: 1;margin-right: 0.2rem;">
                    <button @click="changeSlippage(5)" class="button-slippage">5%</button>
                </div>
                <div style="flex: 3;">
                    <input type="number" name="slipage" id="slipage" v-model="valueSlippage" @keyup="validateSlippage">
                    <span class="minutes">%</span>
                </div>
            </div>
            <div style="font-size: 14px;margin-bottom: 10px;margin-top: 15px;color: darkgray;">Transaction Deadline</div>
            <div>
                <input type="number" name="deadline" id="deadline" v-model="valueDeadline" @keyup="validateDeadline">
                <span class="minutes">Minutes</span>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { useStore } from 'vuex';

const $store = useStore();
const valueDeadline = ref($store.state.globalVariable.deadline);
const valueSlippage = ref($store.state.globalVariable.slippage);

// Mendefinisikan props yang diperlukan
const { settingVisibility, toggleSetting } = defineProps(['settingVisibility', 'toggleSetting']);

// Mendefinisikan fungsi closeSetting
const closeSetting = () => {
    toggleSetting()
}

const changeSlippage = (data) => {
    valueSlippage.value = data
    $store.commit('updateGlobal', {
        slippage: data
    })
}

const validateSlippage = () => {
    valueSlippage.value = valueSlippage.value > 90 ? 90 : valueSlippage.value
    valueSlippage.value = valueSlippage.value <= 0.1 ? 0.1 : valueSlippage.value
    $store.commit('updateGlobal', {
        slippage: valueSlippage.value
    })
}

const validateDeadline = () => {
    valueDeadline.value = valueDeadline.value < 1 ? 1 : valueDeadline.value
    $store.commit('updateGlobal', {
        deadline: valueDeadline.value
    })
}

</script>

<style scoped>
.setting-icon {
    float: inline-end;
    margin-top: -40px;
    fill: goldenrod;
    cursor: pointer;
}

.setting-icon:hover {
    filter: saturate(200%);
}

input[type="number"] {
    width: 100%;
    color: inherit;
    border: none;
    border-radius: 1rem;
    padding: 10px 15px;
    box-sizing: border-box;
    background-color: rgb(26, 25, 36);
}

.minutes {
    color: darkgoldenrod;
    font-size: 12px;
    float: right;
    position: relative;
    top: -30px;
    right: 20px;
}

.button-slippage {
    width: 100%;
    border: none;
    font-family: inherit;
    color: inherit;
    background-color: rgb(76 71 1);
    padding: 10px 0 10px 0;
    cursor: pointer;
    border-radius: 1rem;
}

.button-slippage:hover {
    background-color: rgb(43, 43, 56);
}

.active {
    background-color: darkgoldenrod;
}
</style>