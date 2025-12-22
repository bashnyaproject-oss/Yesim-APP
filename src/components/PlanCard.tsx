import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Plan} from '../types';
import {COLORS, formatPrice} from '../utils/constants';
import {Card} from './Card';
import {Button} from './Button';

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({plan, onSelect}) => {
  return (
    <Card style={plan.popular ? styles.popularCard : undefined}>
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Популярный</Text>
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.name}>{plan.name}</Text>
        <Text style={styles.price}>
          {formatPrice(plan.price, plan.currency)}
        </Text>
      </View>
      <Text style={styles.data}>{plan.data}</Text>
      <Text style={styles.validity}>Действителен {plan.validity} дней</Text>
      <Text style={styles.description}>{plan.description}</Text>
      <View style={styles.features}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <Button
        title="Выбрать план"
        onPress={() => onSelect(plan)}
        variant="primary"
        style={styles.button}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  popularCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  data: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  validity: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  features: {
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 16,
    color: COLORS.success,
    marginRight: 8,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text,
  },
  button: {
    marginTop: 8,
  },
});

