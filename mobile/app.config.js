// Wraps app.json.
// - Skepsis only uses local reminders, never remote push, so we drop the push entitlement that
//   expo-notifications adds. No push token can exist, and free Apple teams can sign the app.
// - APP_VARIANT=dev builds a side-loadable test app with its own bundle id, so personal
//   installs never claim the real App Store id (com.ionpetro.skepsis).
// - EXPO_PUBLIC_PRIVATE_COURSES=1 builds the owner's private app: Greek roots plus Japanese
//   (Komorebi) and philosophy (Logos). It is only allowed together with APP_VARIANT=dev, so it
//   can never be built under the App Store id or by the production EAS profile. Public builds
//   contain none of that course content (see src/lib/private-courses.ts).
const { withEntitlementsPlist } = require("expo/config-plugins");

const withoutPush = (config) =>
  withEntitlementsPlist(config, (c) => {
    delete c.modResults["aps-environment"];
    return c;
  });

module.exports = ({ config }) => {
  const dev = process.env.APP_VARIANT === "dev";
  const priv = process.env.EXPO_PUBLIC_PRIVATE_COURSES === "1";
  if (priv && !dev) {
    throw new Error("EXPO_PUBLIC_PRIVATE_COURSES=1 is only allowed with APP_VARIANT=dev (the private app must never use the App Store bundle id).");
  }
  let out = dev ? { ...config, ios: { ...config.ios, bundleIdentifier: `${config.ios.bundleIdentifier}.dev` } } : config;
  // The private app gets its own icon (plum, with a gold Phi) so it is easy to tell from the App Store app.
  if (priv) out = { ...out, name: "Skepsis Private", scheme: "skepsis-private", icon: "./assets/images/icon-private.png", ios: { ...out.ios, icon: "./assets/images/icon-private.png" } };
  // Which Apple team signs the private app on your phone: APPLE_TEAM_ID=<team id> (kept out of the repo).
  if (dev && process.env.APPLE_TEAM_ID) out = { ...out, ios: { ...out.ios, appleTeamId: process.env.APPLE_TEAM_ID } };
  // Older local Xcode (26.1) needs a small fix to ExpoModulesJSI; EAS production builds are untouched.
  if (dev) out = require("./plugins/with-xcode26-jsi-fix")(out);
  return withoutPush(out);
};
