import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui';
import { colors, resultStyles } from '@/theme';
import { Routes } from '@/config';
import { MAX_SCORE } from '../quiz.constants';
import type { ResultViewProps } from '../quiz.types';

/**
 * ResultView - Displays quiz final score and top-5 leaderboard modal.
 */
function ResultViewComponent({
  score,
  showModal,
  onSave,
  loading = false,
}: ResultViewProps) {
  const [username, setUsername] = useState('');
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const trophy = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎯' : '💪';

  const handleSave = useCallback(() => {
    onSave(username.trim() || 'Anonymous');
  }, [username, onSave]);

  const handleSkip = useCallback(() => {
    onSave('Anonymous');
  }, [onSave]);

  return (
    <View style={resultStyles.screenContainer}>
      <View style={resultStyles.contentCenter}>
        <Text style={resultStyles.trophy}>{trophy}</Text>
        <Text style={resultStyles.score}>{score}</Text>
        <Text style={resultStyles.scoreLabel}>out of {MAX_SCORE} points</Text>

        <View style={resultStyles.buttonGroup}>
          <Button
            label="Play Again"
            variant="primary"
            onPress={() => router.replace(Routes.tabs)}
            disabled={loading}
          />
          <Button
            label="Highscores"
            variant="outline"
            onPress={() => router.push(Routes.highscore)}
            disabled={loading}
          />
        </View>
      </View>

      <Modal 
        visible={showModal} 
        transparent 
        animationType="slide"
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={resultStyles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={resultStyles.scrollViewContent}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={resultStyles.modalContent}>
              <Text style={resultStyles.modalTitle}>🎉 Top 5 Score!</Text>
              <Text style={resultStyles.modalDescription}>
                Enter your name for the leaderboard:
              </Text>

              <View style={resultStyles.inputContainer}>
                <TextInput
                  style={resultStyles.input}
                  placeholder="Your Name"
                  placeholderTextColor={colors.textSecondary}
                  value={username}
                  onChangeText={setUsername}
                  maxLength={20}
                  autoFocus
                  editable={!loading}
                />
              </View>

              <View style={resultStyles.modalButtonGroup}>
                <Button
                  label="Skip"
                  variant="secondary"
                  onPress={handleSkip}
                  disabled={loading}
                  style={resultStyles.flexBtn}
                />
                <Button
                  label="Save"
                  variant="primary"
                  onPress={handleSave}
                  loading={loading}
                  style={resultStyles.flexBtn}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export const ResultView = React.memo(ResultViewComponent);
