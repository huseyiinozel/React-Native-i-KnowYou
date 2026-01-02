import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Animated,
    Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNumber } from '../context/NumberContext';
import { useLanguage } from '../context/LanguageContext';

export const ThinkingScreen: React.FC = () => {
    const { setCurrentScreen } = useNumber();
    const { t } = useLanguage();
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [messageIndex, setMessageIndex] = React.useState(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Change message
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % t.thinkingMessages.length);
        }, 1200);

        const timer = setTimeout(() => {
            setCurrentScreen('result');
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(messageInterval);
        };
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient
            colors={['#0a0a0f', '#141420', '#1a1a2e']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <View style={styles.animationContainer}>
                        <Animated.View
                            style={[
                                styles.ring,
                                { transform: [{ rotate: spin }] }
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.innerCircle,
                                { transform: [{ scale: pulseAnim }] }
                            ]}
                        >
                            <Text style={styles.icon}>🐥</Text>
                        </Animated.View>
                    </View>

                    <Text style={styles.title}>{t.thinkingTitle}</Text>

                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>{t.thinkingMessages[messageIndex]}...</Text>
                    </View>

                    <View style={styles.loadingContainer}>
                        <Animated.View
                            style={[
                                styles.loadingBar,
                                {
                                    opacity: pulseAnim.interpolate({
                                        inputRange: [1, 1.1],
                                        outputRange: [0.3, 0.8],
                                    }),
                                }
                            ]}
                        />
                    </View>
                </Animated.View>
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
    animationContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    ring: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: 'transparent',
        borderTopColor: '#6366f1',
        borderRightColor: 'rgba(99, 102, 241, 0.3)',
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        color: '#6366f1',
    },
    title: {
        fontSize: 24,
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 2,
    },
    messageContainer: {
        height: 40,
        justifyContent: 'center',
        marginTop: 20,
    },
    message: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
    },
    loadingContainer: {
        width: 60,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        marginTop: 40,
        overflow: 'hidden',
    },
    loadingBar: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6366f1',
    },
});
