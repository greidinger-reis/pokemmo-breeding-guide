import fs from 'fs/promises'
import { config } from './config'

export async function gzipAssets(){
	if (config.env.NODE_ENV !== 'production') return

	const assetsRaw = await fs.readdir('./assets')
	const assets = assetsRaw.filter((asset) => asset.endsWith('.js') || asset.endsWith('.css'))

	for (const asset of assets) {
		const file = Bun.file(`./assets/${asset}`)
		const buffer = await file.arrayBuffer()
		const gzipped = Bun.gzipSync(new Uint8Array(buffer))
		await Bun.write(`./assets/${asset}`, gzipped)
	}
}
