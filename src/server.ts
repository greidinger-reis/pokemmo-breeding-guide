import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { buildComponents } from './build'
import { writeLiveReloadScript } from './live-reload/script'
import { setupComponentsWatcher } from './live-reload/watcher'

await buildComponents()
await writeLiveReloadScript()
setupComponentsWatcher()

new Elysia()
	.use(
		staticPlugin({
			assets: 'assets',
			prefix: '/',
		}),
	)
	.get('/', async (ctx) => {
		ctx.set.headers['Content-Type'] = 'text/html'

		const tmpl = await Bun.file('./src/pages/index.html').text()

		return tmpl
	})
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
