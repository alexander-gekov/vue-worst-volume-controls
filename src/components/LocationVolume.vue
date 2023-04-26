<template>
    <div class="flex flex-col items-center text-center text-2xl p-10">
        Initial Volume is based of your location:
        <br />
        Volume: {{ Math.round(volume * 100) }}
        <br />
        Latitude: {{ coords.latitude }}
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGeolocation } from '@vueuse/core';

const { coords } = useGeolocation();

const emit = defineEmits<{
    (e: 'volumeChanged', volume: number): void;
}>();

const volume = ref(0);

watch(
    () => coords.value,
    () => {
        volume.value = Math.round(coords.value.latitude) / 100;
        emit('volumeChanged', volume.value);
    }
);
</script>

<style scoped></style>
