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

/** CategoryPicker - display and pick category with theme styles only */
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
      <Text
        style={[theme.typography.caption, { marginBottom: theme.spacing.sm }]}
      >
        Selected Category
      </Text>

      <Pressable
        style={[
          theme.styles.card,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: theme.spacing.md,
            marginBottom: theme.spacing.sm,
          },
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
          style={[
            theme.styles.card,
            { padding: 0, marginBottom: theme.spacing.md },
          ]}
        >
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {categories.map((cat) => {
              const isSelected = cat.id === selected.id;
              return (
                <Pressable
                  key={cat.id}
                  style={[
                    {
                      padding: theme.spacing.md,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                    isSelected && {
                      backgroundColor: theme.colors.surfaceElevated,
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
