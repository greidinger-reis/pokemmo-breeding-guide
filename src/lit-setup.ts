import fs from 'fs'
import { minify } from 'csso'
import { config } from './config'
import minimist from 'minimist'

function parseArgs(): [string, string, boolean] {
	const argv = Bun.argv.slice(2)
	const args = minimist(argv, {
		boolean: 'watch',
		default: {
			watch: false,
		},
	})

	let input = args['input'] as string | undefined
	let output = args['output'] as string | undefined
	let watch = args['watch'] as boolean

	if (!input || !output) {
		throw new Error('Usage: twlit --input <file> --output <file>')
	}

	return [input, output, watch]
}

class LitSetup {
	constructor(stylesInput: string, stylesOutput: string, devMode: boolean) {
		this.setupCustomElements(devMode)
		this.setupStyles(stylesInput, stylesOutput, devMode)
	}

	async buildCustomElements() {
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

	async setupCustomElements(dev: boolean) {
		await this.buildCustomElements()

		if (dev) {
			let reloadCount = 0
			fs.watch('src/components', { persistent: false }, async () => {
				reloadCount++
				await this.buildCustomElements()
				await fetch('http://localhost:3001/restart')

				console.log(`🦊 Triggering Live Reload. Reload count: ${reloadCount}`)
			})
		}
	}

	async parseAndWriteStyles(input: string, output: string) {
		let contents = await Bun.file(input)
			.text()
			.catch(() => {
				console.log(`Failed to read file ${input}. Might just not be created yet? retrying..`)
				return ''
			})

		let cleanContents = contents.replaceAll('`', '')
		cleanContents = cleanContents.replaceAll('\\', '\\\\')
		if (config.env.NODE_ENV === 'production') {
			cleanContents = minify(cleanContents).css
		}

		const litContents = `import { css } from "lit";\nexport const TWStyles = css\` ${cleanContents} \``

		await Bun.write(output, litContents)
			.then(() => console.log(`🦊 Tw-Lit: Wrote to file ${output}`))
			.catch(console.error)
	}

	async setupStyles(input: string, output: string, dev: boolean) {
		await this.parseAndWriteStyles(input, output)

		if (dev) {
			console.log(`🦊 Tw-lit: Watching ${input} and writing to ${output}`)
			fs.watchFile(input, { interval: 1000 }, async () => {
				await this.parseAndWriteStyles(input, output)
			})
		}
	}
}

const [input, output, dev] = parseArgs()
new LitSetup(input, output, dev)
