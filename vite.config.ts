import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueMacros({
            plugins: {
                vue: vue({
                    include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?$/],
                }),
                // vueJsx: VueJsx(), // if needed
            },
        }),
    ],
})
