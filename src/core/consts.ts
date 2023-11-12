import { Option, Some, None } from 'ts-results'
import { BreedTreePosition, PokemonBreederKind, PokemonBreedTreeLastRowPositions } from './tree'

export type GenderlessPokemonEvolutionTree = Readonly<[number, number, Option<number>]>

export const MAGNEMITE_TREE: GenderlessPokemonEvolutionTree = [81, 82, Some(462)]
export const STARYU_TREE: GenderlessPokemonEvolutionTree = [120, 121, None]
export const BRONZOR_TREE: GenderlessPokemonEvolutionTree = [436, 437, None]
export const BELDUM_TREE: GenderlessPokemonEvolutionTree = [374, 375, Some(376)]
export const BALTOY_TREE: GenderlessPokemonEvolutionTree = [343, 344, None]
export const VOLTORB_TREE: GenderlessPokemonEvolutionTree = [100, 101, None]
export const PORYGON_TREE: GenderlessPokemonEvolutionTree = [137, 233, Some(474)]
export const KLINK_TREE: GenderlessPokemonEvolutionTree = [599, 600, Some(601)]
export const GOLETT_TREE: GenderlessPokemonEvolutionTree = [622, 623, None]

export type GenderlessPokemonEvolutionTreeMapping = Readonly<Record<number, GenderlessPokemonEvolutionTree>>

export const GENDERLESS_POKEMON_EVOLUTION_TREE: GenderlessPokemonEvolutionTreeMapping = {
	81: MAGNEMITE_TREE,
	82: MAGNEMITE_TREE,
	462: MAGNEMITE_TREE,
	120: STARYU_TREE,
	121: STARYU_TREE,
	436: BRONZOR_TREE,
	437: BRONZOR_TREE,
	374: BELDUM_TREE,
	375: BELDUM_TREE,
	376: BELDUM_TREE,
	343: BALTOY_TREE,
	344: BALTOY_TREE,
	100: VOLTORB_TREE,
	101: VOLTORB_TREE,
	137: PORYGON_TREE,
	233: PORYGON_TREE,
	474: PORYGON_TREE,
	599: KLINK_TREE,
	600: KLINK_TREE,
	601: KLINK_TREE,
	622: GOLETT_TREE,
	623: GOLETT_TREE,
}

export type LastRowMapping = Readonly<Record<number, PokemonBreedTreeLastRowPositions>>

