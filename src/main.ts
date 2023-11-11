import { Elysia } from "elysia"
import { staticPlugin } from "@elysiajs/static"

await Bun.build({
	entrypoints: ['src/components/index.ts'],
	outdir: 'assets',
	target: 'browser',
})

const app = new Elysia()

app.use(staticPlugin({
	assets: 'assets',
	prefix: '/'
}))

app.get("/", () => Bun.file('index.html')).listen(3000, (ctx) => {
	console.log('Server listenting on port: ' + ctx.port)
})

