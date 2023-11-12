import { html } from 'lit'

export function index() {
	return html`<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="stylesheet" href="/styles.css" />
			<script src="/index.js" type="module"></script>
		</head>
		<body class="h-screen">
			<final-pokemon-node-form>
				<final-pokemon-node-ivs></final-pokemon-node-ivs>
			</final-pokemon-node-form>
			<example-element></example-element>
		</body>
	</html> `
}
