import {Country, Plan} from '../types';

export const COLORS = {
  primary: '#F97316',
  primaryDark: '#EA580C',
  secondary: '#FB923C',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#FFF7ED',
  surface: '#FFFFFF',
  text: '#1C1917',
  textSecondary: '#78716C',
  border: '#FED7AA',
  gradientStart: '#F97316',
  gradientEnd: '#FB923C',
};

export const SAMPLE_COUNTRIES: Country[] = [
  {id: '1', name: 'США', code: 'US', flag: '🇺🇸', region: 'Северная Америка'},
  {id: '2', name: 'Великобритания', code: 'GB', flag: '🇬🇧', region: 'Европа'},
  {id: '3', name: 'Германия', code: 'DE', flag: '🇩🇪', region: 'Европа'},
  {id: '4', name: 'Франция', code: 'FR', flag: '🇫🇷', region: 'Европа'},
  {id: '5', name: 'Испания', code: 'ES', flag: '🇪🇸', region: 'Европа'},
  {id: '6', name: 'Италия', code: 'IT', flag: '🇮🇹', region: 'Европа'},
  {id: '7', name: 'Япония', code: 'JP', flag: '🇯🇵', region: 'Азия'},
  {id: '8', name: 'Южная Корея', code: 'KR', flag: '🇰🇷', region: 'Азия'},
  {id: '9', name: 'Австралия', code: 'AU', flag: '🇦🇺', region: 'Океания'},
  {id: '10', name: 'Канада', code: 'CA', flag: '🇨🇦', region: 'Северная Америка'},
  {id: '11', name: 'Турция', code: 'TR', flag: '🇹🇷', region: 'Европа'},
  {id: '12', name: 'ОАЭ', code: 'AE', flag: '🇦🇪', region: 'Ближний Восток'},
];

export const SAMPLE_PLANS: Plan[] = [
  {
    id: '1',
    countryId: '1',
    name: 'Базовый',
    data: '5GB',
    validity: 7,
    price: 9.99,
    currency: 'USD',
    description: 'Идеально для коротких поездок',
    features: ['5GB данных', '7 дней действия', '4G/LTE скорость'],
  },
  {
    id: '2',
    countryId: '1',
    name: 'Стандартный',
    data: '10GB',
    validity: 14,
    price: 17.99,
    currency: 'USD',
    description: 'Популярный выбор',
    features: ['10GB данных', '14 дней действия', '4G/LTE скорость', 'Горячая точка'],
    popular: true,
  },
  {
    id: '3',
    countryId: '1',
    name: 'Премиум',
    data: '20GB',
    validity: 30,
    price: 29.99,
    currency: 'USD',
    description: 'Для длительных поездок',
    features: ['20GB данных', '30 дней действия', '5G скорость', 'Горячая точка', 'Приоритетная поддержка'],
  },
  {
    id: '4',
    countryId: '2',
    name: 'Базовый',
    data: '3GB',
    validity: 7,
    price: 7.99,
    currency: 'GBP',
    description: 'Идеально для коротких поездок',
    features: ['3GB данных', '7 дней действия', '4G/LTE скорость'],
  },
  {
    id: '5',
    countryId: '2',
    name: 'Стандартный',
    data: '8GB',
    validity: 14,
    price: 14.99,
    currency: 'GBP',
    description: 'Популярный выбор',
    features: ['8GB данных', '14 дней действия', '4G/LTE скорость', 'Горячая точка'],
    popular: true,
  },
];

// Цены для стран (минимальная цена плана)
export const COUNTRY_PRICES: Record<string, {min: number; max: number; currency: string}> = {
  '1': {min: 9.99, max: 29.99, currency: 'USD'}, // США
  '2': {min: 7.99, max: 24.99, currency: 'GBP'}, // Великобритания
  '3': {min: 8.99, max: 26.99, currency: 'EUR'}, // Германия
  '4': {min: 8.99, max: 26.99, currency: 'EUR'}, // Франция
  '5': {min: 7.99, max: 24.99, currency: 'EUR'}, // Испания
  '6': {min: 7.99, max: 24.99, currency: 'EUR'}, // Италия
  '7': {min: 10.99, max: 32.99, currency: 'USD'}, // Япония
  '8': {min: 9.99, max: 29.99, currency: 'USD'}, // Южная Корея
  '9': {min: 11.99, max: 34.99, currency: 'AUD'}, // Австралия
  '10': {min: 9.99, max: 29.99, currency: 'CAD'}, // Канада
  '11': {min: 6.99, max: 22.99, currency: 'USD'}, // Турция
  '12': {min: 8.99, max: 26.99, currency: 'USD'}, // ОАЭ
};

export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

