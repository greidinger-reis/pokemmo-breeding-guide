import { ArgsParser } from './args'
import fs from 'fs'
import { minify } from 'csso'
import { config } from './config'

const argv = Bun.argv

const args = new ArgsParser(argv.slice(2))

//@ts-ignore
let input: string | undefined = args.input
//@ts-ignore
let output: string | undefined = args.output

let watch: boolean = args.['watch'] ?? false

//@ts-ignore
if (!input || !output) {
	console.log('Usage: twlit --input <file> --output <file>')
	process.exit(1)
}

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
		.then(() => console.log(`🦊 TWLit - wrote to file ${output}`))
		.catch(console.error)
}

await writeLitStyles(input!, output!)

if(watch){
	console.log(`🦊 Tw-lit: Watching ${input} and writing to ${output}`)
	fs.watchFile(input, { interval: 1000 }, async () => {
		await writeLitStyles(input!, output!)
	})
}
