import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result'
import { index } from './pages'
import { config } from './config'

// async function triggerLiveReload() {
// 	await fetch("http://localhost:3001/restart")
// 	console.log("🦊 Triggering Live Reload")
// }

// async function buildComponents() {
// 	await Bun.build({
// 		entrypoints: ['src/components/index.ts'],
// 		outdir: 'assets',
// 		target: 'browser',
// 	})
// 	console.log('🦊 Built Lit Components')
// }
//
// await buildComponents()
//
// if (config.env.NODE_ENV === "development") await triggerLiveReload()

new Elysia()
	.use(
		staticPlugin({
			assets: 'assets',
			prefix: '/',
		}),
	)
	.get('/', (ctx) => {
		ctx.set.headers['Content-Type'] = 'text/html'

		const indexTmpl = index('Pokemmo Breeding Guide')
		const result = render(indexTmpl)
		const collected = collectResultSync(result)

		console.log({ indexTmpl, result, collected })
		return collected
	})
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
