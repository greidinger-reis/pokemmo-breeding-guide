import { createContext } from '@lit/context'
import { PokemonBreedTreeNode } from '../core/tree'
import { Option } from 'ts-results'

const FinalPokemonNodeContext = createContext<Option<PokemonBreedTreeNode>>('final-pokemon-node')

export { FinalPokemonNodeContext }
