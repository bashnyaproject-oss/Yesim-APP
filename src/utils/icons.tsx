import React from 'react';
import Svg, {Path, Circle, Rect, Line} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const HomeIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21H9Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const OrdersIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M8 12H16M8 16H16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const ProfileIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const MapIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 20L3 17V4L9 7L15 4L21 7V20L15 17L9 20Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M9 7V20M15 4V17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ShareIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const ArchiveIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="4" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M4 8V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <Path d="M10 12H14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const SettingsIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const CheckIconSVG: React.FC<IconProps> = ({size = 20, color = '#F97316', strokeWidth = 2.5}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const SearchIconSVG: React.FC<IconProps> = ({size = 20, color = '#666', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="m21 21-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const NotificationIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const PaymentIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="1" y="4" width="22" height="16" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M1 10H23" stroke={color} strokeWidth={strokeWidth}/>
  </Svg>
);

export const GlobeIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke={color} strokeWidth={strokeWidth}/>
  </Svg>
);

export const HelpIconSVG: React.FC<IconProps> = ({size = 24, color = '#1A1A1A', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
    <Path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </Svg>
);

export const ArrowRightIconSVG: React.FC<IconProps> = ({size = 20, color = '#999', strokeWidth = 2}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

