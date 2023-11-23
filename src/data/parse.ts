import fs from 'node:fs'
import csv from 'csv-parser'
import { PokemonEggGroup, PokemonSpecies } from '@/client/pokemon'
import path from 'path'
import { None, Option, Some } from 'ts-results'

const skippedPokemons = [
	'Mega',
	'Partner',
	'Alolan',
	'Galarian',
	'Castform ',
	'Wormadam Sandy Cloak',
	'Wormadam Trash Cloak',
	'Wash',
	'Frost',
	'Heat',
	'Fan',
	'Mow',
	'Basculin Blue-Striped Form',
	'Darmanitan Zen Mode',
]

const fixPokemonEggGroups = {
	Nidorina: [PokemonEggGroup.Field, Some(PokemonEggGroup.Monster)],
	Nidoqueen: [PokemonEggGroup.Field, Some(PokemonEggGroup.Monster)],
	Rotom: [PokemonEggGroup.Genderless],
	Magnemite: [PokemonEggGroup.Genderless],
	Magneton: [PokemonEggGroup.Genderless],
	Magnezone: [PokemonEggGroup.Genderless],
	Staryu: [PokemonEggGroup.Genderless],
	Starmie: [PokemonEggGroup.Genderless],
	Bronzor: [PokemonEggGroup.Genderless],
	Bronzong: [PokemonEggGroup.Genderless],
	Solrock: [PokemonEggGroup.Genderless],
	Lunatone: [PokemonEggGroup.Genderless],
	Beldum: [PokemonEggGroup.Genderless],
	Metang: [PokemonEggGroup.Genderless],
	Metagross: [PokemonEggGroup.Genderless],
	Baltoy: [PokemonEggGroup.Genderless],
	Claydol: [PokemonEggGroup.Genderless],
	Voltorb: [PokemonEggGroup.Genderless],
	Electrode: [PokemonEggGroup.Genderless],
	Porygon: [PokemonEggGroup.Genderless],
	Porygon2: [PokemonEggGroup.Genderless],
	'Porygon-Z': [PokemonEggGroup.Genderless],
	Klink: [PokemonEggGroup.Genderless],
	Klang: [PokemonEggGroup.Genderless],
	Klinklang: [PokemonEggGroup.Genderless],
	Cryogonal: [PokemonEggGroup.Genderless],
	Golett: [PokemonEggGroup.Genderless],
	Golurk: [PokemonEggGroup.Genderless],
} as const

function parseEggGroup(eggGroup: string): Option<PokemonEggGroup> {
	switch (eggGroup) {
		case 'Water 1':
			return Some(PokemonEggGroup.WaterA)
		case 'Water 2':
			return Some(PokemonEggGroup.WaterB)
		case 'Water 3':
			return Some(PokemonEggGroup.WaterC)
		case 'Undiscovered':
			return Some(PokemonEggGroup.CannotBreed)
		case 'Human-Like':
			return Some(PokemonEggGroup.Humanoid)
		case '':
			return None
		default:
			return Some(eggGroup as PokemonEggGroup)
	}
}

function parseName(name: string): string {
	switch (name) {
		case 'Wormadam Plant Cloak':
			return 'Wormadam'
		case 'Basculin Red-Striped Form':
			return 'Basculin'
		case 'Darmanitan Standard Mode':
			return 'Darmanitan'
		default:
			return name
	}
}

const pokemons: Array<PokemonSpecies> = []

fs.createReadStream(path.resolve(import.meta.dir, 'pokemon_data.csv'), 'utf8')
	.pipe(
		csv({
			mapHeaders: ({ header }) => header.trim(),
		})
	)
	.on('data', (row) => {
		if (skippedPokemons.some((name) => (row['name'] as string).startsWith(name))) {
			return
		}
		const pokemon: PokemonSpecies = {
			number: parseInt(row['pokedex_number']),
			name: parseName(row['name']),
			types: [row['type_1'], row['type_2'] ? Some(row['type_2']): None],
			eggGroups: [parseEggGroup(row['egg_type_1']).unwrap(), parseEggGroup(row['egg_type_2'])],
			percentageMale: parseFloat(row['percentage_male']),
		}

		const fix = fixPokemonEggGroups[pokemon.name as keyof typeof fixPokemonEggGroups]

		if (fix) {
			//@ts-ignore
			pokemon.eggGroups[0] = fix[0]
			if (fix[1]) {
				//@ts-ignore
				pokemon.eggTypes[1] = fix[1]
			}
		}

		pokemons.push(pokemon)
	})
	.on('end', () => {
		fs.writeFileSync(path.resolve(import.meta.dir, 'data.json'), JSON.stringify(pokemons, null, 4))
	})
