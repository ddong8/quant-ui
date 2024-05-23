/** @type {import('next').NextConfig} */
const nextConfig = {};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

module.exports = withPWA(nextConfig);
