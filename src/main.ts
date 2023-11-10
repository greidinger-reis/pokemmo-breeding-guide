import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-element')
class MyElement extends LitElement {
	render() {
		return html` <div>
			<h1>Hello, World!</h1>
			<p>This is my element</p>
		</div>`
	}
}

console.log('Hello via Bun!')
