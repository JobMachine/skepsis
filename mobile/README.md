# Skepsis for iOS

**Roots to reason.** The native Skepsis app: Greek roots, myths and big ideas hiding in everyday English, in 3-minute lessons, with Homer the armadillo. Built with [Expo](https://expo.dev) (SDK 58) and Expo Router.

Free, open source (MIT), no account, no ads. **Your progress never leaves your phone.**

## What's in it

- **The same course as the website and the MCP server.** The app reads `../app/src/content.js` and `../app/src/engine.js` directly (one source of truth): 11 units, 127 roots, ideas and "Is it Greek?" words, spaced review, streak rules, badges.
- **Lessons** with six question types: guess first, multiple choice, decode a new word, build a word from tiles, match pairs, Greek or not. Missed questions come back at the end.
- **Rodeo:** 8 seconds a question, one miss bucks you off.
- **Daily quests** (three a day, same for everyone) that pay **drachmas**, plus a treasure chest for finishing all three.
- **The Agora shop:** spend drachmas on streak freezes and hats for Homer. Drachmas are earned, never bought.
- **Streaks** that never break on weekends, a streak celebration on the first lesson of the day, a 5-week calendar.
- **Words:** search every root and idea, see how strong each one is, share it, or present a unit at standup (**Huddle**).
- **Me:** stats, a 7-day XP chart, laurels (badges), settings.
- **Native feel:** iOS tab bar (Liquid Glass on iOS 26), large titles, sheets, haptics, dark mode, and a plucked-lyre sound set generated from code (`scripts/make-sounds.mjs`).
- **Local reminders** at a time you pick, scheduled by iOS on the phone.

## Privacy by design

- All progress is stored on the device in SQLite (`src/lib/store.ts`). There is no backend.
- Reminders are local notifications. No push token is created or sent.
- The only network call is anonymous usage analytics, all of it in one file: [`src/lib/analytics.ts`](src/lib/analytics.ts). Random install id, no person profiles, GeoIP off, opt-out in Settings. A build without `EXPO_PUBLIC_POSTHOG_KEY` (every fork, by default) sends nothing.
- Users can export or erase their data in Settings. Full policy: [PRIVACY.md](PRIVACY.md).

## Run it

```bash
cd mobile
npm install
cp .env.example .env   # optional: add a PostHog key; leave empty for no analytics
npx expo start         # press i for the iOS simulator, or scan the QR code with Expo Go
```

Checks (run before a pull request):

```bash
npm run typecheck && npm run lint && npm test
```

Dev helpers (development builds only): `skepsis://dev?to=/` loads demo progress, `/lesson?mode=lesson&node=u1l1&auto=1` plays a lesson by itself.

## The private build (Japanese and philosophy)

The App Store app is only the Greek course. The owner's own phone runs a second build, "Skepsis Private" (bundle id `com.ionpetro.skepsis.dev`, never the App Store id), with a Learn-tab switch for Greek roots, Japanese (Komorebi) and philosophy (Logos, an unofficial companion to the Philosophize This! podcast). Those courses are compiled out of every other build, and analytics are off in the private one.

```bash
npm run komorebi:sync && npm run logos:sync   # copy the latest courses (new Logos episodes arrive this way)
APPLE_TEAM_ID=<team id> npm run ios:private -- <device id>   # prebuild, build Release, install on the connected iPhone
npm run check:public                          # before an App Store release: proves the public bundle has no private course
```

Find the device id with `xcrun xctrace list devices` (the long hardware id). The phone must be unlocked, trusted, in Developer Mode, and signed in to your Apple team in Xcode. Progress in the private app is separate from the App Store app (different bundle id).

## Layout

| Path | What |
|---|---|
| `src/app/` | Routes only (Expo Router): tabs, lesson, rodeo, sheets |
| `src/screens/` | Screen bodies (learn, lesson, rodeo, quests, words, me, onboarding; `komorebi/` and `logos/` are private-build only) |
| `src/komorebi/`, `src/logos/` | Private courses: typed wrappers over synced `vendor/` copies |
| `src/components/` | Shared UI: Homer (`mascot.tsx`), laurels, buttons, confetti |
| `src/lib/` | Store, quests, scoring, sounds/haptics, analytics, reminders |
| `src/course/` | Types and the bridge to the shared course files |
| `src/theme/` | Colors and fonts, copied from the website's `style.css` |
| `scripts/` | `make-sounds.mjs` (lyre sounds), `render-splash.sh` (launch screen) |

## Add a word

Edit `../app/src/content.js` and run `npm test` at the repo root. The app, the website and the MCP server all pick it up.

## Ship to the App Store

Uses EAS (see `.claude/skills/eas-app-stores`): `npx eas-cli@latest build -p ios --profile production`, then `npx eas-cli@latest submit -p ios`. Needs an Apple Developer account and `eas init` to link the project.
