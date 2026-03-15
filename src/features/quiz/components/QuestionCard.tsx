import React from 'react';
import { View, Text } from 'react-native';
import { quizStyles } from '@/theme';
import type { TriviaQuestion } from '../quiz.types';

interface QuestionCardProps {
  question: TriviaQuestion;
}

/**
 * QuestionCard - Pure display card for the quiz question.
 * Uses centralized theme styles for a consistent look.
 */
function QuestionCardComponent({ question }: QuestionCardProps) {
  return (
    <View style={quizStyles.questionCard}>
      <Text style={quizStyles.questionDifficulty}>
        {question.difficulty} • {question.category}
      </Text>
      <Text style={quizStyles.questionText}>{question.question}</Text>
    </View>
  );
}

export const QuestionCard = React.memo(QuestionCardComponent);
