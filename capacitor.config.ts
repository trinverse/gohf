import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gohf.app',
  appName: 'Guardians of Hope',
  webDir: 'out',
  server: {
    // For development - uncomment to connect to local dev server
    // url: 'http://localhost:3000',
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#ffffff',
    },
  },
  ios: {
    contentInset: 'automatic',
    scheme: 'gohf',
  },
  android: {
    backgroundColor: '#ffffff',
  },
};

export default config;
