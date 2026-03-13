import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppIcon } from '@/components/ui';
import { ICONS } from '@/theme';
import { colors, pickerStyles as styles } from '@/theme';
import type { TriviaCategory } from '@/features/quiz';

interface CategoryPickerProps {
  categories: TriviaCategory[];
  selected: TriviaCategory;
  onSelect: (cat: TriviaCategory) => void;
}

/**
 * CategoryPicker - Specialized selector for quiz categories.
 * Styles moved to @/styles/components.ts for registry compliance.
 */
export default function CategoryPicker({
  categories,
  selected,
  onSelect,
}: CategoryPickerProps) {
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
        <AppIcon
          icon={open ? ICONS.chevronUp : ICONS.chevronDown}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Dropdown — only mounted while open to keep the tree lean */}
      {open && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled>
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
      )}
    </View>
  );
}
