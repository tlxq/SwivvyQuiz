import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '@/theme';
import type { TriviaQuestion } from '../quiz.types';

interface QuestionCardProps {
  question: TriviaQuestion;
}

export const QuestionCard = React.memo(({ question }: QuestionCardProps) => (
  <View style={[theme.styles.card, theme.styles.spaceBelowXl]}>
    <Text style={[theme.typography.caption, theme.styles.spaceBelowXl]}>
      {question.difficulty} • {question.category}
    </Text>
    <Text style={theme.typography.h3}>{question.question}</Text>
  </View>
));
