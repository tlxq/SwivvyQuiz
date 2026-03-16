import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { AppIcon } from '@/components/ui';
import { theme } from '@/theme';
import type { TriviaCategory } from '../quiz.types';

interface CategoryPickerProps {
  categories: TriviaCategory[];
  selected: TriviaCategory;
  onSelect: (cat: TriviaCategory) => void;
}

export function CategoryPicker({
  categories,
  selected,
  onSelect,
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const choose = useCallback(
    (cat: TriviaCategory) => {
      onSelect(cat);
      setOpen(false);
    },
    [onSelect],
  );

  return (
    <View>
      <Text style={[theme.typography.caption, theme.styles.spaceBelowXl]}>
        Selected Category
      </Text>

      <Pressable
        style={[
          theme.styles.card,
          theme.styles.rowSpread,
          theme.styles.spaceBelowXl,
          { paddingVertical: theme.spacing.md },
        ]}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={`Category: ${selected.name}. Tap to change.`}
      >
        <Text style={theme.typography.bodyBold} numberOfLines={1}>
          {selected.name}
        </Text>
        <AppIcon
          icon={open ? theme.icons.chevronUp : theme.icons.chevronDown}
          size={20}
          color={theme.colors.primary}
        />
      </Pressable>

      {open && (
        <View
          style={[theme.styles.card, theme.styles.spaceBelowXl, { padding: 0 }]}
        >
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {categories.map((cat) => {
              const isSelected = cat.id === selected.id;
              return (
                <Pressable
                  key={cat.id}
                  style={[
                    theme.styles.rowSpread,
                    {
                      padding: theme.spacing.md,
                      backgroundColor: isSelected
                        ? theme.colors.surfaceElevated
                        : theme.colors.surface,
                    },
                  ]}
                  onPress={() => choose(cat)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      theme.typography.body,
                      isSelected && {
                        color: theme.colors.primary,
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {cat.name}
                  </Text>
                  {isSelected && (
                    <AppIcon
                      icon={theme.icons.check}
                      size={18}
                      color={theme.colors.primary}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
