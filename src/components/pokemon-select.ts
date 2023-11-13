import { customElement, property } from 'lit/decorators.js'
import { PokemonBreedTreeNode } from '../core/tree'
import { None, Option, Some } from 'ts-results'
import { Pokemon, PokemonEggGroup, PokemonGender, PokemonIv, PokemonNature, PokemonType } from '../core/pokemon'
import { LitElement, html } from 'lit'

@customElement('final-pokemon-node-form')
class FinalPokemonNodeForm extends LitElement {
	@property({ attribute: false, type: Object })
	finalPokemonNode: Option<PokemonBreedTreeNode> = None

	setFinalPokemon(e: CustomEvent<{ newpokemon: PokemonBreedTreeNode }>) {
		this.finalPokemonNode = Some(e.detail.newpokemon)
	}

	render() {
		return html`
			<div>
				<h2>Final Pokemon Node Form</h2>
				<pre>${JSON.stringify(this.finalPokemonNode, null, 4)}</pre>
				<final-pokemon-node-ivs @new-pokemon=${this.setFinalPokemon}></final-pokemon-node-ivs>
			</div>
		`
	}
}

@customElement('final-pokemon-node-ivs')
class FinalPokemonNodeIvs extends LitElement {
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

		this.dispatchEvent(
			new CustomEvent('new-pokemon', { detail: { newpokemon: node }, bubbles: true, composed: true }),
		)
	}

	render() {
		return html`
			<div>
				<sl-button @click=${this.DEBUGsetFinalPokemonNode}>Set Final Pokemon Node</sl-button>
			</div>
		`
	}
}

export { FinalPokemonNodeForm, FinalPokemonNodeIvs }
