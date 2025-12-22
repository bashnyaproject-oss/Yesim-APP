import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
import {COLORS, SAMPLE_PLANS, formatPrice} from '../utils/constants';
import {PlanCard} from '../components/PlanCard';
import {Plan} from '../types';

export const PlansScreen: React.FC = () => {
  const navigation = useNavigation();
  const {selectedCountry, addOrder} = useApp();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const availablePlans = useMemo(() => {
    if (!selectedCountry) return [];
    return SAMPLE_PLANS.filter(plan => plan.countryId === selectedCountry.id);
  }, [selectedCountry]);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    navigation.navigate('Purchase' as never, {plan} as never);
  };

  if (!selectedCountry) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Пожалуйста, выберите страну на главном экране
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Тарифные планы</Text>
        <View style={styles.countryInfo}>
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={styles.countryName}>{selectedCountry.name}</Text>
        </View>
      </View>

      {availablePlans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Планы для этой страны пока недоступны
          </Text>
        </View>
      ) : (
        <View style={styles.plansContainer}>
          {availablePlans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

