// Metro config. The app reads its lessons and game rules straight from ../app/src
// (the same files the website and the MCP server use), so Metro must watch that folder.
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.watchFolders = [path.resolve(__dirname, "../app/src")];
module.exports = config;
