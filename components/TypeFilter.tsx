import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { typeColors, typeTranslations, allTypes } from '../utils/pokemonUtils';
import { PokemonTypeName } from '../types/pokemon';

interface TypeFilterProps {
  selectedType: PokemonTypeName | null;
  onSelectType: (type: PokemonTypeName | null) => void;
}

export default function TypeFilter({ selectedType, onSelectType }: TypeFilterProps) {
  return (
    <View className="mb-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        <TouchableOpacity
          onPress={() => onSelectType(null)}
          className="mr-2 px-5 py-2.5 rounded-full shadow-sm"
          style={{
            backgroundColor: selectedType === null ? '#3B82F6' : '#F3F4F6'
          }}
        >
          <Text 
            className="font-bold text-sm"
            style={{ color: selectedType === null ? 'white' : '#6B7280' }}
          >
            Todos
          </Text>
        </TouchableOpacity>

        {allTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => onSelectType(type)}
            className="mr-2 px-5 py-2.5 rounded-full shadow-sm"
            style={{
              backgroundColor: selectedType === type ? typeColors[type] : '#F3F4F6'
            }}
          >
            <Text 
              className="font-bold text-sm capitalize"
              style={{ color: selectedType === type ? 'white' : '#6B7280' }}
            >
              {typeTranslations[type]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}