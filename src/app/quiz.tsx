import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { theme } from '@/theme';
import { triviaService } from '@/services';
import { useAsync, useQuizGame, useHighScore } from '@/hooks';
import { Screen, Button, Card, ProgressBar } from '@/components/ui';
import { TriviaResponse } from '@/types';
import { QUIZ_SETTINGS } from '@/config';
import { decodeHTML } from '@/lib';

export default function QuizScreen() {
  // Get id and category from the previous screen
  const { id, categoryName } = useLocalSearchParams<{
    id: string;
    categoryName: string;
  }>();

  // Handle the API call for the questions
  const {
    data: apiRes,
    loading,
    error,
    execute,
  } = useAsync<TriviaResponse>(true);

  // Hook for saving high scores
  const { saveScore, checkIfTopFive } = useHighScore();

  // All game logic (score, timer, questions)
  const {
    questions,
    currentIndex,
    score,
    userAnswers,
    isGameOver,
    timeLeft,
    submitAnswer,
  } = useQuizGame(apiRes?.results || []);

  const [username, setUsername] = useState('');
  const [isTopScore, setIsTopScore] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch questions when the screen loads
  useEffect(() => {
    id && execute(triviaService.getQuestions(Number(id)));
  }, [id, execute]);

  // Check if it's a top five score when the game ends
  useEffect(() => {
    isGameOver && checkIfTopFive(score).then(setIsTopScore);
  }, [isGameOver, score]);

  // Function to save the score
  const handleSaveScore = async () => {
    if (!username.trim())
      return Alert.alert('Required', 'Please enter your name');

    setIsSaving(true);
    try {
      await saveScore({
        username,
        score,
        category: categoryName || 'General',
        timestamp: Date.now(),
      });
      router.replace('/highscore'); // Navigate to high score list
    } catch (e) {
      Alert.alert('Error', 'Failed to save score');
    } finally {
      setIsSaving(false);
    }
  };

  const currentQuestionText = useMemo(
    () =>
      questions[currentIndex]
        ? decodeHTML(questions[currentIndex].question)
        : '',
    [questions, currentIndex],
  );

  // If the game is over, show the results screen
  if (isGameOver) {
    return (
      <View style={[theme.styles.container, { paddingTop: 60 }]}>
        <Text style={[theme.typography.h1, { textAlign: 'center' }]}>
          Game Over!
        </Text>
        <Text
          style={[
            theme.typography.h2,
            {
              color: theme.colors.primary,
              textAlign: 'center',
              marginBottom: 10,
            },
          ]}
        >
          Final Score: {score}
        </Text>

        {/* Display all answered questions */}
        <ScrollView
          style={{ flex: 1, marginVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correct_answer;
            return (
              <Card
                key={index}
                style={{
                  marginBottom: 10,
                  borderLeftWidth: 5,
                  borderLeftColor: isCorrect
                    ? theme.colors.success
                    : theme.colors.error,
                }}
              >
                <Text style={theme.typography.caption}>
                  Question {index + 1}
                </Text>
                <Text
                  style={[theme.typography.bodyBold, { marginVertical: 4 }]}
                >
                  {decodeHTML(q.question)}
                </Text>
                <View style={theme.styles.row}>
                  <Text style={theme.typography.caption}>Your answer: </Text>
                  <Text
                    style={[
                      theme.typography.caption,
                      {
                        color: isCorrect
                          ? theme.colors.success
                          : theme.colors.error,
                      },
                    ]}
                  >
                    {userAnswer || 'N/A'}
                  </Text>
                </View>
                {!isCorrect && (
                  <Text
                    style={[
                      theme.typography.caption,
                      { color: theme.colors.success },
                    ]}
                  >
                    Correct: {q.correct_answer}
                  </Text>
                )}
              </Card>
            );
          })}
        </ScrollView>

        {/* If it's a high score, show the name input field */}
        {isTopScore ? (
          <Card
            style={{ width: '100%', gap: theme.spacing.md, marginBottom: 20 }}
          >
            <Text style={theme.typography.bodyBold}>New Highscore!</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={username}
              onChangeText={setUsername}
              maxLength={15}
              placeholderTextColor={theme.colors.textSecondary}
            />
            <Button
              label="Save Score"
              onPress={handleSaveScore}
              loading={isSaving}
            />
          </Card>
        ) : (
          <View style={{ width: '100%', marginTop: 10, marginBottom: 20 }}>
            <Button label="Back" onPress={() => router.replace('/(tabs)')} />
          </View>
        )}
      </View>
    );
  }

  // The quiz screen while playing
  return (
    <Screen
      loading={loading && !questions.length}
      error={error}
      onBack={router.back}
    >
      <View style={theme.styles.spaceBetween}>
        <Text style={theme.typography.caption}>{categoryName}</Text>
        <Text style={theme.typography.bodyBold}>Score: {score}</Text>
      </View>

      {/* Timer and progress bar */}
      <View style={{ marginVertical: theme.spacing.xl }}>
        <Text style={[theme.typography.h2, { textAlign: 'center' }]}>
          {timeLeft}s
        </Text>
        <ProgressBar progress={timeLeft / QUIZ_SETTINGS.TIMER_LIMIT} />
      </View>

      {/* The question card with True/False buttons */}
      <Card style={styles.questionCard}>
        <Text style={theme.typography.caption}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
        <ScrollView style={{ marginVertical: 20, maxHeight: 250 }}>
          <Text style={[theme.typography.h3, { textAlign: 'center' }]}>
            {currentQuestionText}
          </Text>
        </ScrollView>
        <View style={theme.styles.row}>
          <Button
            label="True"
            variant="success"
            onPress={() => submitAnswer('True')}
            style={{ flex: 1, marginRight: 8 }}
          />
          <Button
            label="False"
            variant="danger"
            onPress={() => submitAnswer('False')}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  questionCard: { flex: 1, maxHeight: 500, justifyContent: 'space-between' },
  input: {
    backgroundColor: theme.colors.surfaceElevated,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontFamily: 'Poppins_400Regular',
  },
});
