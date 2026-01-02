import React, { useEffect, useRef, forwardRef } from 'react';
import { TextInput, StyleSheet, Animated, TextInputProps, TouchableWithoutFeedback } from 'react-native';

interface MysticInputProps extends TextInputProps {
    glowColor?: string;
}

export const MysticInput = forwardRef<TextInput, MysticInputProps>(({
    glowColor = '#6366f1',
    style,
    ...props
}, ref) => {
    const glowAnimation = useRef(new Animated.Value(0)).current;
    const internalInputRef = useRef<TextInput>(null);

    const inputRef = (ref as React.RefObject<TextInput>) || internalInputRef;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnimation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnimation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const borderColor = glowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0.6)'],
    });

    const handlePress = () => {
        inputRef.current?.focus();
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View
                style={[
                    styles.container,
                    { borderColor }
                ]}
            >
                <TextInput
                    ref={inputRef}
                    style={[styles.input, style]}
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    {...props}
                />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    input: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 40,
        letterSpacing: 8,
    },
});
