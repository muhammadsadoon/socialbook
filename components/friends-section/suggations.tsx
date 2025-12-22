// components/Suggestions.tsx
import { Box, Avatar, Text, Group } from "@mantine/core";

interface Suggestion {
  id?: number;
  name: string;
  avatar: string;
  uid:string
}

interface Props {
  suggestions: Suggestion[];
}

export default function Suggestions({ suggestions }: Props) {
  return (
    <Box bg="white" p="md" w="100%">
      <Text size="lg" fw={500} mb="sm">
        People you may know
      </Text>

      <Box>
        {suggestions.map((s,i) => (
          <Group
            key={i}
            gap="sm"
            p="sm"
            style={(theme:any) => ({
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              "&:hover": { backgroundColor: theme.colors.gray[0] },
            })}
          >
            <Group>
              <Avatar src={s.avatar} radius="xl" size="md" />
              <Text>{s.name}</Text>
            </Group>
            <Text color="blue" fw={500} size="sm">
              Add
            </Text>
          </Group>
        ))}
      </Box>
    </Box>
  );
}
