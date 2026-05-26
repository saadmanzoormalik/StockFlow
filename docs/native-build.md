# Native Build Plan

## Goal

Package Stock Pick Check for iOS App Store and Google Play Store after the web app core flows are working.

## Current Status

The repo now includes Capacitor configuration:

- `capacitor.config.ts`
- package dependencies for `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, and `@capacitor/app`

Native platform folders are not generated yet because this environment does not currently have `npm` available.

## First Local Native Setup

After installing Node/npm locally:

```bash
npm install
npm run build
npx cap add ios
npx cap add android
npx cap sync
```

## iOS

Requires:

- macOS with Xcode
- Apple Developer account
- app icon and splash assets
- privacy policy URL
- subscription disclosure
- financial education disclaimer

Open iOS project:

```bash
npx cap open ios
```

## Android

Requires:

- Android Studio
- Google Play Console account
- app icon and splash assets
- privacy policy URL
- subscription disclosure
- financial education disclaimer

Open Android project:

```bash
npx cap open android
```

## Store Readiness Checklist

- Supabase Auth
- Stripe subscription and restore purchases policy
- Portfolio provider privacy disclosure
- Account deletion flow
- Terms of service
- Privacy policy
- No guaranteed-return claims
- Clear educational disclaimer
- Support contact
