import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import type { TriviaCategory } from '@/types/trivia';

interface CategoryPickerProps {
  categories: TriviaCategory[];
  selected: TriviaCategory;
  onSelect: (cat: TriviaCategory) => void;
}

// Self-contained picker — manages open/closed state internally so the parent
// screen only needs to track which category is selected.
export function CategoryPicker({ categories, selected, onSelect }: CategoryPickerProps) {
  const [open, setOpen] = useState(false);

  const choose = (cat: TriviaCategory) => {
    onSelect(cat);
    setOpen(false);
  };

  return (
    <View>
      <Text style={styles.label}>Selected Category</Text>

      {/* Collapsed pill — always visible, tap to expand */}
      <TouchableOpacity
        style={styles.pill}
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={`Category: ${selected.name}. Tap to change.`}
      >
        <Text style={styles.pillText}>{selected.name}</Text>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown — only mounted while open to keep the tree lean */}
      {open && (
        <ScrollView
          style={styles.dropdown}
          nestedScrollEnabled
        >
          {categories.map((cat, i) => {
            const isSelected = cat.id === selected.id;
            const isLast = i === categories.length - 1;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.item,
                  isLast && styles.itemLast,
                  isSelected && styles.itemSelected,
                ]}
                onPress={() => choose(cat)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                  {cat.name}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    marginBottom: spacing.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: spacing.sm,
  },
  pillText: {
    ...typography.body,
    flex: 1,
    color: colors.primary,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dropdown: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.md,
    maxHeight: 320, // cap so the Start Game button stays visible
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  itemSelected: {
    backgroundColor: `${colors.primary}10`,
  },
  itemText: {
    ...typography.body,
    flex: 1,
  },
  itemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 14,
    color: colors.primary,
  },
});
