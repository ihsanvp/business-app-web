export enum DeviceOS {
    Linux = 'linux',
    Mac = 'mac',
    Unknown = 'unknown',
    Windows = 'windows'
}

export enum DeviceIdentifier {
    Windows = "setup.exe",
    Mac = ".dmg",
    Linux = ".Appimage"
}

const isMobileDevice = (userAgent: string): boolean => {
    const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
    return regexs.some((b) => userAgent.match(b))
}

const isTabletDevice = (userAgent: string): boolean => {
    const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
    return regex.test(userAgent.toLowerCase())
}

const isDesktopDevice = (userAgent: string): boolean => !isMobileDevice(userAgent) && !isTabletDevice(userAgent)

export function getDeviceOS(userAgent: string): DeviceOS {
    if (isDesktopDevice(userAgent)) {
        if (userAgent.indexOf('Win') !== -1) return DeviceOS.Windows
        else if (userAgent.indexOf('Mac') !== -1) return DeviceOS.Mac
        else if (userAgent.indexOf('Linux') !== -1) return DeviceOS.Linux

        return DeviceOS.Unknown
    } else return DeviceOS.Unknown
}
export function getDeviceIdentifier(device: DeviceOS) {
    if (device == DeviceOS.Windows) return DeviceIdentifier.Windows
    else if (device == DeviceOS.Mac) return DeviceIdentifier.Mac
    else if (device == DeviceOS.Linux) return DeviceIdentifier.Linux
    else return undefined
}