// This type represents what the last row of pokemon iv's should be, depending on the nr of generations
export const POKEMON_BREEDTREE_LASTROW_MAPPING: LastRowMapping = {
	2: {
		natured: new Map([
			[new BreedTreePosition(2, 0), PokemonBreederKind.Nature],
			[new BreedTreePosition(2, 1), PokemonBreederKind.A],
			[new BreedTreePosition(2, 2), PokemonBreederKind.A],
			[new BreedTreePosition(2, 3), PokemonBreederKind.B],
		]),
		natureless: new Map([
			[new BreedTreePosition(1, 0), PokemonBreederKind.A],
			[new BreedTreePosition(1, 1), PokemonBreederKind.B],
		]),
	},
	3: {
		natured: new Map([
			[new BreedTreePosition(3, 0), PokemonBreederKind.Nature],
			[new BreedTreePosition(3, 1), PokemonBreederKind.A],
			[new BreedTreePosition(3, 2), PokemonBreederKind.A],
			[new BreedTreePosition(3, 3), PokemonBreederKind.B],
			[new BreedTreePosition(3, 4), PokemonBreederKind.A],
			[new BreedTreePosition(3, 5), PokemonBreederKind.B],
			[new BreedTreePosition(3, 6), PokemonBreederKind.A],
			[new BreedTreePosition(3, 7), PokemonBreederKind.B],
		]),
		natureless: new Map([
			[new BreedTreePosition(2, 0), PokemonBreederKind.A],
			[new BreedTreePosition(2, 1), PokemonBreederKind.B],
			[new BreedTreePosition(2, 2), PokemonBreederKind.A],
			[new BreedTreePosition(2, 3), PokemonBreederKind.C],
		]),
	},
	4: {
		natured: new Map([
			[new BreedTreePosition(4, 0), PokemonBreederKind.Nature],
			[new BreedTreePosition(4, 1), PokemonBreederKind.A],
			[new BreedTreePosition(4, 2), PokemonBreederKind.A],
			[new BreedTreePosition(4, 3), PokemonBreederKind.B],
			[new BreedTreePosition(4, 4), PokemonBreederKind.A],
			[new BreedTreePosition(4, 5), PokemonBreederKind.B],
			[new BreedTreePosition(4, 6), PokemonBreederKind.A],
			[new BreedTreePosition(4, 7), PokemonBreederKind.C],
			[new BreedTreePosition(4, 8), PokemonBreederKind.A],
			[new BreedTreePosition(4, 9), PokemonBreederKind.B],
			[new BreedTreePosition(4, 10), PokemonBreederKind.A],
			[new BreedTreePosition(4, 11), PokemonBreederKind.C],
			[new BreedTreePosition(4, 12), PokemonBreederKind.B],
			[new BreedTreePosition(4, 13), PokemonBreederKind.C],
			[new BreedTreePosition(4, 14), PokemonBreederKind.B],
			[new BreedTreePosition(4, 15), PokemonBreederKind.D],
		]),
		natureless: new Map([
			[new BreedTreePosition(3, 0), PokemonBreederKind.A],
			[new BreedTreePosition(3, 1), PokemonBreederKind.B],
			[new BreedTreePosition(3, 2), PokemonBreederKind.A],
			[new BreedTreePosition(3, 3), PokemonBreederKind.C],
			[new BreedTreePosition(3, 4), PokemonBreederKind.B],
			[new BreedTreePosition(3, 5), PokemonBreederKind.C],
			[new BreedTreePosition(3, 6), PokemonBreederKind.B],
			[new BreedTreePosition(3, 7), PokemonBreederKind.D],
		]),
	},
	5: {
		natured: new Map([
			[new BreedTreePosition(5, 0), PokemonBreederKind.A],
			[new BreedTreePosition(5, 1), PokemonBreederKind.B],
			[new BreedTreePosition(5, 2), PokemonBreederKind.A],
			[new BreedTreePosition(5, 3), PokemonBreederKind.C],
			[new BreedTreePosition(5, 4), PokemonBreederKind.B],
			[new BreedTreePosition(5, 5), PokemonBreederKind.C],
			[new BreedTreePosition(5, 6), PokemonBreederKind.B],
			[new BreedTreePosition(5, 7), PokemonBreederKind.D],
			[new BreedTreePosition(5, 8), PokemonBreederKind.B],
			[new BreedTreePosition(5, 9), PokemonBreederKind.C],
			[new BreedTreePosition(5, 10), PokemonBreederKind.B],
			[new BreedTreePosition(5, 11), PokemonBreederKind.D],
			[new BreedTreePosition(5, 12), PokemonBreederKind.C],
			[new BreedTreePosition(5, 13), PokemonBreederKind.D],
			[new BreedTreePosition(5, 14), PokemonBreederKind.C],
			[new BreedTreePosition(5, 15), PokemonBreederKind.E],
			[new BreedTreePosition(5, 16), PokemonBreederKind.Nature],
			[new BreedTreePosition(5, 17), PokemonBreederKind.B],
			[new BreedTreePosition(5, 18), PokemonBreederKind.B],
			[new BreedTreePosition(5, 19), PokemonBreederKind.C],
			[new BreedTreePosition(5, 20), PokemonBreederKind.B],
			[new BreedTreePosition(5, 21), PokemonBreederKind.C],
			[new BreedTreePosition(5, 22), PokemonBreederKind.B],
			[new BreedTreePosition(5, 23), PokemonBreederKind.D],
			[new BreedTreePosition(5, 24), PokemonBreederKind.B],
			[new BreedTreePosition(5, 25), PokemonBreederKind.C],
			[new BreedTreePosition(5, 26), PokemonBreederKind.B],
			[new BreedTreePosition(5, 27), PokemonBreederKind.D],
			[new BreedTreePosition(5, 28), PokemonBreederKind.C],
			[new BreedTreePosition(5, 29), PokemonBreederKind.D],
			[new BreedTreePosition(5, 30), PokemonBreederKind.C],
			[new BreedTreePosition(5, 31), PokemonBreederKind.E],
		]),
		natureless: new Map([
			[new BreedTreePosition(4, 0), PokemonBreederKind.A],
			[new BreedTreePosition(4, 1), PokemonBreederKind.B],
			[new BreedTreePosition(4, 2), PokemonBreederKind.A],
			[new BreedTreePosition(4, 3), PokemonBreederKind.C],
			[new BreedTreePosition(4, 4), PokemonBreederKind.B],
			[new BreedTreePosition(4, 5), PokemonBreederKind.C],
			[new BreedTreePosition(4, 6), PokemonBreederKind.B],
			[new BreedTreePosition(4, 7), PokemonBreederKind.D],
			[new BreedTreePosition(4, 8), PokemonBreederKind.B],
			[new BreedTreePosition(4, 9), PokemonBreederKind.C],
			[new BreedTreePosition(4, 10), PokemonBreederKind.B],
			[new BreedTreePosition(4, 11), PokemonBreederKind.D],
			[new BreedTreePosition(4, 12), PokemonBreederKind.C],
			[new BreedTreePosition(4, 13), PokemonBreederKind.D],
			[new BreedTreePosition(4, 14), PokemonBreederKind.C],
			[new BreedTreePosition(4, 15), PokemonBreederKind.E],
		]),
	},
}
