import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result";
import Elysia from "elysia";
import { HTMLTemplateResult } from "lit";

export const context = new Elysia({ name: "@app/context" })
	.decorate('render', async (template: HTMLTemplateResult) =>
		new Response(await collectResult(render(template)), {
			headers: { 'Content-Type': 'text/html' }
		})
	)
