"use client";
import { Loader, Text, Center, Stack, Paper } from '@mantine/core';

export default function Loading() {
  return (
    <Center style={{ minHeight: '80vh'}}>
      <Paper p="xl" shadow="md" withBorder style={{ maxWidth: 300, width: '100%' }}>
        <Stack align="center" gap="lg">
          <Loader size="lg" color="#228be6" />
          <Text size="lg" fw={500} ta="center">Loading...</Text>
        </Stack>
      </Paper>
    </Center>
  );
}
