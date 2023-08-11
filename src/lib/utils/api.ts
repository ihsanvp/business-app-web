import { getDeviceOS } from "./device";

export interface AppAsset {
    name: string
    url: string
}

export async function getDownloadURL(userAgent: string): Promise<AppAsset | null> {
    try {
        const device = getDeviceOS(userAgent);
        const res = await fetch("/api/latest", {
            method: "POST",
            body: JSON.stringify({
                device,
            }),
        });
        const data = await res.json();

        return {
            url: data.url,
            name: data.name
        }
    } catch (err) {
        return null
    }
}