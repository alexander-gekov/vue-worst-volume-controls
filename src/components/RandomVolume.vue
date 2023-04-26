<template>
    <div>
        <button
            @click="volume = Math.random()"
            class="rounded px-4 py-2 border border-slate-200 hover:bg-slate-300 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
            Change Volume
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    volume: number;
}>();

const emit = defineEmits<{
    (e: 'volumeChanged', volume: number): void;
}>();

const volume = computed({
    get() {
        return props.volume;
    },
    set(value) {
        emit('volumeChanged', value);
    },
});
</script>

<style scoped></style>
