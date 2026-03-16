import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';

export function AppIcon({
  icon,
  size = 24,
  color,
}: {
  icon: { name: any; pack: string };
  size?: number;
  color?: string;
}) {
  return (
    <MaterialIcons
      name={icon.name}
      size={size}
      color={color ?? theme.colors.text}
    />
  );
}
