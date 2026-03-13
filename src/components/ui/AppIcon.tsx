import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { IconConfig, colors } from '@/theme';

interface AppIconProps {
  icon: IconConfig;
  size?: number;
  color?: string;
}

export function AppIcon({
  icon,
  size = 24,
  color = colors.text,
}: AppIconProps) {
  if (icon.pack === 'MaterialIcons') {
    return <MaterialIcons name={icon.name} size={size} color={color} />;
  }

  return null;
}
