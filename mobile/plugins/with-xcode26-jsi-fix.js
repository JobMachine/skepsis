// Local-build workaround for older Xcode. ExpoModulesJSI 58.0.x does not compile with Xcode 26.1
// (Swift 6.2.1): "sending 'slot' risks causing data races" in JavaScriptObject.swift. Passing the
// pointer into the isolated closure as an address (an integer is Sendable) compiles on 26.1 and
// behaves identically. Newer Xcode versions do not need this, and the edit is skipped if the file
// no longer has the old line. It only edits the gitignored node_modules copy, and only runs for the
// owner's private/dev build (see app.config.js); EAS production builds never touch it.
const fs = require("node:fs");
const path = require("node:path");
const { withDangerousMod } = require("expo/config-plugins");

const OLD = `      try JavaScriptActor.assumeIsolated {
        try encode(JavaScriptValue.Slot(slot), runtime)
      }`;
const NEW = `      let slotAddress = UInt(bitPattern: slot) // skepsis: Sendable copy for Xcode 26.1
      try JavaScriptActor.assumeIsolated {
        try encode(JavaScriptValue.Slot(UnsafeMutablePointer<facebook.jsi.Value>(bitPattern: slotAddress)!), runtime)
      }`;

module.exports = (config) =>
  withDangerousMod(config, [
    "ios",
    (c) => {
      const file = path.join(c.modRequest.projectRoot, "node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/Values/JavaScriptObject.swift");
      if (!fs.existsSync(file)) return c;
      const text = fs.readFileSync(file, "utf8");
      if (text.includes(OLD)) fs.writeFileSync(file, text.replace(OLD, NEW));
      return c;
    },
  ]);
