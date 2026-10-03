/**
 * High-performance In-Memory and DB Version Tracker for Live Content Sync.
 */

// Global version tracker for current Node process / serverless instance
declare global {
  var __mkan_content_version__: number | undefined;
}

if (!global.__mkan_content_version__) {
  global.__mkan_content_version__ = Date.now();
}

export function getContentVersion(): number {
  return global.__mkan_content_version__ || Date.now();
}

export function touchContentVersion(): number {
  const newVer = Date.now();
  global.__mkan_content_version__ = newVer;
  return newVer;
}
