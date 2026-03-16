import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useQuizSetup, CategoryPicker, TriviaCategory } from '@/features/quiz';
import { Button, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { sharedStyles, welcomeStyles } from '@/theme';
import { Routes } from '@/config';

export default function GameSetup() {
  const { categories, loading, error, loadCategories } = useQuizSetup();
  const [selected, setSelected] = useState<TriviaCategory | null>(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!selected && categories.length > 0) {
      setSelected(categories[0]);
    }
  }, [categories, selected]);

  const onStart = useCallback(() => {
    if (!selected) return;
    router.push({
      pathname: Routes.quiz,
      params: { categoryId: String(selected.id), categoryName: selected.name },
    });
  }, [selected]);

  if (error)
    return (
      <>
        <ErrorMessage message={error} />
        <Button label="Retry" onPress={loadCategories} />
      </>
    );

  return (
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
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {loading ? (
          <LoadingSpinner />
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

      <View style={{ marginTop: 'auto' }}>
        <Button
          label="Start Quiz"
          onPress={onStart}
          disabled={!selected || loading}
        />
      </View>
    </View>
  );
}
