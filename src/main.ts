import { Elysia } from 'elysia'
import { index } from './pages'
import staticPlugin from '@elysiajs/static'

await Bun.build({
	entrypoints: ['src/components/index.ts'],
	outdir: 'assets',
	target: 'browser',
})

const app = new Elysia().use(
	staticPlugin({
		assets: 'assets',
		prefix: '/',
	}),
).use(index).listen(3000, ({ port }) => console.log("Server running on port: " + port))
