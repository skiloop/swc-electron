import {resolve} from 'path'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({}) => {
    const plugins = [
        // swcPlugin(),
        externalizeDepsPlugin(),
        // bytecodePlugin({chunkAlias: 'bot'}),
    ]

    return {
        main: {
            plugins: plugins,
            // optimizeDeps: {
            //   include: ['typeorm', 'reflect-metadata']
            // },
            resolve: {
                alias: {
                    '@common': resolve('src/common')
                }
            },
            build: {
                // minify: true,
                // terserOptions: {
                //   compress: {
                //     drop_console: true, // 移除 console
                //     drop_debugger: true, // 移除 debugger
                //   },
                //   mangle: true,
                // },
                rollupOptions: {
                    external: ['reflect-metadata'],

                    output: {
                        manualChunks(id): string | void {
                            if (id.includes('src/main/common')) {
                                console.debug(`chunk: ${id} => bot`)
                                return 'bot'
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
