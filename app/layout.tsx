"use client";
import { useEffect } from "react";
import ReduxStoreProvider from "@/utils/providers/redux-store-provider";
import MantineThemeProvider from "@/utils/providers/theme-provider";
import { ColorSchemeScript } from "@mantine/core";
import DashBoardLayout from "./(dashboard)/page";

// all css files imported
import "./globals.css";
import '@mantine/core/styles.css';
import 'react-photo-view/dist/react-photo-view.css';

// ‼️ import carousel styles after core package styles
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import toast, { Toaster } from "react-hot-toast";
import { PhotoProvider } from "react-photo-view";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
  }, [])
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
                <Toaster />
                {children}
              </DashBoardLayout>
          </MantineThemeProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
