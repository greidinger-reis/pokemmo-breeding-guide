/**
 * Usage:
 * let args = ['--input', 'foo', '--output', 'bar']
 * let parsed = new ArgsParser(args)
 * console.log(parsed.input) // foo
 * console.log(parsed.output) //output
 * */
export class ArgsParser {
	private args: { [key: string]: string } = {}

	constructor(rawArgs: string[]) {
		this.parseArgs(rawArgs)
		return new Proxy(this, {
			get: (target, property) => (property in this.args ? this.args[property] : undefined),
		})
	}

	private parseArgs(rawArgs: string[]): void {
		let currentKey: string | null = null

		for (const arg of rawArgs) {
			if (arg.startsWith('--')) {
				currentKey = arg.slice(2)
				this.args[currentKey] = ''
			} else if (currentKey !== null) {
				this.args[currentKey] = arg
				currentKey = null
			}
		}
	}
}

