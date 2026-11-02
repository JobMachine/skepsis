# Skepsis privacy policy

_Last updated: 2026-10-31_

Skepsis is a free, open-source app for learning Greek roots. We built it so your data stays yours.

## What stays on your phone

Everything you do in Skepsis: your streak, XP, drachmas, the words you've learned, your answers and your settings. It is saved only on your device. There are no accounts, and we never ask for your name, email or phone number. Deleting the app deletes all of it. You can also export or erase it in **Me › Settings**.

Daily reminders are scheduled by iOS on your phone. No server knows when or whether you get them.

## What we collect

Only if analytics is on (it is by default, and you can turn it off in **Me › Settings › Share anonymous usage**), the app sends anonymous usage events to PostHog, our analytics provider, such as "lesson u1l2 finished, 80% right, 3 minutes", "Rodeo, 6 rides" or which screen you opened (for example the Words tab). Each event includes:

- a random id created on your phone when you install the app (not linked to you or your device),
- the app version and iOS version.

We do not collect your name, email, contacts, photos, location (GeoIP lookup is disabled), advertising id or anything you type. We don't build profiles, we don't track you across apps, and we don't sell or share data.

We use these events for one thing: making lessons better (for example, finding questions most people miss).

## Check it yourself

The code that sends analytics is one short file: [`mobile/src/lib/analytics.ts`](https://github.com/ionpetro/skepsis/blob/main/mobile/src/lib/analytics.ts). The whole app is open source at https://github.com/ionpetro/skepsis.

## Contact

Questions or requests: open an issue at https://github.com/ionpetro/skepsis/issues.
