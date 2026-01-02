import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNumber } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';
import { GradientButton } from '../components/GradientButton';

export const QuestionsScreen: React.FC = () => {
    const { setCurrentScreen } = useNumber();
    const { t } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [numberInput, setNumberInput] = useState('');
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const questions = t.questions.map((question, index) => ({
        id: index + 1,
        question,
        type: index === 5 ? 'number' : 'yesno' as 'yesno' | 'number',
    }));

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const animateTransition = (callback: () => void) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            callback();
            slideAnim.setValue(20);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const goToNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            animateTransition(() => {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setNumberInput('');
            });
        } else {
            setCurrentScreen('thinking');
        }
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setTimeout(() => {
            goToNext();
        }, 250);
    };

    const handleNext = () => {
        goToNext();
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <LinearGradient
                colors={['#0a0a0f', '#141420', '#1a1a2e']}
                style={styles.container}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.content}>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <Animated.View
                                    style={[
                                        styles.progressFill,
                                        { width: `${progress}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {currentQuestionIndex + 1} / {questions.length}
                            </Text>
                        </View>

                        <Animated.View
                            style={[
                                styles.questionContainer,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateX: slideAnim }]
                                }
                            ]}
                        >
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>🐥</Text>
                            </View>
                            <Text style={styles.analyzing}>{t.analyzing}</Text>

                            <Text style={styles.question}>{currentQuestion.question}</Text>

                            {currentQuestion.type === 'yesno' ? (
                                <View style={styles.optionsRow}>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            selectedOption === 'yes' && styles.optionButtonSelected
                                        ]}
                                        onPress={() => handleOptionSelect('yes')}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selectedOption === 'yes' && styles.optionTextSelected
                                            ]}
                                        >
                                            {t.yes}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            selectedOption === 'no' && styles.optionButtonSelected
                                        ]}
                                        onPress={() => handleOptionSelect('no')}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                selectedOption === 'no' && styles.optionTextSelected
                                            ]}
                                        >
                                            {t.no}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.numberInputContainer}>
                                    <TextInput
                                        style={styles.numberInput}
                                        value={numberInput}
                                        onChangeText={(text) => setNumberInput(text.replace(/[^0-9]/g, ''))}
                                        placeholder="•••"
                                        placeholderTextColor="rgba(255,255,255,0.2)"
                                        keyboardType="number-pad"
                                        maxLength={3}
                                    />
                                    <Text style={styles.numberHint}>
                                        {t.numberHint}
                                    </Text>
                                </View>
                            )}
                        </Animated.View>

                        {currentQuestion.type === 'number' && (
                            <GradientButton
                                title={t.guessButton}
                                onPress={handleNext}
                                disabled={numberInput.trim() === '' || parseInt(numberInput) < 1 || parseInt(numberInput) > 999}
                            />
                        )}
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    progressContainer: {
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6366f1',
        borderRadius: 1,
    },
    progressText: {
        color: 'rgba(255,255,255,0.3)',
        marginTop: 12,
        fontSize: 12,
        letterSpacing: 2,
    },
    questionContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        fontSize: 24,
        color: '#6366f1',
    },
    analyzing: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: 30,
    },
    question: {
        fontSize: 22,
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 32,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
    },
    optionButton: {
        flex: 1,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.03)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButtonSelected: {
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
    },
    optionText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '400',
    },
    optionTextSelected: {
        color: '#fff',
    },
    numberInputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    numberInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        color: '#fff',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        letterSpacing: 8,
    },
    numberHint: {
        marginTop: 16,
        fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
    },
});
