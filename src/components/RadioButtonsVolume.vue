<template>
    <div>
        <div>Select your desired volume:</div>
        <div
            class="grid grid-cols-12 items-center text-center h-screen text-lg lg:text-xl lg:px-16 py-16"
        >
            <label
                class="flex justify-center items-center"
                v-for="i in 101"
                :key="i - 1"
            >
                <input
                    type="radio"
                    class="lg:mr-2"
                    :checked="i - 1 === selectedValue"
                    @change="emit('volumeChanged', (i - 1) / 100)"
                    :value="selectedValue"
                />
                {{ i - 1 }}
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    volume: number;
}>();

const emit = defineEmits<{
    (e: 'volumeChanged', volume: number): void;
}>();

const selectedValue = computed(() => {
    return Math.round(props.volume * 100);
});
</script>

<style scoped></style>
