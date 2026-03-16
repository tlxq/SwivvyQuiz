import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useQuizSetup, CategoryPicker, TriviaCategory } from '@/features/quiz';
import { Button, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { theme } from '@/theme';

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
      pathname: '/quiz',
      params: { categoryId: String(selected.id), categoryName: selected.name },
    });
  }, [selected]);

  if (error) {
    return (
      <View style={theme.styles.container}>
        <ErrorMessage message={error} />
        <Button label="Retry" onPress={loadCategories} />
      </View>
    );
  }

  return (
    <View style={theme.styles.container}>
      <View style={[theme.styles.centered, { marginBottom: theme.spacing.xl }]}>
        <Text style={theme.typography.h1}>SwivvyQuiz</Text>
        <Text style={theme.typography.subtitle}>
          Pick a category and test your knowledge
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ marginBottom: theme.spacing.xl }}
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

      <Button
        label="Start Quiz"
        onPress={onStart}
        disabled={!selected || loading}
      />
    </View>
  );
}
