import ReduxStoreProvider from "@/utils/providers/redux-store-provider";
import "./globals.css";
import MantineThemeProvider from "@/utils/providers/theme-provider";
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript
          forceColorScheme="light"
          defaultColorScheme="light"
        />
      </head>
      <body
        cz-shortcut-listen="true"
      >
        <ReduxStoreProvider>
          <MantineThemeProvider>
            {children}
          </MantineThemeProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
