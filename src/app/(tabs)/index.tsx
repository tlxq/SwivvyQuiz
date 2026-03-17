import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { triviaService } from '@/services/triviaService';
import { LoadingSpinner, Button, Card } from '@/components/ui';
import { TriviaCategory } from '@/types';
import { useAsync } from '@/hooks/useAsync';

export default function SetupScreen() {
  const { data: categories, loading, error, execute } = useAsync<TriviaCategory[]>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    execute(triviaService.getCategories());
  }, [execute]);

  // Filtering implementation (VG Requirement)
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleSelect = (category: TriviaCategory) => {
    router.push({
      pathname: '/quiz',
      params: { id: category.id, categoryName: category.name }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <View style={theme.styles.centered}><Text style={theme.typography.body}>{error}</Text></View>;

  return (
    <View style={theme.styles.container}>
      <Text style={[theme.typography.h1, { marginBottom: theme.spacing.md }]}>
        Choose Category
      </Text>
      
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
          <Card style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={theme.typography.bodyBold}>{item.name}</Text>
            </View>
            <Button 
              label="Play" 
              variant="primary" 
              onPress={() => handleSelect(item)}
              style={{ height: 40 }}
            />
          </Card>
        )}
      />
    </View>
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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  }
});
