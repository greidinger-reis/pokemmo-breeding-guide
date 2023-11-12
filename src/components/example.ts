import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

type Example = {
	id: string
	name: string;
	createdAt: Date;
}

@customElement('example-element')
class ExampleElement extends LitElement {
	@property({ type: Object })
	data: Example

	@query('#name')
	nameInput: HTMLInputElement

	@query('#createdAt')
	createdAtInput: HTMLInputElement

	setData() {
		const id = crypto.randomUUID()
		const name = this.nameInput.value
		const createdAt = new Date(this.createdAtInput.value)
		this.data = { id, name, createdAt }
	}

	render() {
		return html`
			<div>
				${JSON.stringify(this.data, null, 4)}
				<input type="text" class="input" name="name" id="name" />
				<input type="date" class="input" name="createdAt" id="createdAt" />
				<button class="btn" @click=${this.setData}>
					Submit
				</button>
			</div>
		`
	}
}

export {ExampleElement}
