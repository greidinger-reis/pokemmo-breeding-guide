import { config } from './config'

export async function buildComponents() {
	const start = Date.now()
	await Bun.build({
		entrypoints: ['src/index.ts'],
		outdir: 'assets',
		target: 'browser',
		minify: config.env.NODE_ENV === 'production',
	})
		.then(() => console.log(`🦊 Compiled Components - ${Date.now() - start}ms`))
		.catch(console.error)
}
