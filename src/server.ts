import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { config } from './config'
import { gzipAssets } from './gzip'

await gzipAssets()

new Elysia()
	.use(
		staticPlugin({
			assets: 'assets',
			prefix: '/',
			headers:
				config.env.NODE_ENV !== 'production'
					? {}
					: {
							'Content-Encoding': 'gzip',
					  },
		}),
	)
	.get('/', async (ctx) => {
		ctx.set.headers['Content-Type'] = 'text/html'

		const tmpl = await Bun.file('./src/pages/index.html').text()

		return tmpl
	})
	.get('/foo', ()=> 'bar2')
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
