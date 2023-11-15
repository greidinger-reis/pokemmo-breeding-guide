import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { config } from './config'
import { TemplateResult } from 'lit'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result'
import { rootLayout } from './views/layout'
import { indexPage } from './views'

new Elysia()
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
	.derive(({ set }) => {
		return {
			litResponse: (template: TemplateResult) => {
				set.headers['Content-Type'] = 'text/html'
				const res = render(template)
				return collectResultSync(res)
			},
		}
	})
	.get('/', async ({ litResponse }) => {
		return litResponse(rootLayout(indexPage()))
	})
	.get('/foo', ({ litResponse }) => litResponse(rootLayout(indexPage())))
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
