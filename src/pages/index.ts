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
			<example-element></example-element>
			<another-element></another-element>
		</body>
	</html> `
}
