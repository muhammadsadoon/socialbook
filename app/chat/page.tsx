
import { Box, Stack, Text } from "@mantine/core";

export default function EmptyChat() {
  return (
    <Box
      h="100%"
      visibleFrom="sm"
      display="flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Stack align="center">
        <Text fw={600} size="lg">Welcome to Messages</Text>
        <Text c="dimmed">Select a user to start chatting</Text>
      </Stack>
    </Box>
  );
}