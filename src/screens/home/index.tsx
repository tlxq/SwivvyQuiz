import { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/colors';
import { homeStyles } from '@/styles/screens/homeStyles';
import { Button } from '@/components/ui/Button';
import { useTriviaCategories } from '@/hooks/useTriviaCategories';
import type { TriviaCategory } from '@/types/trivia';

// Typed tuple so LinearGradient's colors prop doesn't widen to string[]
const GRADIENT: [string, string] = [colors.primary, colors.secondary];

export default function HomeScreen() {
  const router = useRouter();
  // Controls which phase is visible: welcome splash vs. category picker
  const [entered, setEntered] = useState(false);
  const { categories, loading, error, load } = useTriviaCategories();

  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  // Reused for the initial splash entrance and again when categories arrive
  const animateIn = useCallback((): void => {
    opacity.setValue(0);
    translateY.setValue(20);
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => { animateIn(); }, [animateIn]);

  // Re-animate once the category list is ready so it fades in rather than snapping
  useEffect(() => {
    if (categories.length > 0) animateIn();
  }, [categories.length, animateIn]);

  const handleEnter = (): void => {
    setEntered(true);
    void load();
  };

  const handleCategory = (cat: TriviaCategory): void => {
    // replace (not push) so the splash is removed from the back stack —
    // pressing back from the quiz won't return to the category list
    router.replace({
      pathname: '/(tabs)/quiz',
      params: { categoryId: String(cat.id), categoryName: cat.name },
    });
  };

  return (
    <LinearGradient
      colors={GRADIENT}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={homeStyles.container}
    >
      {!entered ? (
        <Animated.View style={[homeStyles.content, { opacity, transform: [{ translateY }] }]}>
          <Text style={homeStyles.emoji}>🧠</Text>
          <Text style={homeStyles.title}>Welcome to SwivvyQuiz!</Text>
          <Text style={homeStyles.subtitle}>Test your knowledge across categories</Text>
          <View style={homeStyles.buttonContainer}>
            <Button label="Press here to enter" onPress={handleEnter} variant="secondary" />
          </View>
        </Animated.View>

      ) : loading ? (
        <View style={homeStyles.content}>
          {/* White spinner — primary-colour would disappear against the indigo gradient */}
          <ActivityIndicator size="large" color={colors.surface} />
        </View>

      ) : error ? (
        <View style={homeStyles.content}>
          <Text style={homeStyles.subtitle}>{error}</Text>
          <View style={homeStyles.buttonContainer}>
            <Button label="Retry" onPress={() => void load()} variant="secondary" />
          </View>
        </View>

      ) : (
        <ScrollView
          style={homeStyles.scroll}
          contentContainerStyle={homeStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity, transform: [{ translateY }], width: '100%' }}>
            <Text style={homeStyles.title}>Choose a Category</Text>
            <View style={homeStyles.buttonContainer}>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  label={cat.name}
                  onPress={() => handleCategory(cat)}
                  variant="outline"
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}
