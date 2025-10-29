// Tipos de datos para Pokémon

export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: PokemonSprites;
    height?: number;
    weight?: number;
    abilities?: PokemonAbility[];
    stats?: PokemonStat[];
    species?: {
      url: string;
    };
  }
  
  export interface PokemonSpecies {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
    genera: {
      genus: string;
      language: {
        name: string;
      };
    }[];
  }
  
  export type PokemonTypeName = 
    | 'normal' | 'fire' | 'water' | 'electric' | 'grass' 
    | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying'
    | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon'
    | 'dark' | 'steel' | 'fairy';