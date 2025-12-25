"use client"
import { Avatar, Box, Group, ScrollArea, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconSend } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ref, onValue, set } from "firebase/database";
import { rtdb } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";


export default function UserChat() {
  const [sessionUser, setSessionUser] = useState<any>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const { name }: { name: string } = useParams();
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // dispatch function defined here...
  const auth = useSelector((state: any) => state?.authStates?.isAuthentication);

  // On Mounted coomponent defined here...
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "Users"));
      const data = snapshot.docs.map(doc => ({ docId: doc.id, data: doc.data() }));
      data?.map((el: any) => {
        if (el.data.payload.name == name.split("-").join(" ")) {
          setSessionUser([el]);
        }
      });
    };
    fetchUsers();
  }, []);

  // Chat listener
  useEffect(() => {
    if (sessionUser.length > 0 && auth) {
      const chatId = [auth.uid, sessionUser[0]?.data?.uid].sort().join('_');
      const messagesRef = ref(rtdb, `chats/${chatId}/messages`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const msgs = Object.values(data).map((item: any) => JSON.parse(item)) as any[];
          setMessages(msgs.sort((a: any, b: any) => a.timestamp - b.timestamp));
        } else {
          setMessages([]);
        }
      });
      return () => unsubscribe();
    }
  }, [sessionUser, auth]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // hanlder send massage
  const sendMessage = () => {
    if (message.trim() && sessionUser.length > 0 && auth) {
      const chatId = [auth.uid, sessionUser[0]?.data?.uid].sort().join('_');
      const messageKey = `${auth.uid}_${Date.now()}`;
      const messageRef = ref(rtdb, `chats/${chatId}/messages/${messageKey}`);
      set(messageRef, JSON.stringify({
        text: message,
        sender: auth.uid,
        senderName: auth.name,
        timestamp: Date.now(),
      }));
      setMessage('');
    }
  };
  return (
    <Box h="100%" display="flex" style={{ flexDirection: "column" }}>
      {/* HEADER */}
      <Group
        p="sm"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
        wrap="nowrap"
      >
        {/* BACK BUTTON (MOBILE & TAB ONLY) */}
        <Box hiddenFrom="sm">
          <UnstyledButton onClick={() => router.push("/chat")}>
            <IconArrowLeft size={22} />
          </UnstyledButton>
        </Box>

        <Avatar radius="xl" />
        <Box>
          <Text fw={600}>{name.split("-").join(" ")}</Text>
        </Box>
      </Group>

      {/* MESSAGES */}
      <ScrollArea flex={1} p="md" viewportRef={scrollAreaRef}>
        <Stack>
          {messages.map((msg: any,i) => (
            <MessageBubble key={i} text={msg.text} isMe={msg.sender === auth?.uid} senderName={msg.senderName} />
          ))}
        </Stack>
      </ScrollArea>

      {/* INPUT */}
      <Group p="sm" style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}>
        <TextInput
          placeholder="Type a message"
          style={{ flex: 1 }}
          radius="xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <UnstyledButton onClick={sendMessage}>
          <IconSend />
        </UnstyledButton>
      </Group>
    </Box>
  );
}

function MessageBubble({ text, isMe, senderName }: { text: string; isMe?: boolean; senderName?: string }) {
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
        {!isMe && senderName && <Text size="xs" c="dimmed">{senderName}</Text>}
        <Text size="sm">{text}</Text>
      </Box>
    </Group>
  );
}