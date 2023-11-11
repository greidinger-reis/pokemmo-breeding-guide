import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result'
import { index } from './pages'
import { buildComponents } from './components/build'

await buildComponents()

new Elysia()
	.use(
		staticPlugin({
			assets: 'assets',
			prefix: '/',
		}),
	)
	.get('/', (ctx) => {
		ctx.set.headers['Content-Type'] = 'text/html'

		return collectResultSync(render(index()))
	})
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
