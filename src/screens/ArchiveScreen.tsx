import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {COLORS, formatDate, formatPrice} from '../utils/constants';
import {Card} from '../components/Card';
import {ArchiveIcon} from '../components/icons';
import {Order} from '../types';

export const ArchiveScreen: React.FC = () => {
  const {orders} = useApp();
  const [filter, setFilter] = useState<'all' | 'expired' | 'cancelled'>('all');

  const archivedOrders = orders.filter(order => {
    if (filter === 'all') {
      return order.status === 'expired' || order.status === 'cancelled';
    }
    return order.status === filter;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'expired':
        return COLORS.textSecondary;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'expired':
        return 'Истек';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ArchiveIcon size={32} color={COLORS.primary} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Архив заказов</Text>
            <Text style={styles.subtitle}>
              {archivedOrders.length} {archivedOrders.length === 1 ? 'заказ' : 'заказов'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterActive]}
          onPress={() => setFilter('all')}>
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive,
            ]}>
            Все
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'expired' && styles.filterActive]}
          onPress={() => setFilter('expired')}>
          <Text
            style={[
              styles.filterText,
              filter === 'expired' && styles.filterTextActive,
            ]}>
            Истекшие
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'cancelled' && styles.filterActive]}
          onPress={() => setFilter('cancelled')}>
          <Text
            style={[
              styles.filterText,
              filter === 'cancelled' && styles.filterTextActive,
            ]}>
            Отмененные
          </Text>
        </TouchableOpacity>
      </View>

      {archivedOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ArchiveIcon size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Архив пуст</Text>
          <Text style={styles.emptyText}>
            Здесь будут отображаться завершенные и отмененные заказы
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          {archivedOrders.map(order => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderCountry}>
                  <Text style={styles.orderFlag}>{order.country.flag}</Text>
                  <View>
                    <Text style={styles.orderCountryName}>{order.country.name}</Text>
                    <Text style={styles.orderPlanName}>{order.plan.name}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {backgroundColor: getStatusColor(order.status)},
                  ]}>
                  <Text style={styles.statusText}>
                    {getStatusText(order.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.orderDetailRow}>
                  <Text style={styles.orderDetailLabel}>Данные:</Text>
                  <Text style={styles.orderDetailValue}>{order.plan.data}</Text>
                </View>
                <View style={styles.orderDetailRow}>
                  <Text style={styles.orderDetailLabel}>Цена:</Text>
                  <Text style={styles.orderDetailValue}>
                    {formatPrice(order.plan.price, order.plan.currency)}
                  </Text>
                </View>
                <View style={styles.orderDetailRow}>
                  <Text style={styles.orderDetailLabel}>Дата покупки:</Text>
                  <Text style={styles.orderDetailValue}>
                    {formatDate(order.purchaseDate)}
                  </Text>
                </View>
                {order.expiryDate && (
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailLabel}>Истек:</Text>
                    <Text style={styles.orderDetailValue}>
                      {formatDate(order.expiryDate)}
                    </Text>
                  </View>
                )}
              </View>
            </Card>
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
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  orderCard: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderFlag: {
    fontSize: 32,
    marginRight: 12,
  },
  orderCountryName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  orderPlanName: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    gap: 8,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

