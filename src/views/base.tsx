import { liveReloadScript } from 'beth-stack/dev'
import { type PropsWithChildren } from 'beth-stack/jsx'
import { config } from '../config'

const safeScript = config.env.NODE_ENV === 'development' ? liveReloadScript() : ''

export const BaseHtml = ({ children }: PropsWithChildren) => (
	<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>PokeMMO Breeding guide</title>
			<link rel="stylesheet" href="/styles.css" />
			<script>{safeScript}</script>
			<script src="/index.js" type="module"></script>
		</head>
		<body class="h-screen">{children}</body>
	</html>
)
