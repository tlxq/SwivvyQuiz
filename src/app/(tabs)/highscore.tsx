import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFirebaseHighScore } from '@/hooks';
import { LoadingSpinner, ScreenWrapper } from '@/components/ui';
import { sharedStyles, highscoreStyles } from '@/styles';

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
          <View style={highscoreStyles.emptyState}>
            <Text style={highscoreStyles.emptyText}>
              No scores yet! Be the first!
            </Text>
          </View>
        ) : (
          <FlatList
            data={scores}
            keyExtractor={(item) => item.id || String(item.timestamp)}
            contentContainerStyle={highscoreStyles.listContent}
            renderItem={({ item, index }) => (
              <View style={highscoreStyles.card}>
                <View style={highscoreStyles.row}>
                  <Text style={highscoreStyles.rank}>#{index + 1}</Text>
                  <View style={highscoreStyles.textBlock}>
                    <Text style={highscoreStyles.name}>{item.username}</Text>
                    <Text style={highscoreStyles.category}>
                      {item.categoryName}
                    </Text>
                  </View>
                  <Text style={highscoreStyles.score}>{item.score}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
