# Skepsis iOS app (Expo) — notes for coding agents

Read `README.md` first. Expo SDK 58, Expo Router, React Compiler on, TypeScript strict.

## Rules for this app

- **One source of truth for the course.** Lessons and game rules come from `../app/src/content.js` and `../app/src/engine.js` (shared with the website and MCP server). Never copy them into `mobile/`. Types for them live in `src/course/types.ts`.
- **Japanese (Komorebi) and philosophy (Logos) are PRIVATE courses, not part of the public app.** They exist only in the owner's own build (`EXPO_PUBLIC_PRIVATE_COURSES=1`, which app.config.js allows only with `APP_VARIANT=dev`, bundle id `com.ionpetro.skepsis.dev`, display name "Skepsis Private"). The App Store build must contain none of their content, engines or screens, and has no course switch at all (Apple guideline 2.3.1 forbids hidden features, and the repo is public, so there is no runtime unlock, passcode or device allowlist). How it is kept out:
  - The only door is an inline check in the same file as the `require`: `process.env.EXPO_PUBLIC_PRIVATE_COURSES === "1" ? require(...) : null`. Metro folds it and drops the module. Used in `src/lib/store.ts`, `src/lib/progress.ts`, `src/screens/learn/index.tsx` and the routes `src/app/komorebi.tsx` and `src/app/logos.tsx` (which just redirect home in public builds).
  - Never add a top-level `import` of `@/komorebi`, `@/logos`, `@/screens/komorebi`, `@/screens/logos`, `@/lib/private-courses`, `@/lib/japanese-voice` from a file the public build loads. `src/lib/private-courses.test.ts` fails if you do.
  - A public build keeps saved private progress (`komorebi`, `logos` in the saved JSON) untouched and always shows Skepsis, so an old saved course "komorebi" lands safely on Greek with XP and streak intact.
  - Analytics are off in the private build. `eas.json` production sets `EXPO_PUBLIC_PRIVATE_COURSES=0`.
  - **Before every App Store release run `npm run check:public`**: it exports the public bundle and fails if any Komorebi/Logos marker is inside.
- **Komorebi (Japanese)** engine and units are copied from the Komorebi repo (`../../japanese`) into `src/komorebi/vendor/` by `npm run komorebi:sync`; never edit the copies, edit Komorebi and re-sync. Progress lives in `AppState.komorebi`; XP, streak, coins and quests are shared. Screens: `src/screens/komorebi/`, route `src/app/komorebi.tsx`. Japanese audio uses the phone's voice (`expo-speech`) via `src/lib/japanese-voice.ts`.
- **Logos (philosophy, one lesson per Philosophize This! episode)**: engine, units and sources are copied from `../../philosophy` into `src/logos/vendor/` by `npm run logos:sync` (never edit the copies). New episodes arrive by re-running the sync, with no code change; do not write lessons or copy podcast text here, that happens in the Logos repo. Typed wrapper `src/logos/index.ts`, run planning `src/logos/plan.ts`, screens `src/screens/logos/` (Flux the frog, plum accents), route `src/app/logos.tsx`. Progress lives in `AppState.logos` (Logos's own format); XP and streak are shared. House rules carried over: every answer is a tap, nothing is timed, nothing can be failed (a wrong tap only says have another go), finishing pays flat XP, and the "unofficial, not affiliated with Philosophize This!" notice stays visible.
- **Private build on the owner's iPhone:** `npm run ios:private -- <device id>` (prebuilds the dev variant, builds Release, installs). It rewrites the gitignored `ios/` folder for the `.dev` bundle id; EAS regenerates `ios/` from app.config.js, so the production path still produces `com.ionpetro.skepsis`. `plugins/with-xcode26-jsi-fix.js` (dev variant only) patches the gitignored node_modules copy of ExpoModulesJSI so it compiles with Xcode 26.1 (newer Xcode does not need it).
- **Local-first. No backend.** All user data lives in `src/lib/store.ts` (expo-sqlite localStorage). Do not add accounts, cloud sync, push tokens or third-party SDKs that collect data.
- **The only network call is `src/lib/analytics.ts`.** Anonymous events only: never send names, typed text, contacts or location. Keep `$process_person_profile: false` and `$geoip_disable: true`. Update `PRIVACY.md` and the in-app Privacy screen if what we send changes.
- **Look and feel match the website.** Colors and fonts in `src/theme` mirror `../app/src/style.css`. Homer (`src/components/mascot.tsx`) is drawn exactly like the website's.
- **Sounds are generated** by `scripts/make-sounds.mjs` (plucked lyre in D major). Change notes there and run `npm run sounds`; don't add sample files.
- `src/app/` holds routes only; screen bodies go in `src/screens/`.
- React Compiler is on: don't read refs or call `Date.now()`/`Math.random()` during render (the linter catches it).

## Expo has changed — do not trust your training data

Read the `expo` version in `package.json` and use the matching docs (`https://docs.expo.dev/versions/v58.0.0/`). Project skills for Expo are in `../.claude/skills` (start with `expo-overview`). Install packages with `npx expo install`.

## Checks before you finish

```bash
npm run typecheck && npm run lint && npm test
```
