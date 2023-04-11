<template>
  <div class="flex flex-col justify-center items-center text-center  bg-slate-900 h-screen" style="font-size: 24px;">
    <div class="text-white mb-10 w-24">
    Volume: {{volume}}
  </div>
  <div class="volume-control" :style="{ transform: `rotate(${rotate}deg)` }" ref="volumeControl" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <div class="slider-container">
      <input disabled type="range" min="0" max="100" step="1" v-model="volume" class="volume-slider">
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, Ref } from 'vue';

const volume = ref(50);
const top = computed(() => (window.innerHeight / 2) - 50);
const left = computed(() => (window.innerWidth / 2) - 100);
const rotate = ref(0);
const clicked = ref({left: false, right: false});
const rotationLimit = 25;
let interval: any = null;
let velocity = 0;
const gravity = 0.02;
const resistance = 0.95;

let volumeControl = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>;
  
function handleMouseDown(event: MouseEvent) {
  clearInterval(interval);
  const clickX = event.clientX;
  const volumeControlRect = volumeControl?.value?.getBoundingClientRect();
  if(!volumeControlRect) return;
  const centerX = volumeControlRect.left + (volumeControlRect.width / 2);
 if (clickX < centerX) {
    while(rotate.value > -rotationLimit)
    rotate.value-=1;
  } else {
    while(rotate.value < rotationLimit)
    rotate.value+=1;
  }
}
  
 function handleMouseUp(event: MouseEvent) {
   clearInterval(interval);
  rotate.value = 0;
 }

function updateVolumeControlElement() {
  volumeControl.value = document.querySelector('.volume-control');
}

watch(() => rotate.value, () => {
  if(rotate.value > 0){
    interval = setInterval(() => {
      if(volume.value < 100){
      volume.value+=gravity*rotate.value;
      }
    },5)
  }
  if(rotate.value < 0){
    interval = setInterval(() => {
      if(volume.value > 0 && rotate.value < -1){
      volume.value+=gravity*rotate.value;
      }
    },5)
  }
})

</script>

<style scoped>
.volume-control {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  transition: transform .3s ease-in-out;
}

.slider-container {
  width: 250px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 10px;
  outline: none;
  background-color: #333;
  transition: background-color .15s ease-in-out;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>