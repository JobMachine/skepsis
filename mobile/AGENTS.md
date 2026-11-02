# Skepsis iOS app (Expo) — notes for coding agents

Read `README.md` first. Expo SDK 58, Expo Router, React Compiler on, TypeScript strict.

## Rules for this app

- **One source of truth for the course.** Lessons and game rules come from `../app/src/content.js` and `../app/src/engine.js` (shared with the website and MCP server). Never copy them into `mobile/`. Types for them live in `src/course/types.ts`.
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
