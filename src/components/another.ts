import { LitElement, html } from "lit"
import { customElement, query, state } from "lit/decorators.js"

@customElement('another-element')
export class AnotherElement extends LitElement {
	@state()
	name: string = ''

	@query('#name')
	input!: HTMLInputElement

	setName(){
		console.log(this.input.value)
		this.name = this.input.value
	}

	render() {
		return html`
		<div>Another element</div>
		<div>Name: ${this.name}
			<input id="name" @input=${this.setName}/>
		</div>
		`
	}
}
