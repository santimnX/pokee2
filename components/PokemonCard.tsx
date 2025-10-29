import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getPokemonColor, formatPokemonNumber, getPokemonImage, typeTranslations } from '../utils/pokemonUtils';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const mainColor = getPokemonColor(pokemon.types);
  const lighterColor = mainColor + '80';

  return (
    <TouchableOpacity
      onPress={() => router.push(`/pokemon/${pokemon.id}`)}
      className="m-2 rounded-3xl overflow-hidden shadow-lg"
      style={{ width: 165, height: 200 }}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[mainColor, lighterColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 p-4"
      >
        {/* Número */}
        <Text className="text-white text-xs font-bold opacity-70">
          {formatPokemonNumber(pokemon.id)}
        </Text>

        {/* Imagen */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={{ uri: getPokemonImage(pokemon.id) }}
            className="w-28 h-28"
            resizeMode="contain"
          />
        </View>

        {/* Nombre */}
        <Text className="text-white text-lg font-bold capitalize mb-1">
          {pokemon.name}
        </Text>

        {/* Tipos */}
        <View className="flex-row flex-wrap">
          {pokemon.types.map((typeInfo, index) => (
            <View
              key={index}
              className="bg-white bg-opacity-30 rounded-full px-3 py-1 mr-1 mb-1"
            >
              <Text className="text-white text-xs font-semibold">
                {typeTranslations[typeInfo.type.name]}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}