import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useHighScore } from '@/hooks/useHighScore';
import { ScoreCard } from '@/components/quiz';
import { LoadingSpinner, ScreenWrapper } from '@/components/ui';
import { highscoreStyles } from '@/styles/screens/highscoreStyles';
import { MAX_SCORE } from '@/constants/quiz';

export default function HighscoreScreen() {
  const { scores, loading, load } = useHighScore();

  // Reload every visit so newly saved scores appear immediately.
  useEffect(() => { load(); }, [load]);

  return (
    <ScreenWrapper>
      {loading ? (
        <LoadingSpinner variant="light" />
      ) : (
        <>
          <View style={highscoreStyles.header}>
            <Text style={highscoreStyles.title}>Highscores</Text>
            <Text style={highscoreStyles.subtitle}>Your best per category</Text>
          </View>

          {scores.length === 0 ? (
            <View style={highscoreStyles.empty}>
              <Text style={highscoreStyles.emptyEmoji}>🎮</Text>
              <Text style={highscoreStyles.emptyText}>
                No scores yet.{'\n'}Play a quiz to get on the board!
              </Text>
            </View>
          ) : (
            <FlatList
              data={scores}
              keyExtractor={(item) => item.categoryId}
              renderItem={({ item }) => <ScoreCard item={item} maxScore={MAX_SCORE} />}
              contentContainerStyle={highscoreStyles.list}
            />
          )}
        </>
      )}
    </ScreenWrapper>
  );
}
