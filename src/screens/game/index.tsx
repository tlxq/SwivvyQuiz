import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useTriviaCategories } from '@/hooks/useTriviaCategories';
import { CategoryPicker } from '@/components/quiz';
import { Button, ErrorMessage, ScreenWrapper } from '@/components/ui';
import { gameStyles } from '@/styles/screens/gameStyles';
import { colors } from '@/styles/colors';
import { Routes } from '@/constants/routes';
import type { TriviaCategory } from '@/types/trivia';

export default function GameScreen() {
  const { categories, loading, error, load } = useTriviaCategories();
  const [selected, setSelected] = useState<TriviaCategory | null>(null);

  // Fetch categories on mount; default selection is set when they arrive.
  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    if (selected === null && categories.length > 0) setSelected(categories[0]);
  }, [categories, selected]);

  // useCallback so the function reference is stable across re-renders.
  const startGame = useCallback(() => {
    if (selected === null) return;
    router.push({
      pathname: Routes.quiz,
      params: { categoryId: String(selected.id), categoryName: selected.name },
    });
  }, [selected]);

  return (
    <ScreenWrapper>
      <View style={gameStyles.container}>
        <View style={gameStyles.header}>
          <Text style={gameStyles.title}>SwivvyQuiz</Text>
          <Text style={gameStyles.subtitle}>Choose a category and start playing</Text>
        </View>

        <ScrollView
          style={gameStyles.body}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        >
          {loading ? (
            // White spinner since we're on a dark gradient.
            <ActivityIndicator size="large" color={colors.surface} style={{ marginTop: 40 }} />
          ) : error !== null ? (
            <View style={{ marginTop: 24 }}>
              <ErrorMessage message={error} />
              <View style={{ marginTop: 16 }}>
                <Button label="Retry" onPress={() => void load()} variant="outline" />
              </View>
            </View>
          ) : selected !== null ? (
            <CategoryPicker
              categories={categories}
              selected={selected}
              onSelect={setSelected}
            />
          ) : null}
        </ScrollView>

        <View style={gameStyles.footer}>
          <Button label="Start Game" onPress={startGame} variant="primary" />
        </View>
      </View>
    </ScreenWrapper>
  );
}
