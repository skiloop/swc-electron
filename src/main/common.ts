function getDeviceInfo(): object {
    const cpuInfo =
        {model: 'unknown', speed: 0, count: 0}

    return {
        electron: process.versions.electron ?? 'unknown',
        chrome: 'unknown', // Add logic to retrieve Chrome version if necessary
        node: process.versions.node,
        cpu: cpuInfo,
        disks: [], // Add logic to populate disk information if needed
        gpu: {} // Add logic to populate GPU information if needed
    }
}

export {getDeviceInfo}
{
    // 当作为脚本直接执行时
    const devInfo = getDeviceInfo()
    console.log(JSON.stringify(devInfo, null, 4));
}
