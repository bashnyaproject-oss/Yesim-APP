import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';

const COLORS = {
  primary: '#F97316',
  background: '#FFF7ED',
  surface: '#FFFFFF',
  text: '#1C1917',
  textSecondary: '#78716C',
  border: '#FED7AA',
};

const COUNTRIES = [
  {id: '1', name: 'США', flag: '🇺🇸', region: 'Северная Америка', price: '$9.99'},
  {id: '2', name: 'Великобритания', flag: '🇬🇧', region: 'Европа', price: '£7.99'},
  {id: '3', name: 'Германия', flag: '🇩🇪', region: 'Европа', price: '€8.99'},
  {id: '4', name: 'Франция', flag: '🇫🇷', region: 'Европа', price: '€8.99'},
  {id: '5', name: 'Испания', flag: '🇪🇸', region: 'Европа', price: '€7.99'},
  {id: '6', name: 'Италия', flag: '🇮🇹', region: 'Европа', price: '€7.99'},
  {id: '7', name: 'Япония', flag: '🇯🇵', region: 'Азия', price: '$10.99'},
  {id: '8', name: 'Южная Корея', flag: '🇰🇷', region: 'Азия', price: '$9.99'},
  {id: '9', name: 'Турция', flag: '🇹🇷', region: 'Европа', price: '$6.99'},
  {id: '10', name: 'ОАЭ', flag: '🇦🇪', region: 'Ближний Восток', price: '$8.99'},
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null);

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌐 Yesim</Text>
        <Text style={styles.title}>eSIM для путешествий</Text>
        <Text style={styles.subtitle}>
          Выберите страну и получите интернет за минуты
        </Text>
      </View>

      {/* Device Compatibility */}
      <View style={styles.compatCard}>
        <Text style={styles.compatIcon}>✅</Text>
        <View style={styles.compatText}>
          <Text style={styles.compatTitle}>Ваше устройство поддерживает eSIM</Text>
          <Text style={styles.compatSubtitle}>Вы можете установить и использовать eSIM</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Поиск страны..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Countries */}
      <Text style={styles.sectionTitle}>Выберите страну</Text>
      {filteredCountries.map(country => (
        <TouchableOpacity
          key={country.id}
          style={[
            styles.countryCard,
            selectedCountry === country.id && styles.countryCardSelected,
          ]}
          onPress={() => setSelectedCountry(country.id)}>
          <Text style={styles.countryFlag}>{country.flag}</Text>
          <View style={styles.countryInfo}>
            <Text style={styles.countryName}>{country.name}</Text>
            <Text style={styles.countryRegion}>{country.region}</Text>
          </View>
          <View style={styles.countryPrice}>
            <Text style={styles.priceLabel}>от</Text>
            <Text style={styles.priceValue}>{country.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Selected country action */}
      {selectedCountry && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            Просмотреть тарифы →
          </Text>
        </TouchableOpacity>
      )}

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Почему выбирают нас?</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>⚡</Text>
          <Text style={styles.infoText}>Мгновенная активация</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🌍</Text>
          <Text style={styles.infoText}>200+ стран и регионов</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>💰</Text>
          <Text style={styles.infoText}>Лучшие цены на рынке</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>📱</Text>
          <Text style={styles.infoText}>Поддержка всех устройств</Text>
        </View>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  compatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  compatIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  compatText: {
    flex: 1,
  },
  compatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
  },
  compatSubtitle: {
    fontSize: 14,
    color: '#047857',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  countryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  countryCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF7ED',
  },
  countryFlag: {
    fontSize: 36,
    marginRight: 16,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  countryRegion: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  countryPrice: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  infoSection: {
    backgroundColor: COLORS.surface,
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
  },
  footer: {
    height: 40,
  },
});

export default App;
