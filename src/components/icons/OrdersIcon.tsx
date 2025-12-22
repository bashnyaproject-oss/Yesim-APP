import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils/constants';

interface IconProps {
  size?: number;
  color?: string;
  active?: boolean;
}

export const OrdersIcon: React.FC<IconProps> = ({
  size = 24,
  color = COLORS.textSecondary,
  active = false,
}) => {
  const iconColor = active ? COLORS.primary : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? iconColor : 'none'}
        fillOpacity={active ? 0.1 : 0}
      />
      <Path
        d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

