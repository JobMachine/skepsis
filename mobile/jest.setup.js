/* global jest */
// Test doubles for native modules the game logic touches. Keep these tiny and honest.
const mockMem = new Map();
jest.mock("expo-sqlite/localStorage/install", () => {
  globalThis.localStorage = {
    getItem: (k) => (mockMem.has(k) ? mockMem.get(k) : null),
    setItem: (k, v) => mockMem.set(k, String(v)),
    removeItem: (k) => mockMem.delete(k),
    clear: () => mockMem.clear(),
  };
  return {};
});
jest.mock("expo-crypto", () => ({ randomUUID: () => "00000000-test-4000-8000-000000000000" }));
jest.mock("expo-application", () => ({ nativeApplicationVersion: "test" }));
jest.mock("expo-store-review", () => ({ hasAction: async () => false, requestReview: async () => {} }));
jest.mock("expo-notifications", () => ({
  setNotificationHandler: () => {},
  getPermissionsAsync: async () => ({ granted: false }),
  requestPermissionsAsync: async () => ({ granted: false }),
  cancelAllScheduledNotificationsAsync: async () => {},
  scheduleNotificationAsync: async () => "id",
  SchedulableTriggerInputTypes: { DATE: "date" },
}));
