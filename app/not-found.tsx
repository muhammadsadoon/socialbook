"use client";
// import { Button, Text, Center, Stack, Paper, Group } from '@mantine/core';
// import { IconHome, IconError404 } from '@tabler/icons-react';
// import { useRouter } from 'next/navigation';

// export default function NotFound() {
//   const router = useRouter();

//   return (
//     <Center style={{ minHeight: '80vh' }}>
//       <Paper p="xl" shadow="md" withBorder style={{ maxWidth: 400, width: '100%' }}>
//         <Stack align="center" gap="lg">
//           <IconError404 size={80} color="#228be6" />
//           <Text size="xl" fw={700} ta="center">Page Not Found</Text>
//           <Text size="md" c="dimmed" ta="center">
//             The page you're looking for doesn't exist or has been moved.
//           </Text>
//           <Button
//             leftSection={<IconHome size={16} />}
//             onClick={() => router.push('/')}
//             size="md"
//           >
//             Go Home
//           </Button>
//         </Stack>
//       </Paper>
//     </Center>
//   );
// }

import { Button, Container, Group, Text, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
export default function NotFound() {
  return (
    <Container size="md" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
      <IconAlertTriangle size={100} style={{ color: 'var(--mantine-color-red-6)' }} />
      <Title order={1} style={{ marginTop: 20, marginBottom: 10 }}>
        404 - Page Not Found
      </Title>
      <Text c="dimmed" size="lg" style={{ marginBottom: 30 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Text>
      <Group justify="center">
        <Button component={Link} href="/" variant="filled" size="md">
          Go to Home Page
        </Button>
      </Group>
    </Container>
  )
}