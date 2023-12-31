import { Option } from 'ts-results'

export enum PokemonType {
	Fire = 'Fire',
	Water = 'Water',
	Grass = 'Grass',
	Electric = 'Electric',
	Flying = 'Flying',
	Normal = 'Normal',
	Bug = 'Bug',
	Poison = 'Poison',
	Ground = 'Ground',
	Rock = 'Rock',
	Fighting = 'Fighting',
	Psychic = 'Psychic',
	Ghost = 'Ghost',
	Ice = 'Ice',
	Dragon = 'Dragon',
	Dark = 'Dark',
	Steel = 'Steel',
}

export enum PokemonNature {
	Hardy = 'Hardy',
	Lonely = 'Lonely',
	Brave = 'Brave',
	Adamant = 'Adamant',
	Naughty = 'Naughty',
	Bold = 'Bold',
	Docile = 'Docile',
	Relaxed = 'Relaxed',
	Impish = 'Impish',
	Lax = 'Lax',
	Timid = 'Timid',
	Hasty = 'Hasty',
	Serious = 'Serious',
	Jolly = 'Jolly',
	Naive = 'Naive',
	Modest = 'Modest',
	Mild = 'Mild',
	Quiet = 'Quiet',
	Bashful = 'Bashful',
	Rash = 'Rash',
	Calm = 'Calm',
	Gentle = 'Gentle',
	Sassy = 'Sassy',
	Careful = 'Careful',
	Quirky = 'Quirky',
}

export enum PokemonEggGroup {
	Monster = 'Monster',
	WaterA = 'WaterA',
	WaterB = 'WaterB',
	WaterC = 'WaterC',
	Bug = 'Bug',
	Flying = 'Flying',
	Field = 'Field',
	Fairy = 'Fairy',
	Plant = 'Plant',
	Humanoid = 'Humanoid',
	Chaos = 'Chaos',
	Ditto = 'Ditto',
	Dragon = 'Dragon',
	CannotBreed = 'CannotBreed',
	Genderless = 'Genderless',
}

export enum PokemonIv {
	HP = 'Hp',
	Attack = 'Attack',
	Defense = 'Defense',
	SpecialAttack = 'SpecialAttack',
	SpecialDefense = 'SpecialDefense',
	Speed = 'Speed',
}

export enum PokemonGender {
	Female = 'Female',
	Male = 'Male',
	Genderless = 'Genderless',
}

export class PokemonSpecies {
	constructor(
		public number: number,
		public name: string,
		public types: Readonly<[PokemonType, Option<PokemonType>]>,
		public eggGroups: Readonly<[PokemonEggGroup, Option<PokemonEggGroup>]>,
		public percentageMale: number,
	) {}

	static fromJson(data: string) {
		

	}
}
