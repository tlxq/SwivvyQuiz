import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';

// Typen bygger nu på theme.icons och är 100% literal-strikt
type IconObject = (typeof theme.icons)[keyof typeof theme.icons];

export interface AppIconProps {
  icon: IconObject;
  size?: number;
  color?: string;
}

export function AppIcon({ icon, size = 24, color }: AppIconProps) {
  return (
    <MaterialIcons
      name={icon.name}
      size={size}
      color={color ?? theme.colors.text}
    />
  );
}
