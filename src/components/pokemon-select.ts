import { customElement, property } from 'lit/decorators.js'
import { PokemonBreedTreeNode } from '../core/tree'
import { LitElement, css, html } from 'lit'

@customElement('final-pokemon-node-form')
class FinalPokemonNodeForm extends LitElement {
	@property({
		attribute: false,
		type: Object,
	})

	finalPokemonNode: PokemonBreedTreeNode = PokemonBreedTreeNode.default()

	setFinalPokemon = (node: PokemonBreedTreeNode) => {
		this.finalPokemonNode = node
	}

	test: string
	
	static styles = css`
		.radio-group {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border: 1px solid black;
		}
	`

	render() {
		return html`
			<div>
				<h2>Final Pokemon Node Form</h2>
				<div class="radio-group">
					${[2,3,4,5].map(
						(count) => html`
							<input type="radio" name="iv-count" />
							<label>${count}</label>
						`,
					)}
				</div>
			</div>
		`
	}
}

export { FinalPokemonNodeForm }
