import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useHighScore } from '@/hooks/useHighScore';
import { Button, ScreenWrapper } from '@/components/ui';
import { resultStyles } from '@/styles/screens/resultStyles';
import { MAX_SCORE } from '@/constants/quiz';
import { Routes } from '@/constants/routes';

export default function ResultScreen() {
  const { score, categoryId, categoryName } = useLocalSearchParams<{
    score?: string;
    categoryId?: string;
    categoryName?: string;
  }>();
  const numScore = score !== undefined ? Number(score) : 0;
  const { save } = useHighScore();

  // Save once on mount — save() only overwrites if this is a new personal best.
  useEffect(() => {
    if (categoryId !== undefined && categoryName !== undefined) {
      save({ categoryId, categoryName, score: numScore });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percentage = Math.round((numScore / MAX_SCORE) * 100);
  const trophy = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎯' : '💪';

  return (
    <ScreenWrapper>
      <View style={resultStyles.content}>
        <Text style={resultStyles.trophy}>{trophy}</Text>
        <Text style={resultStyles.title}>Quiz Complete!</Text>
        <Text style={resultStyles.scoreValue}>{numScore}</Text>
        <Text style={resultStyles.maxScore}>out of {MAX_SCORE} points</Text>

        <View style={resultStyles.buttons}>
          {/* replace keeps the back stack clean — goes to Game tab, not quiz questions */}
          <Button
            label="Play Again"
            variant="secondary"
            onPress={() => router.replace(Routes.tabs)}
          />
          <Button
            label="View Highscores"
            variant="outline"
            onPress={() => router.push(Routes.highscore)}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
