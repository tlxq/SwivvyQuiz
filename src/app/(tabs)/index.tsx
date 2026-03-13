import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useQuiz } from '@/hooks';
import { CategoryPicker } from '@/components/quiz';
import { Button, LoadingSpinner, ScreenWrapper } from '@/components/ui';
import { sharedStyles } from '@/styles/screens';
import { Routes } from '@/constants/routes';
import type { TriviaCategory } from '@/types/trivia';

export default function GameSetup() {
  const { categories, loadingCategories, loadCategories } = useQuiz();
  const [selected, setSelected] = useState<TriviaCategory | null>(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  useEffect(() => {
    if (!selected && categories.length > 0) setSelected(categories[0]);
  }, [categories]);

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

        <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
          {loadingCategories ? (
            <LoadingSpinner variant="light" />
          ) : (
            selected && (
              <CategoryPicker
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
