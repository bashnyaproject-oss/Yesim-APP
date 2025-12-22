import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
import {COLORS, SAMPLE_COUNTRIES} from '../utils/constants';
import {CountryCard} from '../components/CountryCard';
import {Button} from '../components/Button';
import {MapIcon} from '../components/icons';
import {Country} from '../types';

export const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  const {setSelectedCountry} = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [routeCountries, setRouteCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(SAMPLE_COUNTRIES.map(c => c.region))
    );
    return uniqueRegions;
  }, []);

  const filteredCountries = useMemo(() => {
    let filtered = SAMPLE_COUNTRIES;

    if (selectedRegion) {
      filtered = filtered.filter(c => c.region === selectedRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedRegion]);

  const toggleCountryInRoute = (country: Country) => {
    if (routeCountries.find(c => c.id === country.id)) {
      setRouteCountries(routeCountries.filter(c => c.id !== country.id));
    } else {
      setRouteCountries([...routeCountries, country]);
    }
  };

  const isInRoute = (countryId: string) => {
    return routeCountries.some(c => c.id === countryId);
  };

  const handleCreateRoute = () => {
    if (routeCountries.length > 0) {
      // Navigate to plans with route information
      navigation.navigate('Plans' as never);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MapIcon size={32} color={COLORS.primary} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Карта стран</Text>
            <Text style={styles.subtitle}>
              Создайте маршрут путешествия
            </Text>
          </View>
        </View>
      </View>

      {routeCountries.length > 0 && (
        <View style={styles.routeBanner}>
          <Text style={styles.routeBannerText}>
            Маршрут: {routeCountries.length}{' '}
            {routeCountries.length === 1 ? 'страна' : 'стран'}
          </Text>
          <TouchableOpacity
            style={styles.clearRouteButton}
            onPress={() => setRouteCountries([])}>
            <Text style={styles.clearRouteText}>Очистить</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск страны..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedRegion && styles.filterChipActive,
            ]}
            onPress={() => setSelectedRegion(null)}>
            <Text
              style={[
                styles.filterChipText,
                !selectedRegion && styles.filterChipTextActive,
              ]}>
              Все регионы
            </Text>
          </TouchableOpacity>
          {regions.map(region => (
            <TouchableOpacity
              key={region}
              style={[
                styles.filterChip,
                selectedRegion === region && styles.filterChipActive,
              ]}
              onPress={() => setSelectedRegion(region)}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedRegion === region && styles.filterChipTextActive,
                ]}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.countriesSection}>
        <Text style={styles.sectionTitle}>
          {filteredCountries.length} {filteredCountries.length === 1 ? 'страна' : 'стран'}
        </Text>
        {filteredCountries.map(country => {
          const inRoute = isInRoute(country.id);
          return (
            <TouchableOpacity
              key={country.id}
              onPress={() => toggleCountryInRoute(country)}
              onLongPress={() => {
                setSelectedCountry(country);
                navigation.navigate('Plans' as never);
              }}>
              <CountryCard
                country={country}
                onSelect={() => {}}
                selected={inRoute}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {routeCountries.length > 0 && (
        <View style={styles.actionSection}>
          <Button
            title={`Создать маршрут (${routeCountries.length} стран)`}
            onPress={handleCreateRoute}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  routeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  routeBannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  clearRouteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  clearRouteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filters: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  countriesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

