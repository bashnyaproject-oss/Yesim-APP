import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {COLORS} from '../../utils/constants';

interface IconProps {
  size?: number;
  color?: string;
  active?: boolean;
}

export const ProfileIcon: React.FC<IconProps> = ({
  size = 24,
  color = COLORS.textSecondary,
  active = false,
}) => {
  const iconColor = active ? COLORS.primary : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={iconColor}
        strokeWidth="2"
        fill={active ? iconColor : 'none'}
        fillOpacity={active ? 0.1 : 0}
      />
      <Path
        d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

