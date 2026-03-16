import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useHighScore } from '@/features/highscore';
import { LoadingSpinner } from '@/components/ui';
import { sharedStyles, highscoreStyles, colors } from '@/theme';

export default function HighscoreScreen() {
  const { scores, loading, load } = useHighScore();

  useEffect(() => {
    load();
  }, [load]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={highscoreStyles.card}>
      <Text style={highscoreStyles.rank}>{index + 1}</Text>
      <View style={{ flex: 1 }}>
        <Text style={highscoreStyles.name}>{item.username}</Text>
        <Text
          style={[sharedStyles.subtitle, { textAlign: 'left', fontSize: 14 }]}
        >
          {item.categoryName}
        </Text>
      </View>
      <Text style={highscoreStyles.score}>{item.score}</Text>
    </View>
  );

  return (
    <>
      <View style={[sharedStyles.container, { paddingHorizontal: 0 }]}>
        <View style={sharedStyles.header}>
          <Text style={sharedStyles.title}>Leaderboard</Text>
          <Text style={sharedStyles.subtitle}>Top 5 Global Scores</Text>
        </View>

        {loading && scores.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            data={scores}
            keyExtractor={(item) => item.id || String(item.timestamp)}
            contentContainerStyle={highscoreStyles.listContent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={load}
                tintColor={colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={[sharedStyles.centered, { marginTop: 100 }]}>
                <Text style={sharedStyles.subtitle}>
                  No scores yet! Be the first!
                </Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
}
