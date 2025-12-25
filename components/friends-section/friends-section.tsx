// components/FriendsSection.tsx
import { Avatar, Box, Text, ScrollArea, TextInput, Group } from "@mantine/core";
import Link from "next/link";

interface Friend {
    uid: string;
    name: string;
    avatar: string;
    online: boolean;
    requests: string[];
}

interface Props {
    friends: Friend[];
}

export default function FriendsSection({ friends }: Props) {
    return (
        <Box bg="white" p="md" w="100%">
            <Text size="lg" fw={500} mb="sm">
                Finds Friends
            </Text>

            <TextInput placeholder="Search friends..." mb="sm" />

            <ScrollArea style={{ minHeight: "300px" }}>
                <Box>
                    {friends.map((friend, i) => (
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
                            <Link href={`/user/${friend.name.split(" ").join("-")}`}>
                                <Group>
                                    <Avatar src={friend.avatar} radius="xl" size="md" />
                                    <Text>{friend.name}</Text>
                                </Group>
                            </Link>
                        </Group>
                    ))}
                </Box>
            </ScrollArea>
        </Box>
    );
}
