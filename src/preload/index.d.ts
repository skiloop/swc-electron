import {ElectronAPI} from '@electron-toolkit/preload'

declare global {
    interface Window {
        ipcRenderer: {
            on: (channel: string, listener: (event: any, message: string) => void) => void,
        }
    }
}
