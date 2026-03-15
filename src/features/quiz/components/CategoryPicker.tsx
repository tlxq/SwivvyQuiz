import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '@/components/ui';
import { ICONS, colors, pickerStyles as styles } from '@/theme';
import type { TriviaCategory } from '../quiz.types';

interface CategoryPickerProps {
  categories: TriviaCategory[];
  selected: TriviaCategory;
  onSelect: (cat: TriviaCategory) => void;
}

/**
 * CategoryPicker - Specialized selector for quiz categories.
 * Improved layout and accessibility.
 */
export function CategoryPicker({
  categories,
  selected,
  onSelect,
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const choose = useCallback((cat: TriviaCategory) => {
    onSelect(cat);
    setOpen(false);
  }, [onSelect]);

  return (
    <View>
      <Text style={styles.label}>Selected Category</Text>

      <TouchableOpacity
        style={styles.pill}
        onPress={toggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Category: ${selected.name}. Tap to change.`}
      >
        <Text style={styles.pillText} numberOfLines={1}>{selected.name}</Text>
        <AppIcon
          icon={open ? ICONS.chevronUp : ICONS.chevronDown}
          size={20}
          color={colors.primary}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <ScrollView 
            nestedScrollEnabled 
            showsVerticalScrollIndicator={false}
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
                  <Text
                    style={[
                      styles.itemText,
                      isSelected && styles.itemTextSelected,
                    ]}
                  >
                    {cat.name}
                  </Text>
                  {isSelected && (
                    <AppIcon
                      icon={ICONS.check}
                      size={18}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
