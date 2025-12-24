"use client"
import {
  Avatar,
  Box,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function ChatSection({ children }: { children: React.ReactNode }) {
  return (
    <Group h="100%" w="100%" align="stretch" wrap="nowrap">
      {/* LEFT: USERS LIST */}
      <Box
        w={280}
        visibleFrom="sm"
        style={{ borderRight: "1px solid var(--mantine-color-gray-3)" }}
      >
        <TextInput
          placeholder="Search users"
          leftSection={<IconSearch size={16} />}
          m="sm"
        />

        <ScrollArea h="calc(100% - 56px)">
          <Stack gap="xs" p="sm">
            {Array.from({ length: 40 }).map((_, i) => (
              <UnstyledButton
                key={i}
                component={Link}
                href={`/chat/user-${i}`}
              >
                <Group wrap="nowrap" p="xs">
                  <Avatar radius="xl" />
                  <Box>
                    <Text size="sm" fw={500}>User {i}</Text>
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      Tap to open chat
                    </Text>
                  </Box>
                </Group>
              </UnstyledButton>
            ))}
          </Stack>
        </ScrollArea>
      </Box>

      {/* RIGHT: CHAT CONTENT */}
      <Box flex={1} bg="gray.0" h="100%">
        {children}
      </Box>
    </Group>
  );
}