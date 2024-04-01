
<script setup>

import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getAccount, detectAccountChange, disconnectWallet } from '../services/wallet/Wallet';
import { useStore } from 'vuex';

const $store = useStore();
const modalConnect = ref(false)

const clickConnect = () => {
    getAccount()
    toggleConnect()
}

const toggleNavbar = () => {
    var x = document.getElementById("navigasi");
    if (x.className === "navigasi") {
        x.className += " responsive";
    } else {
        x.className = "navigasi";
    }
}

const toggleNavbarOnClick = () => {
    var x = document.getElementById("navigasi");
    if (x.className === "navigasi responsive") {
        x.className = "navigasi";
    }
}

const toggleConnect = () => {
    modalConnect.value = !modalConnect.value
    toggleNavbarOnClick()
}

</script>

<template>
    <!-- NAVIGASI /NAVBAR -->
    <div class="navigasi" id="navigasi">
        <nav>
            <ul>
                <li><a href="#" class="icon" @click="toggleNavbar()">&#9776;</a></li>

                <img src="../assets/icons/quai.png" height="23px">

                <!-- <li><RouterLink to="/" @click="toggleNavbarOnClick()">Home</RouterLink></li> -->
                <li>
                    <RouterLink to="/swap" @click="toggleNavbarOnClick()">Swap</RouterLink>
                </li>
                <li>
                    <RouterLink to="/pools" @click="toggleNavbarOnClick()">Pools</RouterLink>
                </li>
                <li>
                    <RouterLink to="/earn" @click="toggleNavbarOnClick()">Earn</RouterLink>
                </li>
                <span class="button-corner">

                    <button @click="disconnectWallet()" v-if=" $store.state.globalVariable.address != null">Disconnect</button>
                    <button @click="toggleConnect()" v-else>Connect</button>
                    <button v-if="$store.state.globalVariable.address != null" style="background-color: aliceblue;color: black;">{{
                        $store.state.globalVariable.address.slice(0, 4) + '...' + $store.state.globalVariable.address.slice(-5) }}</button>
                </span>
            </ul>
        </nav>
    </div>

    <!-- POPUP WALLET CONNECT -->

    <div v-if="modalConnect" class="overlay">
        <div class="popup-box" style="max-width: 400px;">
            <span style="font-size: 24px; font-weight: bold;display: block;">Connect Wallet</span>
            <div @click="toggleConnect()" class="setting-icon" style="margin-top: -30px;">
                <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg"
                    class="sc-bdfBwQ iqFRoe">
                    <path
                        d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z">
                    </path>
                </svg>
            </div>
            <br>

            <button class="button-connect" @click="clickConnect()">
                <img src="../assets/icons/PelagusLogoSquare.png" alt="" height="40" width="40">
                Pelagus
            </button>
        </div>
    </div>

</template>
  
<style scoped>
.router-link-active {
    color: darkgoldenrod !important;
}

.navigasi {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.navigasi nav {
    background-color: rgb(29, 29, 40);
    overflow: hidden;
    border-bottom: 2px solid rgb(46, 46, 55);
}

.navigasi ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.navigasi img {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 20px 16px;
    text-decoration: none;
}

.navigasi button {
    font-family: inherit;
    font-size: 12px;
    border: none;
    background-color: goldenrod;
    color: white;
    padding: 7px 15px;
    cursor: pointer;
    float: right;
    margin-top: 16px;
    margin-right: 12px;
    font-weight: 700;
    border-radius: 2rem;
}

.navigasi button:hover {
    filter: saturate(200%);
}

.navigasi li {
    float: left;
}

.navigasi a {
    text-decoration: none;
    display: block;
    color: aliceblue;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    padding: 20px 16px;
}

.navigasi a:hover {
    text-decoration: dashed;
    color: goldenrod;
}

.navigasi .icon {
    display: none;
    color: aliceblue;
}

.setting-icon {
    float: inline-end;
    margin-top: -40px;
    fill: goldenrod;
    cursor: pointer;
}

.button-connect {
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
    width: 100%;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    padding: 15px;
    background-color: rgb(26, 25, 36);
    color: aliceblue;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
}

.button-connect:hover {
    background-color: rgb(13, 13, 17);
}

.button-connect img {
    border-radius: 5px;
    margin-right: 20px;
}

@media screen and (max-width: 720px) {

    .navigasi a {
        display: none;
    }

    .navigasi a.icon {
        float: left;
        display: block;
    }

    .navigasi .button-corner {
        display: none;
    }
}

@media screen and (max-width: 720px) {
    .navigasi.responsive {
        position: relative;
    }

    .navigasi.responsive img {
        float: none;
        position: relative;
        left: 2.9rem;
    }

    .navigasi.responsive li {
        float: none;
    }

    .navigasi.responsive a.icon {
        position: absolute;
        left: 0;
        top: 0;
    }

    .navigasi.responsive a {
        float: none;
        display: block;
        text-align: left;
    }

    .navigasi.responsive .button-corner {
        display: block;
        float: left;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
}</style>
  