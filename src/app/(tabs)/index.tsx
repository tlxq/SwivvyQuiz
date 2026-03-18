import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { triviaService } from '@/services/triviaService';
import { Screen, Button, Card } from '@/components/ui';
import { TriviaCategory } from '@/types';
import { useAsync } from '@/hooks/useAsync';

export default function SetupScreen() {
  const { data: categories, loading, error, execute } = useAsync<TriviaCategory[]>(true);
  const [search, setSearch] = useState('');

  useEffect(() => { execute(triviaService.getAllCategories()) }, [execute]);

  const filteredCategories = useMemo(() => 
    (categories || []).filter(c => c.name.toLowerCase().includes(search.toLowerCase())), 
  [categories, search]);

  const handleSelect = (category: TriviaCategory) => {
    router.push({ pathname: '/quiz', params: { id: category.id, categoryName: category.name } });
  };

  return (
    <Screen loading={loading && !categories?.length} error={error} onBack={() => execute(triviaService.getAllCategories())}>
      <Text style={[theme.typography.h1, { marginBottom: theme.spacing.md }]}>Choose Category</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        placeholderTextColor={theme.colors.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={[theme.styles.row, { marginBottom: theme.spacing.sm }]}>
            <View style={{ flex: 1 }}>
              <Text style={theme.typography.bodyBold}>{item.name}</Text>
            </View>
            <Button label="Play" variant="primary" onPress={() => handleSelect(item)} style={{ height: 40 }} />
          </Card>
        )}
        ListEmptyComponent={!loading ? <Text style={[theme.typography.body, { textAlign: 'center', marginTop: 20 }]}>No categories found.</Text> : null}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontFamily: 'Poppins_400Regular',
  }
});
