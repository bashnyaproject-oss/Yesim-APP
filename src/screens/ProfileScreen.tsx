import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';
import {COLORS} from '../utils/constants';
import {Card} from '../components/Card';
import {Button} from '../components/Button';
import {SettingsIcon, ArchiveIcon, MapIcon} from '../components/icons';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user, setUser, orders} = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        {text: 'Отмена', style: 'cancel'},
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => setUser(null),
        },
      ]
    );
  };

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status === 'active').length,
    totalSpent: orders.reduce((sum, o) => sum + o.plan.price, 0),
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>
            {user?.name?.[0]?.toUpperCase() || '👤'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Гость'}</Text>
        <Text style={styles.email}>{user?.email || 'Не авторизован'}</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>Статистика</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalOrders}</Text>
              <Text style={styles.statLabel}>Всего заказов</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.activeOrders}</Text>
              <Text style={styles.statLabel}>Активных</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                ${stats.totalSpent.toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Потрачено</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Навигация</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('Home' as never, {screen: 'Map'} as never)}>
            <MapIcon size={24} color={COLORS.text} />
            <Text style={styles.settingText}>Карта стран</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('Orders' as never, {screen: 'Archive'} as never)}>
            <ArchiveIcon size={24} color={COLORS.text} />
            <Text style={styles.settingText}>Архив заказов</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Настройки</Text>
          <TouchableOpacity style={styles.settingItem}>
            <SettingsIcon size={24} color={COLORS.text} />
            <Text style={styles.settingText}>Общие настройки</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingText}>Уведомления</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>💳</Text>
            <Text style={styles.settingText}>Способы оплаты</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>🌐</Text>
            <Text style={styles.settingText}>Язык</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingIcon}>❓</Text>
            <Text style={styles.settingText}>Помощь и поддержка</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Версия</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Условия использования</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Политика конфиденциальности</Text>
            <Text style={styles.aboutArrow}>→</Text>
          </View>
        </Card>

        {user && (
          <Button
            title="Выйти"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        )}

        {!user && (
          <View style={styles.authSection}>
            <Button
              title="Войти"
              onPress={() => {
                // Navigate to login screen
                setUser({
                  id: '1',
                  name: 'Пользователь',
                  email: 'user@example.com',
                });
              }}
              variant="primary"
              style={styles.authButton}
            />
            <Button
              title="Регистрация"
              onPress={() => {
                setUser({
                  id: '1',
                  name: 'Новый пользователь',
                  email: 'newuser@example.com',
                });
              }}
              variant="secondary"
              style={styles.authButton}
            />
          </View>
        )}
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
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 36,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 24,
    height: 24,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  settingArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  aboutLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  aboutValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  aboutArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    marginTop: 20,
  },
  authSection: {
    marginTop: 20,
    gap: 12,
  },
  authButton: {
    width: '100%',
  },
});

