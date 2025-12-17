/**
 * Platform detection utilities for Capacitor mobile app
 */

/**
 * Check if the app is running as a Capacitor mobile app
 * Returns true when running in iOS/Android native container
 */
export const isMobileApp = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for Capacitor native runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).Capacitor?.isNativePlatform?.()) {
    return true;
  }

  // Fallback checks for file:// or capacitor:// protocols
  const protocol = window.location.protocol;
  return protocol === 'capacitor:' || protocol === 'file:';
};

/**
 * Check if running on iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).Capacitor?.getPlatform?.() === 'ios';
};

/**
 * Check if running on Android
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).Capacitor?.getPlatform?.() === 'android';
};

/**
 * Check if running in web browser (not native app)
 */
export const isWeb = (): boolean => {
  return !isMobileApp();
};
