import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../utils/constants';

interface IconProps {
  size?: number;
  color?: string;
}

export const ArchiveIcon: React.FC<IconProps> = ({
  size = 24,
  color = COLORS.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 8V21H3V8M10 12H14M5 8H19L20 4H4L5 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

