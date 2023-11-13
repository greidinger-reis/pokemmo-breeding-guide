import { customElement, property, state } from 'lit/decorators.js'
import { PokemonBreedTreeNode } from '../core/tree'
import { LitElement, css, html } from 'lit'
import { NumberOfPokemonBreederKind, PokemonIv, getNumberOfPokemonBreederKind } from '..'
import { None, Option, Some } from 'ts-results'
import { PokemonBreederKind } from '../core/tree'

type CurrentIvSelection = {
	value: PokemonIv
	selected: boolean
}

function pascalCaseToSpacedPascal(str: string): string {
	const spaced = str.replace(/([A-Z])/g, ' $1')
	return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

@customElement('final-pokemon-node-form')
class FinalPokemonNodeForm extends LitElement {
	@state()
	private finalPokemonNode: Option<PokemonBreedTreeNode> = None

	@state()
	private currentNumberOfPokemonPerGeneration: NumberOfPokemonBreederKind = getNumberOfPokemonBreederKind(2)

	private IndexToKind = {
		0: PokemonBreederKind.A,
		1: PokemonBreederKind.B,
		2: PokemonBreederKind.C,
		3: PokemonBreederKind.D,
		4: PokemonBreederKind.E,
	}

	@state()
	private currentIvSelection: CurrentIvSelection[] = PokemonBreedTreeNode.default_ivs.slice(0, -1).map((iv, i) => ({
		value: iv,
		selected: [0, 1].includes(i),
	}))

	@state()
	private natured = false

	private setFinalPokemon(node: PokemonBreedTreeNode) {
		this.finalPokemonNode = Some(node)
	}

	private handleIvCountChange(e: CustomEvent) {
		//@ts-ignore
		const value = Number(e.currentTarget?.value)

		for (let i = 0; i < this.currentIvSelection.length; i++) {
			this.currentIvSelection[i].selected = i < value
		}

		const generations = this.currentIvSelection.filter((iv) => iv.selected).length
		this.currentNumberOfPokemonPerGeneration = getNumberOfPokemonBreederKind(generations)

		this.requestUpdate()

		console.log(this.currentNumberOfPokemonPerGeneration)
	}

	private handleIvSelectChange(e: CustomEvent) {
		//@ts-ignore
		const [index, iv] = e.currentTarget?.value.split(':') as [string, PokemonIv]

		this.currentIvSelection[Number(index)].value = iv
	}

	private handleNaturedChange(e: CustomEvent) {
		//@ts-ignore
		this.natured = e.currentTarget?.checked
	}

	static styles = css`
		.ivs-select-container {
			display: flex;
			gap: 1rem;
		}
		.iv-select-container p {
			margin: 0;
		}
	`

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
						${[2, 3, 4, 5].map((count) => html` <sl-radio-button value="${count}">${count}</sl-radio-button> `)}
					</sl-radio-group>
					<sl-switch name="natured" @sl-change=${this.handleNaturedChange}>Natured?</sl-switch>
					<div class="ivs-select-container">
						${this.currentIvSelection.map((iv, i) =>
							iv.selected
								? html`
										<div class="iv-select-container">
											<p>
												<strong
													>${(() => {
														const value = this.currentNumberOfPokemonPerGeneration.filter(
															(n) => {
																const kind =
																	this.IndexToKind[i as keyof typeof this.IndexToKind]
																return n.kind === kind
															},
														)[0].count
														return this.natured ? value.natured : value.natureless
													})()}</strong
												>
												1x31 IV in
											</p>
											<sl-select
												@sl-change=${this.handleIvSelectChange}
												value=${`${i}:${iv.value}`}
											>
												${PokemonBreedTreeNode.default_ivs.map(
													(iv) => html`
														<sl-option value=${`${i}:${iv}`}
															>${pascalCaseToSpacedPascal(iv)}</sl-option
														>
													`,
												)}
											</sl-select>
										</div>
								  `
								: null,
						)}
					</div>
				</sl-switch>
			</div>
		`
	}
}

export { FinalPokemonNodeForm }
