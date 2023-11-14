import { Option, Some } from "ts-results"

/**
 * Usage:
 * let args = ['--input', 'foo', '--output', 'bar']
 * let parsed = new ArgsParser(args)
 * console.log(parsed.input) // foo
 * console.log(parsed.output) //output
 * */
class ArgsParser {
	private args = new Map<string, string | boolean>()

	constructor(rawArgs: string[]) {
		this.parseArgs(rawArgs)
	}

	get(arg: string): Option<string | boolean> {
		if this.args.has(arg) {
			return Some(this.args.get(arg))
		}

		return None
	}

	private parseArgs(rawArgs: string[]): void {
		let currentKey: string | null = null

		for (const arg of rawArgs) {
			if (arg.startsWith('--')) {
				currentKey = arg.slice(2)
				this.args.set(currentKey, arg)
			} else if (currentKey !== null) {
				if (arg.startsWith('--')) {
					// If the next argument starts with "--", treat it as a new key
					currentKey = arg.slice(2)
					this.args.set(currentKey, arg)
				} else {
					// If the value is not explicitly provided, set it to true
					this.args.set(currentKey, true)
					currentKey = null
				}
			}
		}
	}
}

export {ArgsParser}
