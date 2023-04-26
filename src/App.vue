<script setup lang="ts">
import { ref } from 'vue';
import SliderVolume from './components/SliderVolume.vue';
import RandomVolume from './components/RandomVolume.vue';
import RadioButtonsVolume from './components/RadioButtonsVolume.vue';
import LocationVolume from './components/LocationVolume.vue';
import SpinningWheelVolume from './components/SpinningWheelVolume.vue';
import { useMediaControls } from '@vueuse/core';

const video = ref();

const { volume } = useMediaControls(video, {
    src: '/rickroll.mp4',
});

const handleVolumeChange = (value: number) => {
    volume.value = value;
};
</script>

<template>
    <div
        class="flex flex-col items-center text-center bg-slate-800 text-white text-2xl p-10"
    >
        <div class="flex flex-col items-center text-center">
            <video controlslist="" loop ref="video"></video>
            <div class="mt-5 mb-10 w-24">
                Volume: {{ Math.round(volume * 100) }}
            </div>
        </div>
        <div class="border-2 border-dashed w-full p-4 my-4">
            <SliderVolume
                :volume="volume"
                @volume-changed="handleVolumeChange"
            />
        </div>
        <div class="border-2 border-dashed w-full p-4 my-4">
            <RandomVolume
                :volume="volume"
                @volume-changed="handleVolumeChange"
            />
        </div>
        <div class="border-2 border-dashed w-full p-4 my-4">
            <RadioButtonsVolume
                :volume="volume"
                @volume-changed="handleVolumeChange"
            />
        </div>
        <div class="border-2 border-dashed w-full p-4 my-4">
            <LocationVolume @volume-changed="handleVolumeChange" />
        </div>
        <div class="border-2 border-dashed w-full p-4 my-4">
            <SpinningWheelVolume @volume-changed="handleVolumeChange" />
        </div>
    </div>
</template>

<style scoped></style>
