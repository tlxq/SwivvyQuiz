import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export type IconPack = 'MaterialIcons';

export type MaterialIconName = React.ComponentProps<
  typeof MaterialIcons
>['name'];

export interface IconConfig {
  name: MaterialIconName;
  pack: IconPack;
}

export const ICONS = {
  gameTab: { name: 'sports-esports', pack: 'MaterialIcons' },
  highscoreTab: { name: 'leaderboard', pack: 'MaterialIcons' },

  chevronUp: { name: 'keyboard-arrow-up', pack: 'MaterialIcons' },
  chevronDown: { name: 'keyboard-arrow-down', pack: 'MaterialIcons' },
  check: { name: 'check', pack: 'MaterialIcons' },

  retry: { name: 'refresh', pack: 'MaterialIcons' },
  back: { name: 'arrow-back', pack: 'MaterialIcons' },
  close: { name: 'close', pack: 'MaterialIcons' },
  save: { name: 'save', pack: 'MaterialIcons' },
  brain: { pack: 'MaterialIcons', name: 'psychology' },
} as const;

export type IconKey = keyof typeof ICONS;
