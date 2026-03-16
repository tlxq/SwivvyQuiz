import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useHighScore } from '@/features/highscore';
import { LoadingSpinner } from '@/components/ui';
import { theme } from '@/theme';

export default function HighscoreScreen() {
  const { scores, loading, load } = useHighScore();

  useEffect(() => {
    load();
  }, [load]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[theme.styles.card, theme.styles.cardRow]}>
      <Text style={[theme.typography.button, theme.styles.rankNum]}>
        {index + 1}
      </Text>
      <View style={theme.styles.marginLeftMd}>
        <Text style={theme.typography.bodyBold}>{item.username}</Text>
        <Text style={theme.typography.caption}>{item.categoryName}</Text>
      </View>
      <Text style={theme.typography.button}>{item.score}</Text>
    </View>
  );

  return (
    <View style={theme.styles.container}>
      <View style={theme.styles.centerBelowLg}>
        <Text style={theme.typography.h1}>Leaderboard</Text>
        <Text style={theme.typography.subtitle}>Top 5 Global Scores</Text>
      </View>
      {loading && scores.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={scores}
          keyExtractor={(item) => item.id?.toString() || String(item.timestamp)}
          contentContainerStyle={theme.styles.listContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={load}
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={theme.styles.centerAboveMd}>
              <Text style={theme.typography.subtitle}>
                No scores yet! Be the first!
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
