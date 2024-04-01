<template>
    <div class="box-notes">
        {{ message }}
    </div>
    <br>
</template>

<script setup>
import { ref } from 'vue'

const { message } = defineProps(['message'])
</script>
