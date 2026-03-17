import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { HighScoreEntry } from '@/types';

interface HighScoreItemProps {
  item: HighScoreEntry;
  index: number;
}

export const HighScoreItem = React.memo(({ item, index }: HighScoreItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <Text style={theme.typography.bodyBold}>{index + 1}</Text>
      </View>
      <View style={styles.info}>
        <Text style={theme.typography.bodyBold}>{item.username}</Text>
        <Text style={theme.typography.caption}>{item.category}</Text>
      </View>
      <Text style={[theme.typography.h2, { color: theme.colors.primary }]}>
        {item.score}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  info: {
    flex: 1,
  },
});
