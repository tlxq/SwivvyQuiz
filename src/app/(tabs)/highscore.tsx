import React, { useEffect } from 'react';
import { Text, FlatList, RefreshControl } from 'react-native';
import { theme } from '@/theme';
import { useHighScore } from '@/hooks/useHighScore';
import { Screen, HighScoreItem } from '@/components/ui';
import { QUIZ_SETTINGS } from '@/config/triviaConfig';

export default function HighscoreScreen() {
  const { scores, loading, error, loadTopScores } = useHighScore();

  useEffect(() => { loadTopScores() }, [loadTopScores]);

  return (
    <Screen loading={loading && !scores.length} error={error} onBack={loadTopScores}>
      <Text style={[theme.typography.h1, { marginBottom: theme.spacing.md }]}>
        Global Top {QUIZ_SETTINGS.MAX_HIGHSCORES}
      </Text>
      
      <FlatList
        data={scores}
        keyExtractor={(item) => item.id || String(item.timestamp)}
        renderItem={({ item, index }) => (
          <HighScoreItem item={item} index={index} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadTopScores} tintColor={theme.colors.primary} />
        }
        ListEmptyComponent={!loading ? <Text style={theme.typography.body}>No highscores yet! Be the first!</Text> : null}
      />
    </Screen>
  );
}
