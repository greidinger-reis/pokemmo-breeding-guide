import { Pokemon, PokemonGender, PokemonIv, PokemonNature } from './pokemon'
import { Option, Some, None, Err, Ok, Result } from 'ts-results'
import { PokemonBreedErrorKind } from './breed'
import { POKEMON_BREEDTREE_LASTROW_MAPPING } from './consts'

/* In Pokemmo, in breeding, you can only breed a pokemon couple once.
 You lose the parents on a breed, and receive the offspring.
 That's why we need a certain number of 31IV'd pokemons, and they are represented here by a, b, c, d, e.
*/
export enum PokemonBreederKind {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E',
	Nature = 'Nature',
}

export type BreedTreePositionKey = string
export type InvalidPositionError = string

export class BreedTreePosition {
	constructor(
		public row: number,
		public col: number,
	) { }

	// If used on the first row (0,0) this will return an invalid position
	public getPartnerPosition(): BreedTreePosition {
		const partnerCol = this.col % 2 === 0 ? this.col + 1 : this.col - 1

		return new BreedTreePosition(this.row, partnerCol)
	}

	// Warn: this can return invalid positions
	// Always check if the rows returned here are bigger than the generaions nr
	public getParentPositions(): Readonly<[BreedTreePosition, BreedTreePosition]> {
		const parentRow = this.row + 1
		const parentCol = this.col * 2

		const parent1 = new BreedTreePosition(parentRow, parentCol)
		const parent2 = new BreedTreePosition(parentRow, parentCol + 1)

		return [parent1, parent2]
	}


	public static getChildPositionFromParents(parent1: BreedTreePosition, parent2: BreedTreePosition): Result<Readonly <[BreedTreePosition,BreedTreePosition]>, InvalidPositionError> {
		if (parent1.row !== parent2.row - 1) {
			return Err('Parents are not on the same row')
		}

		if (parent1.col % 2 !== 0 || parent2.col % 2 !== 1) {
			return Err('Parents are not on the same row')
		}

		const childRow = parent1.row - 1
		const childCol = parent1.col / 2

		const child1 = new BreedTreePosition(childRow, childCol)
		const child2 = new BreedTreePosition(childRow, childCol + 1)

		return Ok([child1, child2])
	}

	public key(): BreedTreePositionKey {
		return `${this.row},${this.col}`
	}

	static fromKey(key: BreedTreePositionKey): BreedTreePosition {
		const [row, col] = key.split(',').map(Number)

		return new BreedTreePosition(row, col)
	}
}

export type PokemonBreederKindPositions = ReadonlyMap<BreedTreePositionKey, PokemonBreederKind>

export type PokemonBreedTreeLastRowPositions = {
	natured: PokemonBreederKindPositions
	natureless: PokemonBreederKindPositions
}

export type PokemonBreedTreeLastRowPositionsPerGeneration = Readonly<Record<number, PokemonBreedTreeLastRowPositions>>

export class PokemonBreedTreeNode {
	public pokemon: Option<Pokemon>
	public gender: Option<PokemonGender>
	public nature: Option<PokemonNature>
	public ivs: Option<PokemonIv[]>

	constructor(args: {
		pokemon: Option<Pokemon>
		gender: Option<PokemonGender>
		nature: Option<PokemonNature>
		ivs: Option<PokemonIv[]>
	}) {
		Object.assign(this, args)
	}

	static default(): PokemonBreedTreeNode {
		return new PokemonBreedTreeNode({
			pokemon: None,
			ivs: Some([PokemonIv.HP, PokemonIv.Attack]),
			nature: None,
			gender: None,
		})
	}

	static get default_ivs(): PokemonIv[] {
		return [
			PokemonIv.HP,
			PokemonIv.Attack,
			PokemonIv.Defense,
			PokemonIv.SpecialAttack,
			PokemonIv.SpecialDefense,
			PokemonIv.Speed,
		]
	}
}

export type PokemonNodeMap = Map<BreedTreePosition, PokemonBreedTreeNode>
export type PokemonBreedErrorMap = Map<Readonly<[BreedTreePosition, BreedTreePosition]>, PokemonBreedErrorKind>
export type FinalPokemonIvMap = Map<PokemonBreederKind, PokemonIv>

export class PokemonBreedTree {
	public nodes: PokemonNodeMap = new Map()
	public breedErrors: PokemonBreedErrorMap = new Map()

	constructor(finalPokemonNode: PokemonBreedTreeNode, finalPokemonIvMap: FinalPokemonIvMap) {
		this.nodes.set(new BreedTreePosition(0, 0), finalPokemonNode)

		const natured = finalPokemonNode.nature.some
		const generations = natured
			? finalPokemonNode.ivs.expect('Final pokemon should have ivs').length + 1
			: finalPokemonNode.ivs.expect('Final pokemon should have ivs').length
		const lastRowBreeders = POKEMON_BREEDTREE_LASTROW_MAPPING[generations]

		this.initNodes(
			generations,
			natured ? lastRowBreeders.natured : lastRowBreeders.natureless,
			finalPokemonNode,
			finalPokemonIvMap,
		)
	}

	private initNodes(
		generations: number,
		lastRowBreedersPositions: PokemonBreederKindPositions,
		finalPokemonNode: PokemonBreedTreeNode,
		finalPokemonIvs: FinalPokemonIvMap,
	) {
		// initialize last row
		for (const [k, v] of lastRowBreedersPositions.entries()) {
			switch (v) {
				case PokemonBreederKind.Nature:
					this.nodes.set(
						k,
						new PokemonBreedTreeNode({
							pokemon: None,
							gender: None,
							ivs: None,
							nature: finalPokemonNode.nature,
						}),
					)
					break
				default:
					this.nodes.set(
						k,
						new PokemonBreedTreeNode({
							pokemon: None,
							gender: None,
							ivs: Some([finalPokemonIvs.get(v)!]),
							nature: None,
						}),
					)
					break
			}
		}

		// initialize the rest of the tree
		// start from the second to last row
		// stops on the first row where the final pokemon node is already set
		let row = generations - 2
		while (row > 0) {
			let col = 0
			while (col < Math.pow(2, row)) {
				const pos = new BreedTreePosition(row, col)
				const [p1Pos, p2Pos] = pos.getParentPositions()

				const invalidPositions = p1Pos.row > generations || p2Pos.row > generations
				if (invalidPositions) continue

				const p1Node = this.nodes.get(p1Pos)!
				const p2Node = this.nodes.get(p2Pos)!

				const ivs: PokemonIv[] = []
				if (p1Node.ivs.some) {
					ivs.push(...p1Node.ivs.val)
				}
				if (p2Node.ivs.some) {
					ivs.push(...p2Node.ivs.val)
				}

				let nature: Option<PokemonNature> = None

				if (p1Node.nature.some) {
					nature = p1Node.nature
				} else if (p2Node.nature.some) {
					nature = p2Node.nature
				}

				this.nodes.set(
					pos,
					new PokemonBreedTreeNode({
						pokemon: None,
						gender: None,
						nature,
						ivs: Some(ivs),
					}),
				)
				col = col + 1
			}
			row = row - 1
		}
	}
}
