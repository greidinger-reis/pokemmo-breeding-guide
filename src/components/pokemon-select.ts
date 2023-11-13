import { customElement, property } from 'lit/decorators.js'
import { PokemonBreedTreeNode } from '../core/tree'
import { LitElement, css, html } from 'lit'
import { PokemonIv } from '..'
import { None, Option, Some } from 'ts-results'

type CurrentIvSelection = {
	value: PokemonIv
	selected: boolean
}

@customElement('final-pokemon-node-form')
class FinalPokemonNodeForm extends LitElement {
	@property({
		attribute: false,
		type: Object,
	})
	finalPokemonNode: Option<PokemonBreedTreeNode> = None

	@property({
		attribute: false,
		type: Array,
	})
	currentIvSelection: CurrentIvSelection[] = PokemonBreedTreeNode.default_ivs.slice(0, -1).map((iv, i) => ({
		value: iv,
		selected: [0, 1].includes(i),
	}))

	setFinalPokemon = (node: PokemonBreedTreeNode) => {
		this.finalPokemonNode = Some(node)
	}

	handleIvCountChange = (e: CustomEvent) => {
		//@ts-ignore
		const value = Number(e.currentTarget?.value)

		for (let i = 0; i < this.currentIvSelection.length; i++) {
			this.currentIvSelection[i].selected = i < value
		}

		this.requestUpdate()
	}

	handleIvSelectChange = (e: CustomEvent) => {
		//@ts-ignore
		const [index, iv] = e.currentTarget?.value.split(':') as [string, PokemonIv]

		this.currentIvSelection[Number(index)].value = iv
	}

	static styles = css``

	render() {
		return html`
			<div>
				<h2>Final Pokemon Node Form</h2>
				<div>
					<label for="radio-iv-count">IV Count</label>
					<sl-radio-group
						class="radio-iv-count"
						@sl-change=${this.handleIvCountChange}
						name="radio-iv-count"
						value="2"
					>
						${[2, 3, 4, 5].map(
							(count) => html` <sl-radio-button value="${count}">${count}</sl-radio-button> `,
						)}
					</sl-radio-group>
					<div class="ivs-select-container">
						${this.currentIvSelection.map((iv,i) =>
							iv.selected
								? html`
										<sl-select @sl-change=${this.handleIvSelectChange} value=${`${i}:${iv.value}`}>
											${PokemonBreedTreeNode.default_ivs.map(
												(iv) => html` <sl-option value=${`${i}:${iv}`}>${iv}</sl-option> `,
											)}
										</sl-select>
								  `
								: null,
						)}
					</div>
					<sl-button @click=${() => console.log(this.currentIvSelection)}>Debug</sl-button>
				</div>
			</div>
		`
	}
}

export { FinalPokemonNodeForm }
