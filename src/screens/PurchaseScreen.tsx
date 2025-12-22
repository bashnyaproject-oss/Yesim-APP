import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  Share,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
import {COLORS, formatPrice, formatDate} from '../utils/constants';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {ShareIcon} from '../components/icons';
import {Plan, Order} from '../types';

type PaymentMethod = 'card' | 'apple' | 'google' | 'paypal';

export const PurchaseScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {plan} = route.params as {plan: Plan};
  const {selectedCountry, addOrder, updateOrder} = useApp();
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const handlePaymentSelect = () => {
    if (!selectedPayment) {
      Alert.alert('Выберите метод оплаты', 'Пожалуйста, выберите способ оплаты');
      return;
    }
    setShowPayment(false);
    handlePurchase();
  };

  const handlePurchase = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.validity);

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      planId: plan.id,
      plan,
      country: selectedCountry!,
      purchaseDate: new Date(),
      expiryDate,
      status: 'pending',
      qrCode: `https://esim.example.com/install/${Date.now()}`,
      iccid: `8901${Math.random().toString().substring(2, 18)}`,
    };

    await addOrder(newOrder);
    setOrder(newOrder);
    setLoading(false);
    setShowQR(true);
  };

  const handleShare = async () => {
    if (!order) return;

    try {
      const shareData = {
        message: `eSIM для ${order.country.name}\n\nПлан: ${order.plan.name}\nДанные: ${order.plan.data}\n\nQR-код: ${order.qrCode}\nICCID: ${order.iccid}\n\nУстановите eSIM, отсканировав QR-код в настройках устройства.`,
        title: `eSIM ${order.country.name}`,
      };

      await Share.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleInstallComplete = () => {
    if (order) {
      const updatedOrder = {
        ...order,
        status: 'active' as const,
        activationDate: new Date(),
      };
      setOrder(updatedOrder);
      updateOrder(order.id, {status: 'active', activationDate: new Date()});
    }
    setShowQR(false);
    Alert.alert(
      'Успешно!',
      'eSIM установлен и активирован',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Orders' as never),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Оформление заказа</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <View style={styles.planSummary}>
            <Text style={styles.summaryTitle}>Выбранный план</Text>
            <View style={styles.planDetails}>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>Страна:</Text>
                <Text style={styles.planValue}>
                  {selectedCountry?.flag} {selectedCountry?.name}
                </Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>План:</Text>
                <Text style={styles.planValue}>{plan.name}</Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>Данные:</Text>
                <Text style={styles.planValue}>{plan.data}</Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>Срок действия:</Text>
                <Text style={styles.planValue}>{plan.validity} дней</Text>
              </View>
              <View style={styles.planRow}>
                <Text style={styles.planLabel}>Цена:</Text>
                <Text style={[styles.planValue, styles.price]}>
                  {formatPrice(plan.price, plan.currency)}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Инструкция по установке</Text>
          <View style={styles.instructions}>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                После покупки вы получите QR-код для установки
              </Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Откройте Настройки → Сотовая связь → Добавить eSIM
              </Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Отсканируйте QR-код или введите код вручную
              </Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepText}>
                Активируйте eSIM и начните пользоваться интернетом
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Метод оплаты</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPayment === 'card' && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedPayment('card')}>
              <Text style={styles.paymentIcon}>💳</Text>
              <Text style={styles.paymentText}>Банковская карта</Text>
              {selectedPayment === 'card' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPayment === 'apple' && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedPayment('apple')}>
              <Text style={styles.paymentIcon}>🍎</Text>
              <Text style={styles.paymentText}>Apple Pay</Text>
              {selectedPayment === 'apple' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPayment === 'google' && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedPayment('google')}>
              <Text style={styles.paymentIcon}>📱</Text>
              <Text style={styles.paymentText}>Google Pay</Text>
              {selectedPayment === 'google' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPayment === 'paypal' && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedPayment('paypal')}>
              <Text style={styles.paymentIcon}>🔵</Text>
              <Text style={styles.paymentText}>PayPal</Text>
              {selectedPayment === 'paypal' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
        </Card>

        <Button
          title={`Купить за ${formatPrice(plan.price, plan.currency)}`}
          onPress={() => setShowPayment(true)}
          loading={loading}
          size="large"
          style={styles.purchaseButton}
          disabled={!selectedPayment && !showPayment}
        />
      </View>

      <Modal
        visible={showQR}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowQR(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QR-код для установки</Text>
            <Text style={styles.modalSubtitle}>
              Отсканируйте этот код в настройках вашего устройства
            </Text>
            
            {order?.qrCode && (
              <View style={styles.qrContainer}>
                <QRCode
                  value={order.qrCode}
                  size={250}
                  color={COLORS.text}
                  backgroundColor={COLORS.surface}
                />
              </View>
            )}

            {order?.iccid && (
              <View style={styles.iccidContainer}>
                <Text style={styles.iccidLabel}>Или введите код вручную:</Text>
                <Text style={styles.iccidCode}>{order.iccid}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}>
              <ShareIcon size={20} color={COLORS.primary} />
              <Text style={styles.shareButtonText}>
                Поделиться для установки на другое устройство
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <Button
                title="Установка завершена"
                onPress={handleInstallComplete}
                variant="primary"
                style={styles.modalButton}
              />
              <Button
                title="Закрыть"
                onPress={() => setShowQR(false)}
                variant="outline"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showPayment}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPayment(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите метод оплаты</Text>
            
            <View style={styles.paymentMethodsModal}>
              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPayment === 'card' && styles.paymentMethodSelected,
                ]}
                onPress={() => setSelectedPayment('card')}>
                <Text style={styles.paymentIcon}>💳</Text>
                <Text style={styles.paymentText}>Банковская карта</Text>
                {selectedPayment === 'card' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPayment === 'apple' && styles.paymentMethodSelected,
                ]}
                onPress={() => setSelectedPayment('apple')}>
                <Text style={styles.paymentIcon}>🍎</Text>
                <Text style={styles.paymentText}>Apple Pay</Text>
                {selectedPayment === 'apple' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPayment === 'google' && styles.paymentMethodSelected,
                ]}
                onPress={() => setSelectedPayment('google')}>
                <Text style={styles.paymentIcon}>📱</Text>
                <Text style={styles.paymentText}>Google Pay</Text>
                {selectedPayment === 'google' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  selectedPayment === 'paypal' && styles.paymentMethodSelected,
                ]}
                onPress={() => setSelectedPayment('paypal')}>
                <Text style={styles.paymentIcon}>🔵</Text>
                <Text style={styles.paymentText}>PayPal</Text>
                {selectedPayment === 'paypal' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title={`Оплатить ${formatPrice(plan.price, plan.currency)}`}
                onPress={handlePaymentSelect}
                variant="primary"
                style={styles.modalButton}
                disabled={!selectedPayment}
              />
              <Button
                title="Отмена"
                onPress={() => setShowPayment(false)}
                variant="outline"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  planSummary: {
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  planDetails: {
    gap: 12,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  planValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  price: {
    fontSize: 24,
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  instructions: {
    gap: 16,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  purchaseButton: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    marginBottom: 24,
  },
  iccidContainer: {
    width: '100%',
    marginBottom: 24,
  },
  iccidLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  iccidCode: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  modalButtons: {
    width: '100%',
    gap: 12,
  },
  modalButton: {
    width: '100%',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethodsModal: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  paymentMethodSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F3F4F6',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shareButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

