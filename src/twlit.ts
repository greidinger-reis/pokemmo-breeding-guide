import { ArgsParser } from './args'
import fs from 'fs'

const argv = Bun.argv

const args = new ArgsParser(argv.slice(2))

//@ts-ignore
let input: string | undefined = args.input
//@ts-ignore
let output: string | undefined = args.output

//@ts-ignore
if (!input || !output) {
	console.log('Usage: twlit --input <file> --output <file>')
	process.exit(1)
}

console.log(`🦊 Tw-lit: Watching ${input} and writing to ${output}`)

async function writeLitstyles(input: string, output: string) {
	let contents = await Bun.file(input)
		.text()
		.catch(() => {
			console.log(`Failed to read file ${input}. Might just not be created yet? retrying..`)
			return ''
		})

	let cleanContents = contents.replaceAll('`', '')
	cleanContents = cleanContents.replaceAll('\\', '\\\\')

	const litContents = `import { css } from "lit";\nexport const TWStyles = css\` ${cleanContents} \``

	await Bun.write(output, litContents)
		.catch(() => console.log(`TWLit - wrote to file ${output}`))
		.catch(console.error)
}

await writeLitstyles(input!, output!)

fs.watchFile(input, { interval: 1000 }, async () => {
	await writeLitstyles(input!, output!)
})
