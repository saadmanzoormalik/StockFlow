import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.stockpickcheck.app",
  appName: "Stock Pick Check",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#15202B",
      showSpinner: false
    }
  }
};

export default config;
