<template>
    <div class="liquidity-box">
        <div style="display: block;margin-bottom: 5px;">
            <div>
                <RouterLink to="/pools"><img src="../assets/icons/web/back.svg" alt="" style="margin-top: 5px;cursor: pointer;"></RouterLink>
            </div>
            <div style="margin-top: -2rem;text-align:center;top:-2rem">
                <span style="text-align;color: aliceblue;">Add Liquidity</span>
            </div>
        </div>
        <br>
        <Notes v-if="first_liquidity" :message="messages" />
        <TokenSelectFirst />
        <br>
        <TokenSelectSecond />
        <br>
        <div class="box-notes" style="display: flex;">
            <div style="flex: 1;text-align: center;margin:0px 8px;">
                <span style="margin-bottom: 10px;display: block;">-</span>
                <span>USDT per USDC</span>
            </div>
            <div style="flex: 1;text-align: center;margin:0px 8px;">
                <span style="margin-bottom: 10px;display: block;">-</span>
                <span>USDT per USDC</span>
            </div>
            <div style="flex: 1;text-align: center;margin:0px 8px;">
                <span style="margin-bottom: 10px;display: block;">-</span>
                <span>Share of Pool</span>
            </div>
        </div>
        <br>
        <input type="button" class="button-primary" v-if="!approved1" style="margin-bottom: 0.5rem;" value="Approve USDT" disabled>
        <button class="button-primary" v-if="!approved2" style="margin-bottom: 0.5rem;">Approve USDC</button>
        <button class="button-primary" v-if="approved1 && approved2">Supply</button>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import TokenSelectFirst from '../components/token/TokenSelectFirst.vue';
import TokenSelectSecond from '../components/token/TokenSelectSecond.vue';
import Notes from '../components/Notes.vue';
import { RouterLink } from 'vue-router';

const first_liquidity = ref(true)
const approved1 = ref(false)
const approved2 = ref(false)
const messages = ref(`You are the first liquidity provider.
The ratio of tokens you add will set the price of this pool.
Once you are happy with the rate click supply to review.`)

</script>