"use client"
import FriendSugComponent from '@/components/friend-sug/friend-sug';
import { Avatar, Button, Divider, Group, Input, Paper, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconHeart, IconPhoto, IconVideo } from '@tabler/icons-react';
import { useState } from 'react';


const page = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');
  const [posts, setPosts] = useState([1, 2, 3]);

  const AddPost = () => {
    return (
      [1, 2, 3].map((post) => (
        <Paper key={post} p="md" withBorder>
          <Group mb="sm">
            <Avatar size="md" />
            <div>
              <Text fw={500}>User Name</Text>
              <Text size="sm" c="dimmed">2 hours ago</Text>
            </div>
          </Group>
          <Text mb="sm">This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <div className="bg-gray-200 flex items-center justify-center text-3xl h-48 rounded mb-2">
            {post}
          </div>
          <Group justify="space-between">
            <Button variant="subtle" size="sm">Like</Button>
            <Button variant="subtle" size="sm">Comment</Button>
            <Button variant="subtle" size="sm">Share</Button>
          </Group>
        </Paper>
      )))
  }
  return (
    <div>
      <div className='scroll-auto'>
        <Paper p="md" withBorder>
          <Group>
            <Avatar size="md" />
            <Input placeholder="What's on your mind?" className="flex-1" />
          </Group>
          <Divider my="sm" />
          <Group justify="space-between">
            <Button variant="subtle" leftSection={<IconVideo size={20} />} color="red">Live video</Button>
            <Button variant="subtle" leftSection={<IconPhoto size={20} />} color="green">Photo/video</Button>
            <Button variant="subtle" leftSection={<IconHeart size={20} />} color="orange">Feeling/activity</Button>
          </Group>
        </Paper>
        {isMobileOrTablet
          ? Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, i) => i + 1).map((post) => (
            <Paper key={post} p="md" withBorder>
              <Group mb="sm">
                <Avatar size="md" />
                <div>
                  <Text fw={500}>User Name</Text>
                  <Text size="sm" c="dimmed">2 hours ago</Text>
                </div>
              </Group>
              <Text mb="sm">This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              <div className="bg-gray-200 h-48 rounded mb-2"></div>
              <Group justify="space-between">
                <Button variant="subtle" size="sm">Like</Button>
                <Button variant="subtle" size="sm">Comment</Button>
                <Button variant="subtle" size="sm">Share</Button>
              </Group>
            </Paper>
          ))
          : (
            <>
              <AddPost />
              {/* Friend Requests - Only on mobile and tablet */}
              {isMobileOrTablet && (
                <Paper p="md" withBorder>
                  <Text fw={500} mb="sm">Friend Requests</Text>
                  <Stack>
                    {[1, 2, 3].map((request) => (
                      <Group key={request} justify="space-between">
                        <Group>
                          <Avatar size="md" />
                          <div>
                            <Text fw={500}>Friend Request {request}</Text>
                            <Text size="sm" c="dimmed">Mutual friends: 5</Text>
                          </div>
                        </Group>
                        <Group>
                          <Button size="sm" color="blue">Accept</Button>
                          <Button size="sm" variant="outline">Decline</Button>
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                </Paper>
              )}
              {/* testing friend suggestions Carousel components */}
              {/* <FriendSugComponent/> */}
            </>
          )
        }
      </div>
    </div>
  )
}

export default page
