import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNumber } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';
import { GradientButton } from '../components/GradientButton';
import { MysticInput } from '../components/MysticInput';
import { LanguageSelector } from '../components/LanguageSelector';

export const WelcomeScreen: React.FC = () => {
    const { setSecretNumber, setCurrentScreen } = useNumber();
    const { t } = useLanguage();
    const [inputValue, setInputValue] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSubmit = () => {
        const num = parseInt(inputValue);
        if (num >= 1 && num <= 999) {
            Keyboard.dismiss();
            setSecretNumber(inputValue);
            setCurrentScreen('questions');
        }
    };

    const isValidNumber = () => {
        const num = parseInt(inputValue);
        return num >= 1 && num <= 999;
    };

    const handleBackgroundPress = () => {
        if (inputRef.current?.isFocused()) {
            Keyboard.dismiss();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <LinearGradient
                colors={['#0a0a0f', '#141420', '#1a1a2e']}
                style={styles.container}
            >
                <LanguageSelector />
                <SafeAreaView style={styles.safeArea}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <Animated.View
                            style={[
                                styles.header,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }]
                                }
                            ]}
                        >
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>🐥</Text>
                            </View>
                            <Text style={styles.title}>{t.title}</Text>
                            <Text style={styles.subtitle}>{t.subtitle}</Text>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.inputContainer,
                                { opacity: fadeAnim }
                            ]}
                        >
                            <Text style={styles.instruction}>
                                {t.instruction}
                            </Text>

                            <MysticInput
                                ref={inputRef}
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text.replace(/[^0-9]/g, ''))}
                                placeholder="•••"
                                keyboardType="number-pad"
                                maxLength={3}
                            />

                            <Text style={styles.hint}>
                                {t.hint}
                            </Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: fadeAnim }}>
                            <GradientButton
                                title={t.continueButton}
                                onPress={handleSubmit}
                                disabled={!isValidNumber()}
                            />
                        </Animated.View>
                    </KeyboardAvoidingView>
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
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    icon: {
        fontSize: 36,
        color: '#6366f1',
    },
    title: {
        fontSize: 32,
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 8,
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
    },
    instruction: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 26,
        fontWeight: '300',
    },
    hint: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.3)',
        marginTop: 20,
    },
});
