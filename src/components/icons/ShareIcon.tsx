import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {COLORS} from '../../utils/constants';

interface IconProps {
  size?: number;
  color?: string;
}

export const ShareIcon: React.FC<IconProps> = ({
  size = 24,
  color = COLORS.primary,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2" />
      <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2" />
      <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" />
      <Path
        d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

