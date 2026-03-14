import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useQuizGame } from '@/features/quiz/hooks';
import { QuizCategoryPicker } from '@/features/quiz/components';
import { Button, LoadingSpinner, ScreenWrapper } from '@/components/ui';
import { sharedStyles, welcomeStyles } from '@/theme';
import { Routes } from '@/config';
import type { TriviaCategory } from '@/features/quiz/types';

export default function GameSetup() {
  const { categories, loadingCategories, loadCategories } = useQuizGame();
  const [selected, setSelected] = useState<TriviaCategory | null>(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!selected && categories.length > 0) setSelected(categories[0]);
  }, [categories, selected]);

  const onStart = () => {
    if (!selected) return;
    router.push({
      pathname: Routes.quiz,
      params: { categoryId: String(selected.id), categoryName: selected.name },
    });
  };

  return (
    <ScreenWrapper>
      <View style={sharedStyles.container}>
        <View style={sharedStyles.header}>
          <Text style={sharedStyles.title}>SwivvyQuiz</Text>
          <Text style={sharedStyles.subtitle}>
            Pick a category and test your knowledge
          </Text>
        </View>

        <ScrollView
          style={welcomeStyles.categoryScroll}
          showsVerticalScrollIndicator={false}
        >
          {loadingCategories ? (
            <LoadingSpinner variant="light" />
          ) : (
            selected && (
              <QuizCategoryPicker
                categories={categories}
                selected={selected}
                onSelect={setSelected}
              />
            )
          )}
        </ScrollView>

        <Button label="Start Quiz" onPress={onStart} />
      </View>
    </ScreenWrapper>
  );
}
