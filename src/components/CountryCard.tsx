import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Country} from '../types';
import {COLORS} from '../utils/constants';
import {Card} from './Card';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
  selected?: boolean;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onSelect,
  selected = false,
}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(country)} activeOpacity={0.7}>
      <Card style={selected ? styles.selectedCard : undefined}>
        <View style={styles.content}>
          <Text style={styles.flag}>{country.flag}</Text>
          <View style={styles.info}>
            <Text style={styles.name}>{country.name}</Text>
            <Text style={styles.region}>{country.region}</Text>
          </View>
          {selected && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  region: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

