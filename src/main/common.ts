import * as os from 'os'

export interface HardDisk {
    capacity: number
}

export interface GPUInfo {
    vendor?: string
    version?: string
    memory?: string
}

export interface ChromeInfo {
    version: string
    agent: string
}

export interface CPUInfo {
    model: string
    count: number
    speed: number
}

export interface NetworkInterface {
    mac: string
    name: string
}

export interface DeviceInfo {
    electron: string
    chrome: string
    node: string
    // 屏幕信息， 比如: 1920x1080
    screen: ScreenInfo
    arch: string
    platform: string
    memory: number
    network: NetworkInterface
    disks: HardDisk[]
    cpu: CPUInfo
    gpu: GPUInfo
}

interface ScreenInfo {
    width: number
    height: number
}

function getChromeInfo(): ChromeInfo {
    return {version: 'unknown', agent: 'unknown'}
}

export function getScreenInfo(): ScreenInfo {
    return {width: 1920, height: 1080}
}

function getNetworkInterface(): NetworkInterface {
    const network: NetworkInterface = {
        mac: '',
        name: ''
    }
    const networks = os.networkInterfaces()
    const priorInterfaces: string[] = ['eth0', 'en0']

    // Check prioritized network interfaces first
    for (const nc of priorInterfaces) {
        const interfaces = networks[nc]
        if (interfaces && interfaces.length > 0 && interfaces[0].mac !== '00:00:00:00:00:00') {
            network.mac = interfaces[0].mac
            network.name = nc
            return network
        }
    }

    // Find the first network interface with a valid MAC address
    for (const nw in networks) {
        const interfaces = networks[nw]
        if (interfaces && interfaces.length > 0 && interfaces[0].mac !== '00:00:00:00:00:00:00') {
            network.mac = interfaces[0].mac
            network.name = nw
            break
        }
    }

    return network
}

function getDeviceInfo(): DeviceInfo {
    const cpus = os.cpus()
    const cpuInfo: CPUInfo =
        cpus.length > 0
            ? {
                model: cpus[0].model,
                speed: cpus[0].speed,
                count: cpus.length
            }
            : {model: 'unknown', speed: 0, count: 0}

    const devInfo: DeviceInfo = {
        electron: process.versions.electron ?? 'unknown',
        chrome: 'unknown', // Add logic to retrieve Chrome version if necessary
        arch: os.arch(),
        node: process.versions.node,
        platform: os.platform(),
        screen: getScreenInfo(),
        memory: os.totalmem(),
        network: getNetworkInterface(),
        cpu: cpuInfo,
        disks: [], // Add logic to populate disk information if needed
        gpu: {} // Add logic to populate GPU information if needed
    }

    return devInfo
}

export {getChromeInfo, getDeviceInfo}

{
    if (require.main === module) {
        // 当作为脚本直接执行时
        const devInfo = getDeviceInfo()
        console.log(JSON.stringify(devInfo, null, 4));
    }
}
