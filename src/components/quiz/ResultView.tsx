import { View, Text, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Button } from '@/components/ui';
import { resultStyles } from '@/styles/screens';
import { colors } from '@/styles/colors';
import { Routes } from '@/constants/routes';
import { MAX_SCORE } from '@/constants/quiz';

interface ResultViewProps {
  score: number;
  showModal: boolean;
  onSave: (name: string) => void;
}

export function ResultView({ score, showModal, onSave }: ResultViewProps) {
  const [username, setUsername] = useState('');
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const trophy = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎯' : '💪';

  const handleSave = () => {
    onSave(username || 'Anonymous');
  };

  return (
    <View style={resultStyles.screenContainer}>
      <ScrollView contentContainerStyle={resultStyles.contentCenter} scrollEnabled={false}>
        <Text style={resultStyles.trophy}>{trophy}</Text>
        <Text style={resultStyles.score}>{score}</Text>
        <Text style={resultStyles.scoreLabel}>out of {MAX_SCORE} points</Text>

        <View style={resultStyles.buttonGroup}>
          <Button label="Play Again" variant="secondary" onPress={() => router.replace(Routes.tabs)} />
          <Button label="Highscores" variant="outline" onPress={() => router.push(Routes.highscore)} />
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
              <Text style={resultStyles.modalDescription}>Enter your name for the leaderboard:</Text>
              
              <View style={resultStyles.inputContainer}>
                <TextInput 
                  style={resultStyles.input}
                  placeholder="Your Name" 
                  placeholderTextColor={colors.textSecondary}
                  value={username} 
                  onChangeText={setUsername} 
                  maxLength={20}
                  autoFocus
                  editable={!false}
                />
              </View>

              <View style={resultStyles.modalButtonGroup}>
                <TouchableOpacity 
                  onPress={handleSave} 
                  style={resultStyles.modalButtonSave}
                >
                  <Text style={resultStyles.modalButtonSaveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => onSave('Anonymous')} 
                  style={resultStyles.modalButtonSkip}
                >
                  <Text style={resultStyles.modalButtonSkipText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
