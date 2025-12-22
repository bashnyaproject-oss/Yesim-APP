import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, Order, Plan, Country} from '../types';

interface AppContextType {
  user: User | null;
  orders: Order[];
  setUser: (user: User | null) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const ordersData = await AsyncStorage.getItem('orders');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    const newOrders = orders.map(order =>
      order.id === orderId ? {...order, ...updates} : order
    );
    setOrders(newOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const handleSetUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('user');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        orders,
        setUser: handleSetUser,
        addOrder,
        updateOrder,
        selectedCountry,
        setSelectedCountry,
        loading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

