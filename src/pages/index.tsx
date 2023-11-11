import Elysia from 'elysia'
import { ctx } from '../context'
import { BaseHtml } from '../views/base'

export const index = new Elysia().use(ctx).get('/', ({ html }) =>
	html(() => (
		<BaseHtml>
			<div>test</div>
			<example-element></example-element>
		</BaseHtml>
	)),
)
