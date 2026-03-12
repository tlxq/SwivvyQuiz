import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import type { HighScoreEntry } from '@/hooks/useHighScore';

interface ScoreCardProps {
  item: HighScoreEntry;
  maxScore: number;
}

// Displays one category's best score with a proportional fill bar.
// maxScore is passed as a prop rather than imported directly so this
// component stays free of game-rule knowledge.
export function ScoreCard({ item, maxScore }: ScoreCardProps) {
  const pct = Math.min(item.score / maxScore, 1);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.categoryName}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
    flex: 1,
    marginRight: spacing.sm,
  },
  score: {
    ...typography.h2,
    color: colors.primary,
  },
  track: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});
