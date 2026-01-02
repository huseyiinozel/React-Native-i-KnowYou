import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);

    const currentLang = languages.find(l => l.code === language);

    const handleSelect = (code: Language) => {
        setLanguage(code);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={styles.flag}>{currentLang?.flag}</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.langOption,
                                    language === lang.code && styles.langOptionSelected,
                                ]}
                                onPress={() => handleSelect(lang.code)}
                            >
                                <Text style={styles.langFlag}>{lang.flag}</Text>
                                <Text
                                    style={[
                                        styles.langLabel,
                                        language === lang.code && styles.langLabelSelected,
                                    ]}
                                >
                                    {lang.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    flag: {
        fontSize: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        padding: 8,
        minWidth: 200,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    langOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    langOptionSelected: {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    langFlag: {
        fontSize: 24,
        marginRight: 14,
    },
    langLabel: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
    },
    langLabelSelected: {
        color: '#fff',
        fontWeight: '500',
    },
});
