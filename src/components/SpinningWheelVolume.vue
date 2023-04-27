<template>
    <div class="flex flex-col justify-center items-center">
        <div class="text-4xl mb-10">Spin the wheel to adjust volume:</div>
        <div class="relative w-[500px] h-[500px]">
            <div
                ref="wheel"
                class="w-full h-full relative overflow-hidden rounded-full border-[10px] border-white duration-1000 transition-all ease-6s"
            >
                <div>
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-red-600 left-0 top-[120px] clip-path-span1"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-[30%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            5
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-teal-400 -right-0 top-[120px] clip-path-span2"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-[80%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            75
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-purple-600 bottom-0 left-[120px] clip-path-span3"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[80%] left-[55%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            25
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-green-700 top-0 left-[120px] clip-path-span4"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[35%] left-[58%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            0
                        </p></span
                    >

                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-indigo-700 right-[242px] -bottom-0.5 clip-path-span5"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-[55%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            100
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-red-500 left-[242px] -bottom-0.5 clip-path-span6"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-[60%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            50
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-yellow-500 right-[242px] -top-0.5 clip-path-span7"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-1/2 transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            35
                        </p></span
                    >
                    <span
                        class="w-6/12 inline-block absolute h-1/2 bg-orange-500 left-[242px] -top-0.5 clip-path-span8"
                        ><p
                            class="w-16 h-16 text-4xl text-center absolute top-[60%] left-[60%] transform -translate-x-[50px] -translate-y-[50px]"
                        >
                            69
                        </p></span
                    >
                </div>
            </div>
            <div
                class="absolute w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-white top-0 left-[45%]"
            ></div>
            <button
                class="absolute w-20 h-20 top-[43%] left-[43%] rounded-full border-2 border-white animate-spinning bg-black text-white font-bold text-xl cursor-pointer active:text-xl active:bg-yellow-500"
                @click="letsSpin"
            >
                SPIN
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
const emit = defineEmits<{
    (e: 'volumeChanged', volume: number): void;
}>();

const wheel: Ref<HTMLElement | null> = ref(null);
const wheelValues = [0, 35, 5, 100, 25, 50, 75, 69];
const deg = ref(0);

const letsSpin = () => {
    const x = 1024; //min value
    const y = 9999; //max value

    deg.value = Math.floor(Math.random() * (x - y)) + y;

    const divider = 360 / wheelValues.length;
    const offset = divider / 2; //half division
    const wheelValue =
        wheelValues[
            Math.floor(Math.ceil((deg.value + offset) % 360) / divider)
        ];

    if (wheel.value) {
        wheel.value.style.transform = 'rotate(' + deg.value + 'deg)';
    }
    setTimeout(() => {
        emit('volumeChanged', wheelValue / 100);
    }, 1000);
};
</script>

<style scoped></style>
