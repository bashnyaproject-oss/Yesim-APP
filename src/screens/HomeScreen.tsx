import React, {useState} from 'react';
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
import {DeviceCompatibility} from '../components/DeviceCompatibility';
import {MapIcon} from '../components/icons';
import {Country} from '../types';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {selectedCountry, setSelectedCountry, orders} = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = SAMPLE_COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeOrders = orders.filter(order => order.status === 'active');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.title}>eSIM для путешествий</Text>
            <Text style={styles.subtitle}>
              Выберите страну и получите интернет за минуты
            </Text>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => navigation.navigate('Map' as never)}>
            <MapIcon size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.compatibilitySection}>
        <DeviceCompatibility />
      </View>

      {activeOrders.length > 0 && (
        <View style={styles.activeOrders}>
          <Text style={styles.sectionTitle}>Активные eSIM</Text>
          <TouchableOpacity
            style={styles.activeOrderCard}
            onPress={() => navigation.navigate('Orders' as never)}>
            <Text style={styles.activeOrderText}>
              У вас {activeOrders.length} активных eSIM
            </Text>
            <Text style={styles.activeOrderArrow}>→</Text>
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

      <View style={styles.countriesSection}>
        <Text style={styles.sectionTitle}>Выберите страну</Text>
        {filteredCountries.map(country => (
          <CountryCard
            key={country.id}
            country={country}
            onSelect={setSelectedCountry}
            selected={selectedCountry?.id === country.id}
          />
        ))}
      </View>

      {selectedCountry && (
        <View style={styles.actionSection}>
          <Button
            title={`Просмотреть планы для ${selectedCountry.name}`}
            onPress={() => navigation.navigate('Plans' as never)}
            variant="primary"
            size="large"
          />
        </View>
      )}

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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
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
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  compatibilitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activeOrders: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activeOrderCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  activeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  activeOrderArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
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
    marginBottom: 20,
  },
  infoSection: {
    padding: 20,
    backgroundColor: COLORS.surface,
    margin: 20,
    borderRadius: 16,
    marginBottom: 40,
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
});

