import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {COLORS} from '../utils/constants';
import {Card} from './Card';
import {DeviceInfo} from '../types';

interface DeviceCompatibilityProps {
  onCheckComplete?: (compatible: boolean) => void;
}

export const DeviceCompatibility: React.FC<DeviceCompatibilityProps> = ({
  onCheckComplete,
}) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [compatible, setCompatible] = useState<boolean | null>(null);

  useEffect(() => {
    checkCompatibility();
  }, []);

  const checkCompatibility = async () => {
    // In a real app, you would check device capabilities
    // For now, we'll simulate the check
    const info: DeviceInfo = {
      model: Platform.OS === 'ios' ? 'iPhone' : 'Android Device',
      os: Platform.OS,
      eSIMSupported: Platform.OS === 'ios' || Platform.Version >= 28, // Android 9+
    };

    setDeviceInfo(info);
    setCompatible(info.eSIMSupported);
    
    if (onCheckComplete) {
      onCheckComplete(info.eSIMSupported);
    }
  };

  if (compatible === null) {
    return (
      <Card>
        <Text style={styles.title}>Проверка совместимости...</Text>
      </Card>
    );
  }

  return (
    <Card style={compatible ? styles.compatible : styles.incompatible}>
      <View style={styles.header}>
        <Text style={styles.icon}>{compatible ? '✅' : '⚠️'}</Text>
        <View style={styles.info}>
          <Text style={styles.title}>
            {compatible
              ? 'Ваше устройство поддерживает eSIM'
              : 'Ваше устройство может не поддерживать eSIM'}
          </Text>
          {deviceInfo && (
            <Text style={styles.deviceInfo}>
              {deviceInfo.model} ({deviceInfo.os})
            </Text>
          )}
        </View>
      </View>
      {!compatible && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Убедитесь, что ваше устройство поддерживает eSIM. Для iOS это
            iPhone XS и новее. Для Android - устройства с Android 9+ и
            поддержкой eSIM.
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  compatible: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  incompatible: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  deviceInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  warning: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

