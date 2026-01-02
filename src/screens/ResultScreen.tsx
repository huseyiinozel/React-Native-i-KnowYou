import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNumber } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';
import { GradientButton } from '../components/GradientButton';

export const ResultScreen: React.FC = () => {
    const { secretNumber, resetGame } = useNumber();
    const { t } = useLanguage();
    const [revealedDigits, setRevealedDigits] = useState<string[]>([]);
    const [showNumber, setShowNumber] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const digits = secretNumber.split('');
        let delay = 0;

        digits.forEach((digit, index) => {
            setTimeout(() => {
                setRevealedDigits(prev => [...prev, digit]);

                if (index === digits.length - 1) {
                    setTimeout(() => {
                        setShowNumber(true);
                        triggerFinalAnimation();
                    }, 400);
                }
            }, delay);
            delay += 500;
        });
    }, []);

    const triggerFinalAnimation = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <LinearGradient
            colors={['#0a0a0f', '#141420', '#1a1a2e']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🐥</Text>
                    </View>
                    <Text style={styles.label}>{t.resultLabel}</Text>

                    <View style={styles.digitContainer}>
                        {revealedDigits.map((digit, index) => (
                            <View key={index} style={styles.digitBox}>
                                <Text style={styles.digit}>{digit}</Text>
                            </View>
                        ))}
                        {!showNumber && secretNumber.split('').slice(revealedDigits.length).map((_, index) => (
                            <View key={`empty-${index}`} style={[styles.digitBox, styles.emptyBox]}>
                                <Text style={styles.questionMark}>•</Text>
                            </View>
                        ))}
                    </View>

                    {showNumber && (
                        <Animated.View
                            style={[
                                styles.resultContainer,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }]
                                }
                            ]}
                        >
                            <Text style={styles.resultText}>
                                {t.resultQuestion}
                            </Text>
                        </Animated.View>
                    )}

                    {showNumber && (
                        <Animated.View style={{ opacity: fadeAnim, marginTop: 50 }}>
                            <GradientButton
                                title={t.tryAgain}
                                onPress={resetGame}
                            />
                        </Animated.View>
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
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
    label: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 30,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    digitContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    digitBox: {
        width: 70,
        height: 90,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyBox: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    digit: {
        fontSize: 36,
        fontWeight: '300',
        color: '#fff',
    },
    questionMark: {
        fontSize: 24,
        color: 'rgba(255,255,255,0.2)',
    },
    resultContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        fontWeight: '300',
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
    },
});
