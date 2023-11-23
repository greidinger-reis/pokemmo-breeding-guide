import { HTMLTemplateResult, html } from 'lit'
import { config } from '../config'

export function layout(slot: HTMLTemplateResult) {
	return html`<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Pokemmo Breeding Helper</title>
			<!-- Client bundle -->
			<script defer src="/index.js" type="module"></script>
			<!-- Shoelace styles -->
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/themes/light.css"
			/>
			<script
				type="module"
				src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/shoelace.js"
			></script>
			<!-- Style for server rendered templates -->
			<link rel="stylesheet" href="/styles.css" />
			${config.env.NODE_ENV === 'development'
				? html`
						<!-- Live reload script -->
						<script src="/live-reload.js"></script>
				  `
				: null}
		</head>
		<body>
			${slot}
		</body>
	</html>`
}
