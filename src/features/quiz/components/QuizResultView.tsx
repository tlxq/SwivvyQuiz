import React, { useState } from 'react';
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
import { MAX_SCORE } from '@/features/quiz';

interface ResultViewProps {
  score: number;
  showModal: boolean;
  onSave: (name: string) => void;
  loading?: boolean;
}

function ResultViewComponent({
  score,
  showModal,
  onSave,
  loading = false,
}: ResultViewProps) {
  const [username, setUsername] = useState('');
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const trophy = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎯' : '💪';

  const handleSave = () => {
    onSave(username.trim() || 'Anonymous');
  };

  const handleSkip = () => {
    onSave('Anonymous');
  };

  return (
    <View style={resultStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={resultStyles.contentCenter}
        scrollEnabled={false}
      >
        <Text style={resultStyles.trophy}>{trophy}</Text>
        <Text style={resultStyles.score}>{score}</Text>
        <Text style={resultStyles.scoreLabel}>out of {MAX_SCORE} points</Text>

        <View style={resultStyles.buttonGroup}>
          <Button
            label="Play Again"
            variant="secondary"
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
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={resultStyles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={resultStyles.scrollViewContent}
            scrollEnabled={true}
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
                  label="Save"
                  variant="primary"
                  onPress={handleSave}
                  loading={loading}
                  style={resultStyles.flexBtn}
                />
                <Button
                  label="Skip"
                  variant="secondary"
                  onPress={handleSkip}
                  disabled={loading}
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

export default React.memo(ResultViewComponent);
