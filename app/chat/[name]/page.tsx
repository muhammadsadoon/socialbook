"use client"
import { Avatar, Box, Group, ScrollArea, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconSend } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function UserChat({ uid }: { uid: string }) {
  const { name } = useParams();
  console.log(name)
  const router = useRouter()
  return (
    <Box h="100%" display="flex" style={{ flexDirection: "column" }}>
      {/* HEADER */}
      <Group
        p="sm"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
        wrap="nowrap"
      >
        {/* BACK BUTTON (MOBILE & TAB ONLY) */}
        <Box hiddenFrom="md">
          <UnstyledButton onClick={() => router.push("/chat")}>
            <IconArrowLeft size={22} />
          </UnstyledButton>
        </Box>

        <Avatar radius="xl" />
        <Box>
          <Text fw={600}>{uid}</Text>
          <Text size="xs" c="dimmed">online</Text>
        </Box>
      </Group>

      {/* MESSAGES */}
      <ScrollArea flex={1} p="md">
        <Stack>
          <MessageBubble text="Hello" />
          <MessageBubble text="Hi 👋" isMe />
        </Stack>
      </ScrollArea>

      {/* INPUT */}
      <Group p="sm" style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}>
        <TextInput placeholder="Type a message" style={{ flex: 1 }} radius="xl" />
        <IconSend />
      </Group>
    </Box>
  );
}

function MessageBubble({ text, isMe }: { text: string; isMe?: boolean }) {
  return (
    <Group justify={isMe ? "flex-end" : "flex-start"}>
      <Box
        px="md"
        py="sm"
        maw="70%"
        style={{
          borderRadius: 16,
          background: isMe
            ? "var(--mantine-color-blue-6)"
            : "var(--mantine-color-gray-2)",
          color: isMe ? "white" : "black",
        }}
      >
        <Text size="sm">{text}</Text>
      </Box>
    </Group>
  );
}