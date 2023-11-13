import { watch } from "fs"
import { buildComponents } from "../build"
import { config } from "../config"

export function setupComponentsWatcher(){
	if (config.env.NODE_ENV !== 'development') return

	let reloadCount = 0

	watch('src/components', { persistent: false, }, async (event, filename) => {
		reloadCount++
		await buildComponents()
		await fetch('http://localhost:3001/restart')

		console.log(`🦊 Triggering Live Reload. Reload count: ${reloadCount}`)
	})
}
