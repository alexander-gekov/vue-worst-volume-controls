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
    <div class="flex justify-center bg-slate-800 text-white h-screen">
        <div
            class="flex flex-col items-center text-center pt-10 overflow-hidden w-full"
        >
            <video controls autoplay loop ref="video"></video>
            <div class="mt-5 mb-10 w-24 text-2xl">
                Volume: {{ Math.round(volume * 100) }}
            </div>
        </div>
        <div
            class="flex flex-col items-center text-center text-2xl p-10 overflow-y-auto w-full"
        >
            <div class="border-2 border-dashed w-full py-20 lg:py-64 my-4">
                <LocationVolume @volume-changed="handleVolumeChange" />
            </div>
            <div class="border-2 border-dashed w-full py-20 lg:py-64 my-4">
                <SliderVolume
                    :volume="volume"
                    @volume-changed="handleVolumeChange"
                />
            </div>
            <div class="border-2 border-dashed w-full py-20 lg:py-64 my-4">
                <RandomVolume
                    :volume="volume"
                    @volume-changed="handleVolumeChange"
                />
            </div>
            <div class="border-2 border-dashed w-full py-20 lg:py-64 my-4">
                <RadioButtonsVolume
                    :volume="volume"
                    @volume-changed="handleVolumeChange"
                />
            </div>
            <div class="border-2 border-dashed w-full py-64 my-4">
                <SpinningWheelVolume @volume-changed="handleVolumeChange" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
