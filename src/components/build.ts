export async function buildComponents() {
	await Bun.build({
		entrypoints: ['src/components/index.ts'],
		outdir: 'assets',
		target: 'browser',
	})
	console.log('🦊 Built Lit Components')
}
