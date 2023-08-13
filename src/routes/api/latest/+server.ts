import { DeviceOS, getDeviceIdentifier } from "$lib/utils/device";
import { getLatestRelease } from "$lib/utils/github";
import { error, json } from '@sveltejs/kit';
import { z } from "zod"

const schema = z.object({
    device: z.nativeEnum(DeviceOS)
})

/** @type {import('./$types').RequestHandler} */
export async function POST({ platform, request }) {
    try {
        const body = await request.json()
        const validated = schema.safeParse(body)

        if (!validated.success) {
            throw error(400, `Validation: ${validated.error.message}`)
        }

        const identifier = getDeviceIdentifier(validated.data.device)
        const release = await getLatestRelease()
        const asset = release.assets.find(asset => asset.name.endsWith(identifier as string))

        if (!asset) {
            throw error(400, `Asset not found for device: ${validated.data.device}`)
        }

        return json({
            url: asset.browser_download_url,
            name: asset.name
        })
    } catch (err) {
        throw error(400, String(err))
    }
}