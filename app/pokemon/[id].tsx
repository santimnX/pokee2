import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { 
  getPokemonColor, 
  formatPokemonNumber, 
  getPokemonImage, 
  typeTranslations,
  statTranslations
} from '../../utils/pokemonUtils';
import { Pokemon, PokemonSpecies } from '../../types/pokemon';

const { width } = Dimensions.get('window');

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  const fetchPokemonDetails = async () => {
    try {
      setLoading(true);
      
      // Obtener datos del Pokémon
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData: Pokemon = await pokemonResponse.json();
      
      // Obtener datos de la especie (para descripción)
      const speciesResponse = await fetch(pokemonData.species!.url);
      const speciesData: PokemonSpecies = await speciesResponse.json();

      setPokemon(pokemonData);
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPokemon = (newId: number) => {
    if (newId > 0 && newId <= 151) {
      router.setParams({ id: newId.toString() });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading || !pokemon) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#EF4444" />
        <Text className="mt-4 text-gray-600">Cargando Pokémon...</Text>
      </View>
    );
  }

  const mainColor = getPokemonColor(pokemon.types);
  const lighterColor = mainColor + '40';

  // Obtener descripción en español o inglés
  const description = species?.flavor_text_entries?.find(
    entry => entry.language.name === 'es' || entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') || 'No hay descripción disponible.';

  // Obtener categoría
  const category = species?.genera?.find(
    g => g.language.name === 'es' || g.language.name === 'en'
  )?.genus || 'Pokémon';

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header con gradiente y navegación */}
        <LinearGradient
          colors={[mainColor, lighterColor]}
          className="pb-8 pt-16 px-6"
        >
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="bg-white bg-opacity-30 p-2 rounded-full"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={toggleFavorite}
              className="bg-white bg-opacity-30 p-2 rounded-full"
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>

          {/* Número y nombre */}
          <Text className="text-white text-lg font-bold opacity-80">
            {formatPokemonNumber(pokemon.id)}
          </Text>
          <Text className="text-white text-5xl font-bold capitalize mt-1">
            {pokemon.name}
          </Text>
          <Text className="text-white text-sm opacity-90 mt-1">
            {category}
          </Text>

          {/* Tipos */}
          <View className="flex-row mt-4">
            {pokemon.types.map((typeInfo, index) => (
              <View
                key={index}
                className="bg-white bg-opacity-30 rounded-full px-5 py-2 mr-2"
              >
                <Text className="text-white font-bold text-base">
                  {typeTranslations[typeInfo.type.name]}
                </Text>
              </View>
            ))}
          </View>

          {/* Imagen centrada */}
          <View className="items-center mt-6">
            <Image
              source={{ uri: getPokemonImage(pokemon.id) }}
              style={{ width: width * 0.65, height: width * 0.65 }}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        {/* Contenido inferior */}
        <View className="bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-20">
          {/* Descripción */}
          <Text className="text-gray-700 text-base leading-6 mb-6">
            {description}
          </Text>

          {/* Estadísticas principales en tarjetas */}
          <View className="flex-row justify-around mb-6">
            <View className="items-center bg-red-50 rounded-2xl px-6 py-4 flex-1 mr-2">
              <View className="flex-row items-center mb-2">
                <Ionicons name="scale-outline" size={22} color="#EF4444" />
                <Text className="ml-2 text-gray-600 text-sm font-semibold">Peso</Text>
              </View>
              <Text className="text-gray-800 text-2xl font-bold">
                {(pokemon.weight! / 10).toFixed(1)} kg
              </Text>
            </View>

            <View className="items-center bg-blue-50 rounded-2xl px-6 py-4 flex-1 ml-2">
              <View className="flex-row items-center mb-2">
                <Ionicons name="resize-outline" size={22} color="#3B82F6" />
                <Text className="ml-2 text-gray-600 text-sm font-semibold">Altura</Text>
              </View>
              <Text className="text-gray-800 text-2xl font-bold">
                {(pokemon.height! / 10).toFixed(1)} m
              </Text>
            </View>
          </View>

          {/* Habilidades */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="flash-outline" size={22} color="#F59E0B" />
              <Text className="ml-2 text-gray-800 text-xl font-bold">
                Habilidades
              </Text>
            </View>
            <View className="flex-row flex-wrap">
              {pokemon.abilities!.map((ability, index) => (
                <View
                  key={index}
                  className="bg-amber-50 rounded-xl px-4 py-3 mr-2 mb-2 border border-amber-200"
                >
                  <Text className="text-amber-900 font-semibold capitalize">
                    {ability.ability.name.replace('-', ' ')}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Estadísticas base */}
          <View>
            <View className="flex-row items-center mb-4">
              <Ionicons name="stats-chart-outline" size={22} color="#8B5CF6" />
              <Text className="ml-2 text-gray-800 text-xl font-bold">
                Estadísticas Base
              </Text>
            </View>
            {pokemon.stats!.map((stat, index) => {
              const percentage = (stat.base_stat / 255) * 100;

              return (
                <View key={index} className="mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600 font-semibold">
                      {statTranslations[stat.stat.name]}
                    </Text>
                    <Text className="text-gray-800 font-bold text-lg">
                      {stat.base_stat}
                    </Text>
                  </View>
                  <View className="bg-gray-200 rounded-full h-3">
                    <View
                      className="h-3 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: mainColor
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botones de navegación flotantes */}
      <View className="absolute bottom-8 left-0 right-0 flex-row justify-between px-6">
        <TouchableOpacity
          onPress={() => navigateToPokemon(parseInt(id!) - 1)}
          disabled={parseInt(id!) <= 1}
          className="bg-white rounded-full p-4 shadow-2xl"
          style={{ opacity: parseInt(id!) <= 1 ? 0.4 : 1 }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={mainColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToPokemon(parseInt(id!) + 1)}
          disabled={parseInt(id!) >= 151}
          className="bg-white rounded-full p-4 shadow-2xl"
          style={{ opacity: parseInt(id!) >= 151 ? 0.4 : 1 }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={28} color={mainColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}