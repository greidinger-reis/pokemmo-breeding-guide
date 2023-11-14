import fs from 'fs'
import { minify } from 'csso'
import { config } from './config'
import minimist from "minimist"

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

async function twLit() {
	const [input, output, watch] = parseArgs()

	async function writeLitStyles(input: string, output: string) {
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

	await writeLitStyles(input, output)

	if (watch) {
		console.log(`🦊 Tw-lit: Watching ${input} and writing to ${output}`)
		fs.watchFile(input, { interval: 1000 }, async () => {
			await writeLitStyles(input, output)
		})
	}
}

await twLit()
