ANDROID APK

- npm install -g eas-cli
- eas build:configure
- eas.json file:
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}

- eas build --platform android --profile preview --local


IOS DEVICE 
- open developer mode in your device
- npx expo run:ios --device --configuration Release