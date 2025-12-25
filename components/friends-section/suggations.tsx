"use client";
// components/Suggestions.tsx
import { AppDispatch } from "@/utils/redux/store/store";
import { useDispatch } from "react-redux";
import { Box, Avatar, Text, Group, Button } from "@mantine/core";
import { acceptRequestFormFB, reqectRequestFormFB } from "@/utils/redux/store/actions/friend-request-action/friend-request-action";

interface Suggestion {
  id?: number;
  name: string;
  avatar: string;
  uid: string
}

interface Props {
  suggestions: Suggestion[];
}

export default function Suggestions({ suggestions }: Props) {

  const dispatch = useDispatch<AppDispatch>();
  const acceptRequestHandler = () => {
    dispatch(acceptRequestFormFB())
  }
  const rejectRequestHandler = () => {
    dispatch(reqectRequestFormFB())

  }
  return (
    <Box bg="white" p="md" w="100%">
      <Text size="lg" fw={500} mb="sm">
        Friends Requests
      </Text>

      <Box>
        {suggestions.map((s, i) => (
          <Group
            key={i}
            gap="sm"
            p="sm"
            style={(theme: any) => ({
              borderRadius: theme.radius.sm,
              cursor: "pointer",
              "&:hover": { backgroundColor: theme.colors.gray[0] },
            })}
          >
            <Group>
              <Avatar src={s.avatar} radius="xl" size="md" />
              <Text>{s.name}</Text>
            </Group>
            <Group>
              <Button bg="blue" onClick={acceptRequestHandler} fw={500} size="sm">
                Reject
              </Button>
              <Button bg="red" onClick={rejectRequestHandler} fw={500} size="sm">
                Accept
              </Button>
            </Group>
          </Group>
        ))}
      </Box>
    </Box>
  );
}
