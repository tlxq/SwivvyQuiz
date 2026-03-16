import { Pressable, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/theme';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export function Button({
  label,
  onPress,
  disabled,
  style,
  labelStyle,
}: ButtonProps) {
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
