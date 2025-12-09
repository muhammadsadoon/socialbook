// "use client";
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

import Link from 'next/link'
import { headers } from 'next/headers'
export default async function NotFound() {
  const headersList = await headers()
  return (
    <div>
      <h2>Not Found: </h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">all posts</Link>
      </p>
    </div>
  )
}