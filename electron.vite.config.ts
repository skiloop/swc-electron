import {resolve} from 'path'
import {bytecodePlugin, defineConfig, externalizeDepsPlugin, swcPlugin} from 'electron-vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({}) => {
    const plugins = [
        externalizeDepsPlugin(),
        swcPlugin(),
        bytecodePlugin({chunkAlias: 'common', removeBundleJS: false}),
    ]

    return {
        main: {
            plugins: plugins,
            build: {
                rollupOptions: {
                    external: ['reflect-metadata'],

                    output: {
                        manualChunks(id): string | void {
                            if (id.includes('src/main/common')) {
                                console.debug(`chunk: ${id} => common`)
                                return 'common'
                            }
                        }
                    }
                }
            }
        },
        preload: {
            plugins: [externalizeDepsPlugin()]
        },
        renderer: {
            resolve: {
                alias: {
                    '@renderer': resolve('src/renderer'),
                    '@modules': resolve(__dirname, 'node_modules/')
                }
            },
            plugins: [vue()]
        }
    }
})
