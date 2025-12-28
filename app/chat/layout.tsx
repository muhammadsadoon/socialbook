"use client"
import { getAllUserFromFB } from "@/utils/redux/store/actions/auth-action/auth-action";
import { AppDispatch } from "@/utils/redux/store/store";
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
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatSection({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>([]);
  const isMobileOrTablet = useMediaQuery('(max-width: 770px)');
  const auth = useSelector((state:any) => state?.authStates?.isAuthentication);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetAllUsersFromFB = async () => {
    const data: any = await dispatch(getAllUserFromFB());
    setUsers(data);
  }

  useEffect(() => {
    document.title = "Chat with friends | Social book"
    handleGetAllUsersFromFB();
  }, []);
  return (
    <Group h="100%" w="100%" align="stretch" wrap="nowrap">
      {/* LEFT: USERS LIST */}
      <Box
        w={isMobileOrTablet ? "100%" : 280}
        style={{ borderRight: "1px solid var(--mantine-color-gray-3)" }}
      >
        <TextInput
          placeholder="Search users"
          leftSection={<IconSearch size={16} />}
          m="sm"
        />

        <ScrollArea h="calc(100% - 56px)">
          <Stack gap="xs" p="sm">
            {users && users?.map((user: any, i:number) => (
              <UnstyledButton
                key={i}
                component={Link}
                href={`/chat/${(user?.data?.payload?.name).split(" ").join("-")}`}
              >
                <Group wrap="nowrap" p="xs">
                  <Avatar radius="xl" />
                  <Box>
                    <Text size="sm" fw={500}>{user?.data?.payload?.name}</Text>
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
      <Box flex={1} h="100%">
        {children}
      </Box>
    </Group>
  );
}
