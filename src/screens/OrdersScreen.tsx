import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
import {COLORS, formatDate, formatPrice} from '../utils/constants';
import {Card} from '../components/Card';
import {Order} from '../types';

export const OrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const {orders} = useApp();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'active':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
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
      case 'active':
        return 'Активен';
      case 'pending':
        return 'Ожидает активации';
      case 'expired':
        return 'Истек';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  const activeOrders = orders.filter(order => order.status === 'active');
  const otherOrders = orders.filter(order => order.status !== 'active');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Мои заказы</Text>
            <Text style={styles.subtitle}>
              {orders.length} {orders.length === 1 ? 'заказ' : 'заказов'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.archiveButton}
            onPress={() => navigation.navigate('Archive' as never)}>
            <Text style={styles.archiveButtonText}>Архив</Text>
          </TouchableOpacity>
        </View>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📱</Text>
          <Text style={styles.emptyTitle}>Нет заказов</Text>
          <Text style={styles.emptyText}>
            Купите свой первый eSIM на главном экране
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Home' as never)}>
            <Text style={styles.emptyButtonText}>Выбрать eSIM</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          {activeOrders.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Активные</Text>
              {activeOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusColor={getStatusColor(order.status)}
                  statusText={getStatusText(order.status)}
                />
              ))}
            </View>
          )}

          {otherOrders.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>История</Text>
              {otherOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusColor={getStatusColor(order.status)}
                  statusText={getStatusText(order.status)}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

interface OrderCardProps {
  order: Order;
  statusColor: string;
  statusText: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  statusColor,
  statusText,
}) => {
  return (
    <Card style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderCountry}>
          <Text style={styles.orderFlag}>{order.country.flag}</Text>
          <View>
            <Text style={styles.orderCountryName}>{order.country.name}</Text>
            <Text style={styles.orderPlanName}>{order.plan.name}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: statusColor}]}>
          <Text style={styles.statusText}>{statusText}</Text>
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
          <Text style={styles.orderDetailLabel}>Действует до:</Text>
          <Text style={styles.orderDetailValue}>
            {formatDate(order.expiryDate)}
          </Text>
        </View>
      </View>

      {order.status === 'active' && order.iccid && (
        <View style={styles.iccidContainer}>
          <Text style={styles.iccidLabel}>ICCID: {order.iccid}</Text>
        </View>
      )}
    </Card>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
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
  archiveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  archiveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
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
  iccidContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  iccidLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
});

