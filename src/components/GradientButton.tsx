import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    style,
    disabled = false
}) => {
    const animatedScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animatedScale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedScale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[{ transform: [{ scale: animatedScale }] }, style]}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                disabled={disabled}
            >
                <LinearGradient
                    colors={disabled ? ['#2a2a3a', '#1f1f2e'] : ['#4f46e5', '#6366f1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 12,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 1,
    },
    disabledText: {
        color: 'rgba(255,255,255,0.3)',
    },
});
