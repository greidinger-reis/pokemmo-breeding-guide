import { html } from 'lit'

export function index() {
	return html`<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<script src="/index.js" type="module"></script>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/themes/light.css"
			/>
			<script
				type="module"
				src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/shoelace.js"
			></script>
			<link rel="stylesheet" href="styles.css"></link>
		</head>
		<body>
			<final-pokemon-node-form>
				<final-pokemon-node-ivs></final-pokemon-node-ivs>
			</final-pokemon-node-form>
			<example-element></example-element>
		</body>
	</html> `
}
