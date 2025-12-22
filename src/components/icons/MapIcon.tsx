import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils/constants';

interface IconProps {
  size?: number;
  color?: string;
}

export const MapIcon: React.FC<IconProps> = ({
  size = 24,
  color = COLORS.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 20L3 17V4L9 7L15 4L21 7V20L15 17L9 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M9 7V20M15 4V17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

