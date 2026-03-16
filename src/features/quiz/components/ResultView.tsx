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
import { Button, AppIcon } from '@/components/ui';
import { theme } from '@/theme';
import { MAX_SCORE } from '../quiz.constants';
import type { ResultViewProps } from '../quiz.types';

export function ResultView({
  score,
  showModal,
  onSave,
  loading = false,
}: ResultViewProps) {
  const [username, setUsername] = useState('');
  const percentage = Math.round((score / MAX_SCORE) * 100);

  // Välj ikon från theme utifrån score
  let trophyIcon = theme.icons.muscle;
  if (percentage >= 80) trophyIcon = theme.icons.trophy;
  else if (percentage >= 50) trophyIcon = theme.icons.target;

  const handleSave = useCallback(() => {
    onSave(username.trim() || 'Anonymous');
  }, [username, onSave]);

  const handleSkip = useCallback(() => {
    onSave('Anonymous');
  }, [onSave]);

  return (
    <View style={[theme.styles.container, theme.styles.centered]}>
      <View style={{ marginBottom: theme.spacing.lg }}>
        <AppIcon icon={trophyIcon} size={80} />
      </View>
      <Text style={theme.typography.h1}>{score}</Text>
      <Text
        style={[theme.typography.subtitle, { marginBottom: theme.spacing.xl }]}
      >
        out of {MAX_SCORE} points
      </Text>
      <View
        style={{
          width: '100%',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Button
          label="Play Again"
          onPress={() => router.replace('/(tabs)')}
          disabled={loading}
        />
        <Button
          label="Highscores"
          onPress={() => router.push('/(tabs)/highscore')}
          disabled={loading}
        />
      </View>
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[
            theme.styles.container,
            {
              backgroundColor: theme.colors.overlayDark,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderTopLeftRadius: theme.spacing.xl,
                borderTopRightRadius: theme.spacing.xl,
                padding: theme.spacing.xl,
                paddingBottom: theme.spacing.xxl,
              }}
            >
              <Text
                style={[
                  theme.typography.h2,
                  { marginBottom: theme.spacing.sm },
                ]}
              >
                Top 5 Score
              </Text>
              <Text
                style={[
                  theme.typography.body,
                  {
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.md,
                  },
                ]}
              >
                Enter your name for the leaderboard:
              </Text>
              <TextInput
                style={{
                  backgroundColor: theme.colors.surfaceElevated,
                  borderRadius: theme.spacing.md,
                  padding: theme.spacing.md,
                  color: theme.colors.text,
                  fontSize: theme.typography.body.fontSize,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  marginBottom: theme.spacing.lg,
                }}
                placeholder="Your Name"
                placeholderTextColor={theme.colors.textSecondary}
                value={username}
                onChangeText={setUsername}
                maxLength={20}
                autoFocus
                editable={!loading}
              />
              <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <Button
                  label="Skip"
                  onPress={handleSkip}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
                <Button
                  label="Save"
                  onPress={handleSave}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
