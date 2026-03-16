import { Pressable, Text } from 'react-native';
import { theme } from '@/theme';

export function Button({
  label,
  onPress,
  disabled,
  style,
  labelStyle,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  labelStyle?: any;
}) {
  return (
    <Pressable
      style={[theme.styles.button, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[theme.styles.buttonText, labelStyle]}>{label}</Text>
    </Pressable>
  );
}
