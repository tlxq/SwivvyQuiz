import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { theme } from '@/theme';
import { triviaService } from '@/services/triviaService';
import { useQuizGame } from '@/hooks/useQuizGame';
import { useHighScore } from '@/hooks/useHighScore';
import { useAsync } from '@/hooks/useAsync';
import { LoadingSpinner, Button, Card, ProgressBar } from '@/components/ui';
import { TriviaResponse } from '@/types';

export default function QuizScreen() {
  const { id, categoryName } = useLocalSearchParams<{ id: string, categoryName: string }>();
  const { data: apiResponse, loading, error, execute } = useAsync<TriviaResponse>();
  const { saveScore, checkIfTopFive } = useHighScore();
  
  // Quiz game state
  const { questions, currentIndex, score, isGameOver, timeLeft, submitAnswer } = useQuizGame(apiResponse?.results || []);

  // Highscore state
  const [username, setUsername] = useState('');
  const [isTopScore, setIsTopScore] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      execute(triviaService.getQuestions(Number(id)));
    }
  }, [id, execute]);

  useEffect(() => {
    if (isGameOver) {
      checkIfTopFive(score).then(setIsTopScore);
    }
  }, [isGameOver, score, checkIfTopFive]);

  const handleSaveScore = async () => {
    if (!username.trim()) {
      Alert.alert('Required', 'Please enter your name');
      return;
    }
    setIsSaving(true);
    try {
      await saveScore({
        username,
        score,
        category: categoryName || 'General',
        timestamp: Date.now(),
      });
      router.replace('/highscore');
    } catch (e) {
      Alert.alert('Error', 'Failed to save score');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && questions.length === 0) return <LoadingSpinner />;
  
  if (error) return (
    <View style={theme.styles.centerScreen}>
      <Text style={[theme.typography.body, { marginBottom: 20 }]}>{error}</Text>
      <Button label="Go Back" onPress={() => router.back()} />
    </View>
  );

  if (isGameOver) {
    return (
      <View style={theme.styles.container}>
        <View style={[theme.styles.centered, { flex: 1 }]}>
          <Text style={theme.typography.h1}>Game Over!</Text>
          <Text style={[theme.typography.h2, { color: theme.colors.primary, marginBottom: 20 }]}>
            Final Score: {score}
          </Text>
          
          {isTopScore ? (
            <Card style={styles.highscoreForm}>
              <Text style={theme.typography.bodyBold}>New Highscore!</Text>
              <Text style={theme.typography.caption}>Enter your name for the leaderboard</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor={theme.colors.textSecondary}
                value={username}
                onChangeText={setUsername}
                maxLength={15}
              />
              <Button label="Save Score" onPress={handleSaveScore} loading={isSaving} />
            </Card>
          ) : (
            <View style={{ marginTop: 20, width: '100%' }}>
              <Text style={[theme.typography.body, { textAlign: 'center', marginBottom: 20 }]}>Good effort!</Text>
              <Button label="Back to Setup" onPress={() => router.replace('/(tabs)')} />
            </View>
          )}
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <View style={theme.styles.container}>
      <View style={styles.header}>
        <Text style={theme.typography.caption}>{categoryName}</Text>
        <Text style={theme.typography.bodyBold}>Score: {score}</Text>
      </View>
      
      <View style={styles.timerContainer}>
        <Text style={[theme.typography.h2, { textAlign: 'center' }]}>{timeLeft}s</Text>
        <ProgressBar progress={timeLeft / 15} />
      </View>

      <Card style={styles.questionCard}>
        <Text style={theme.typography.caption}>Question {currentIndex + 1} / {questions.length}</Text>
        <ScrollView style={{ maxHeight: 250, marginVertical: 20 }}>
          <Text style={[theme.typography.h3, { textAlign: 'center' }]}>
            {currentQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
          </Text>
        </ScrollView>
        
        <View style={styles.buttonRow}>
          <Button 
            label="True" 
            variant="success" 
            onPress={() => submitAnswer('True')} 
            style={styles.gameButton}
          />
          <Button 
            label="False" 
            variant="danger" 
            onPress={() => submitAnswer('False')} 
            style={styles.gameButton}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    marginTop: 20,
  },
  timerContainer: {
    marginBottom: theme.spacing.xl,
  },
  questionCard: {
    flex: 1,
    maxHeight: 500,
    padding: theme.spacing.lg,
    justifyContent: 'space-between'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  gameButton: {
    flex: 1,
  },
  highscoreForm: {
    width: '100%',
    marginTop: 10,
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surfaceElevated,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontFamily: 'Poppins_400Regular',
  }
});
