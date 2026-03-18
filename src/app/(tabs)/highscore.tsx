import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { theme } from '@/theme';
import { useHighScore } from '@/hooks/useHighScore';
import { LoadingSpinner, HighScoreItem } from '@/components/ui';

export default function HighscoreScreen() {
  const { scores, loading, error, loadTopScores } = useHighScore();

  useEffect(() => {
    loadTopScores();
  }, [loadTopScores]);

  const onRefresh = useCallback(() => {
    loadTopScores();
  }, [loadTopScores]);

  if (loading && scores.length === 0) return <LoadingSpinner />;

  return (
    <View style={theme.styles.container}>
      <Text style={[theme.typography.h1, { marginBottom: theme.spacing.md }]}>
        Global Top 5
      </Text>
      
      {error && <Text style={[theme.typography.body, { color: theme.colors.error }]}>{error}</Text>}

      <FlatList
        data={scores}
        keyExtractor={(item) => item.id || String(item.timestamp)}
        renderItem={({ item, index }) => (
          <HighScoreItem item={item} index={index} />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={onRefresh} 
            tintColor={theme.colors.primary} 
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={theme.styles.centered}>
              <Text style={theme.typography.body}>No highscores yet! Be the first!</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
