export type Language = 'tr' | 'en' | 'ru';

export interface Translations {
    title: string;
    subtitle: string;
    instruction: string;
    hint: string;
    continueButton: string;

    analyzing: string;
    yes: string;
    no: string;
    guessButton: string;
    numberHint: string;
    questions: string[];

    thinkingTitle: string;
    thinkingMessages: string[];

    resultLabel: string;
    resultQuestion: string;
    tryAgain: string;
}

export const translations: Record<Language, Translations> = {
    tr: {
        title: 'Seni Tanıyorum',
        subtitle: 'Hadi Başlayalım',
        instruction: '1 ile 999 arasında\nbir sayı düşün',
        hint: 'Kolay Olmasın!',
        continueButton: 'Devam Et',

        analyzing: 'Seni Bekliyorum',
        yes: 'Evet',
        no: 'Hayır',
        guessButton: 'Tahmin Et',
        numberHint: '1 ile 999 arasında farklı bir sayı',
        questions: [
            'Bu sayıyı seçerken ilk aklına gelen miydi?',
            'Sayı senin için özel bir anlam taşıyor mu?',
            'Sayı büyüdükçe sana daha mı güvenli geliyor?',
            'Bu sayıyı başkasına söylesen çekinir miydin?',
            'Sayının enerjisi yüksek mi sence?',
            'Şimdi aklına gelen ilk sayıyı yaz',
        ],

        thinkingTitle: 'Analiz Ediliyor',
        thinkingMessages: [
            'Sinir ağları taranıyor',
            'Veri analiz ediliyor',
            'Düşünce kalıpları işleniyor',
            'Nöral bağlantılar kuruluyor',
            'Sonuç hesaplanıyor',
        ],

        resultLabel: 'Benim Tahminim',
        resultQuestion: 'Bu sayıyı mı düşünüyordunuz?',
        tryAgain: 'Tekrar Dene',
    },

    en: {
        title: 'I Know You',
        subtitle: "Let's Begin",
        instruction: 'Think of a number\nbetween 1 and 999',
        hint: "Don't Make It Easy!",
        continueButton: 'Continue',

        analyzing: 'Waiting for You',
        yes: 'Yes',
        no: 'No',
        guessButton: 'Guess',
        numberHint: 'A different number between 1 and 999',
        questions: [
            'Was this the first number that came to mind?',
            'Does this number have a special meaning for you?',
            'Do bigger numbers make you feel safer?',
            'Would you hesitate to tell someone this number?',
            'Do you think this number has high energy?',
            'Now write the first number that comes to mind',
        ],

        thinkingTitle: 'Analyzing',
        thinkingMessages: [
            'Scanning neural networks',
            'Analyzing data',
            'Processing thought patterns',
            'Establishing neural connections',
            'Calculating result',
        ],

        resultLabel: 'My Guess',
        resultQuestion: 'Is this the number you were thinking of?',
        tryAgain: 'Try Again',
    },

    ru: {
        title: 'Я тебя знаю',
        subtitle: 'Давай начнём',
        instruction: 'Загадай число\nот 1 до 999',
        hint: 'Не упрощай!',
        continueButton: 'Продолжить',

        analyzing: 'Жду тебя',
        yes: 'Да',
        no: 'Нет',
        guessButton: 'Угадать',
        numberHint: 'Другое число от 1 до 999',
        questions: [
            'Это было первое число, которое пришло на ум?',
            'Это число имеет для тебя особый смысл?',
            'Большие числа кажутся тебе безопаснее?',
            'Ты бы постеснялся сказать это число кому-то?',
            'Как думаешь, у этого числа высокая энергия?',
            'Теперь напиши первое число, которое придёт в голову',
        ],

        thinkingTitle: 'Анализирую',
        thinkingMessages: [
            'Сканирование нейронных сетей',
            'Анализ данных',
            'Обработка шаблонов мышления',
            'Установка нейронных связей',
            'Расчёт результата',
        ],

        resultLabel: 'Моя догадка',
        resultQuestion: 'Это то число, которое ты загадал?',
        tryAgain: 'Попробовать снова',
    },
};
