import { consume, provide } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { FinalPokemonNodeContext } from '.'
import { PokemonBreedTreeNode } from '../core/tree'
import { Option, Some } from 'ts-results'
import { Pokemon, PokemonEggGroup, PokemonGender, PokemonIv, PokemonNature, PokemonType } from '../core/pokemon'

@customElement('final-pokemon-node-form')
class FinalPokemonNodeForm extends LitElement {
	@provide({ context: FinalPokemonNodeContext })
	@property({ attribute: false, type: Object })
	finalPokemonNode: Option<PokemonBreedTreeNode>

	render() {
		return html`
			<div>
				<h2>Final Pokemon Node Form</h2>
				<pre>${JSON.stringify(this.finalPokemonNode, null, 4)}</pre>
				<slot></slot>
			</div>
		`
	}
}

@customElement('final-pokemon-node-ivs')
class FinalPokemonNodeIvs extends LitElement {
	@consume({ context: FinalPokemonNodeContext })
	finalPokemonNode: Option<PokemonBreedTreeNode>

	DEBUGsetFinalPokemonNode() {
		const node = new PokemonBreedTreeNode({
			ivs: Some([PokemonIv.HP, PokemonIv.Attack]),
			gender: Some(PokemonGender.Female),
			nature: Some(PokemonNature.Modest),
			pokemon: Some(
				new Pokemon(
					6,
					'Charizard',
					[PokemonType.Fire, Some(PokemonType.Flying)],
					[PokemonEggGroup.Dragon, Some(PokemonEggGroup.Monster)],
					87.5,
				),
			),
		})

		this.finalPokemonNode = Some(node)
		console.log(this.finalPokemonNode)
	}

	render() {
		return html`
			<div>
				<button @click=${this.DEBUGsetFinalPokemonNode}>Set Final Pokemon Node</button>
			</div>
		`
	}
}

export { FinalPokemonNodeForm, FinalPokemonNodeIvs }

