<template>
    <div
        class="flex flex-row justify-center items-center bg-lightgray p-20 pl-40 pr-40 transition-transform duration-300 ease-in-out"
        :style="{ transform: `rotate(${rotate}deg)` }"
        ref="volumeControl"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
    >
        <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="w-4 h-4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            ></path>
        </svg>
        <div
            class="w-[250px] h-[20px] rounded-[10px] mx-10 flex items-center justify-center"
        >
            <input
                disabled
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model="volume"
                class="-webkit-appearance-none appearance-none w-full h-6 rounded-[10px] outline-none bg-slate-700 transition duration-150 ease-in-out"
            />
        </div>
        <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="w-4 h-4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            ></path>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from 'vue';

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

const rotate = ref(0);
const rotationLimit = 25;
let interval: any = null;
const gravity = 0.02;

let volumeControl = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>;

function handleMouseDown(event: MouseEvent) {
    clearInterval(interval);
    const clickX = event.clientX;
    const volumeControlRect = volumeControl?.value?.getBoundingClientRect();
    if (!volumeControlRect) return;
    const centerX = volumeControlRect.left + volumeControlRect.width / 2;
    if (clickX < centerX) {
        while (rotate.value > -rotationLimit) rotate.value -= 1;
    } else {
        while (rotate.value < rotationLimit) rotate.value += 1;
    }
}

function handleMouseUp(event: MouseEvent) {
    clearInterval(interval);
    rotate.value = 0;
}

watch(
    () => rotate.value,
    () => {
        if (rotate.value > 0) {
            interval = setInterval(() => {
                if (volume.value < 1) {
                    if (volume.value + (gravity * rotate.value) / 100 > 1) {
                        volume.value = 1;
                    } else {
                        volume.value += (gravity * rotate.value) / 100;
                    }
                }
            }, 5);
        }
        if (rotate.value < 0) {
            interval = setInterval(() => {
                if (volume.value > 0 && rotate.value < -1) {
                    if (volume.value + (gravity * rotate.value) / 100 < 0) {
                        volume.value = 0;
                    } else {
                        volume.value += (gravity * rotate.value) / 100;
                    }
                }
            }, 5);
        }
    }
);
</script>

<style scoped></style>
