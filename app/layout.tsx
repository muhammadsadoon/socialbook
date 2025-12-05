"use client";
import ReduxStoreProvider from "@/utils/providers/redux-store-provider";
import "./globals.css";
import MantineThemeProvider from "@/utils/providers/theme-provider";
import { ColorSchemeScript } from "@mantine/core";
import '@mantine/core/styles.css';
import DashBoardLayout from "./(dashboard)/page";

// ‼️ import carousel styles after core package styles
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/utils/firebase";
import { setCookie } from "cookies-next";

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
            <DashBoardLayout>
              {children}
            </DashBoardLayout>
          </MantineThemeProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
