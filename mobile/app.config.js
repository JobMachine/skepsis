// Wraps app.json.
// - Skepsis only uses local reminders, never remote push, so we drop the push entitlement that
//   expo-notifications adds. No push token can exist, and free Apple teams can sign the app.
// - APP_VARIANT=dev builds a side-loadable test app with its own bundle id, so personal
//   installs never claim the real App Store id (com.ionpetro.skepsis).
const { withEntitlementsPlist } = require("expo/config-plugins");

const withoutPush = (config) =>
  withEntitlementsPlist(config, (c) => {
    delete c.modResults["aps-environment"];
    return c;
  });

module.exports = ({ config }) => {
  const out = process.env.APP_VARIANT === "dev"
    ? { ...config, ios: { ...config.ios, bundleIdentifier: `${config.ios.bundleIdentifier}.dev` } }
    : config;
  return withoutPush(out);
};
