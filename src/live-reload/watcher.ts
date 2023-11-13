import { watch } from "fs"
import { buildComponents } from "../build"
import { config } from "../config"

export function setupComponentsWatcher(){
	if (config.env.NODE_ENV !== 'development') return

	const watcher = watch('src/components', { recursive: true }, async (event, filename) => {
		await buildComponents()
		await fetch('http://localhost:3001/restart')

		console.log('🦊 Triggering Live Reload')
	})
}
