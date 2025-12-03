"use client";
// Import global styles and fonts
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Button, Center, MantineProvider, Paper, Stack, Text } from '@mantine/core';
import { IconError404, IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  const router = useRouter();
  return (
    <html lang="en" className={inter.className}>
      <body cz-shortcut-listen="true">
        <div className='h-dvh w-full flex items-center justify-center'>
          <MantineProvider>
            <Center>
              <Paper p="xl" shadow="md" withBorder style={{ maxWidth: 400, width: '100%' }}>
                <Stack className='flex flex-col justify-center items-center' gap="lg" justify='center'>
                  <IconError404 size={80} color="#228be6" />
                  <Text size="xl" fw={700} ta="center">Page Not Found</Text>
                  <Text size="md" c="dimmed" ta="center">
                    The page you're looking for doesn't exist or has been moved.
                  </Text>
                  <div onClick={() => {router.push('/');}} className='flex  p-3 gap-2 items-center justify-center bg-[#228be6] text-white my-2 rounded-lg cursor-pointer'>
                    <IconHome size={16} />
                    <Text
                    >
                      Go Home
                    </Text>
                  </div>
                </Stack>
              </Paper>
            </Center>
          </MantineProvider>
        </div>
      </body>
    </html >
  )
}