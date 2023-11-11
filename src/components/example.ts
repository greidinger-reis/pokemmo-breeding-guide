import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('example-element')
export class MyElement extends LitElement {
	render() {
		return html` <div>
			<h1>Hello, World!</h1>
			<p>This is my element</p>
			<p>this is another p tag mofo!</p>
			<p>Test live reload!</p>
		</div>`
	}
}
