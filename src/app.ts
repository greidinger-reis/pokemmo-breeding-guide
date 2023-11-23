import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { config } from './config'
import { html } from 'lit'
import { layout } from './components/layout'
import { context } from './context'
import './web/components'

const app = new Elysia()
	.use(
		staticPlugin({
			assets: 'public',
			prefix: '/',
			headers:
				config.env.NODE_ENV === 'production'
					? {
						'Content-Encoding': 'gzip',
					}
					: {},
		}),
	)
	.use(context)
	.get('/', async (ctx) => {
		return ctx.render(layout(html`<final-pokemon-node-form></final-pokemon-node-form>`))
	})
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))

export type App = typeof app
