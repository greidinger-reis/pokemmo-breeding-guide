import { html } from 'lit'
import { liveReloadScript } from '../lib/live-reload-script'
import { config } from '../config'

const devScript = config.env.NODE_ENV === 'development' ? liveReloadScript() : ''

export function index(title:string) {
	return html`<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title .innerHTML=${title}></title>
			<link rel="stylesheet" href="/styles.css" />
			<script src="/index.js" type="module"></script>
			<script .innerHTML=${devScript}></script>
		</head>
		<body class="h-screen">
			<example-element></example-element>
		</body>
	</html> `
}
