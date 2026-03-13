import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFirebaseHighScore } from '@/hooks';
import { LoadingSpinner, ScreenWrapper } from '@/components/ui';
import { colors, spacing, typography, sharedStyles } from '@/styles';

export default function Highscore() {
  const { scores, loading, load } = useFirebaseHighScore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScreenWrapper>
      <View style={sharedStyles.container}>
        <View style={sharedStyles.header}>
          <Text style={sharedStyles.title}>Top 5</Text>
          <Text style={sharedStyles.subtitle}>Global Leaderboard</Text>
        </View>

        {loading ? (
          <LoadingSpinner variant="light" />
        ) : scores.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: 'white' }}>No scores yet! Be the first!</Text>
          </View>
        ) : (
          <FlatList
            data={scores}
            keyExtractor={(item) => item.id || String(item.timestamp)}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.rank}>#{index + 1}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.cat}>{item.categoryName}</Text>
                  </View>
                  <Text style={styles.score}>{item.score}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    ...typography.h2,
    color: colors.surface,
    opacity: 0.5,
  },
  name: {
    ...typography.body,
    color: colors.surface,
    fontWeight: 'bold',
  },
  cat: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  score: {
    ...typography.h2,
    color: colors.surface,
  },
});
