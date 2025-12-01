"use client"
import React from 'react'
import { Button, Input, Avatar, Text, Paper, Group, Stack, Divider, ScrollArea } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconHome, IconUsers, IconMessage, IconBell, IconSearch, IconPlus, IconPhoto, IconVideo, IconHeart, IconList } from '@tabler/icons-react'

const Home = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-blue-600">SocialBook</h1>
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search SocialBook"
              leftSection={<IconSearch size={16} />}
              className="w-full"
            />
          </div>
        </div>
        <nav className="lg:flex hidden items-center space-x-2 sm:space-x-6 overflow-x-auto">
          <Button variant="subtle" leftSection={<IconHome size={20} />} size="sm" className="shrink-0">Home</Button>
          <Button variant="subtle" leftSection={<IconUsers size={20} />} size="sm" className="shrink-0">Friends</Button>
          <Button variant="subtle" leftSection={<IconMessage size={20} />} size="sm" className="shrink-0">Messages</Button>
          <Button variant="subtle" leftSection={<IconBell size={20} />} size="sm" className="shrink-0">Notifications</Button>
          <Avatar size="md" className="shrink-0" />
        </nav>
        <button className='flex lg:hidden'><IconList /></button>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white p-4 border-r border-gray-200">
          <Stack>
            <Group>
              <Avatar size="md" />
              <Text fw={500}>Your Name</Text>
            </Group>
            <Divider />
            <Button variant="subtle" leftSection={<IconHome size={20} />} fullWidth justify="flex-start">Home</Button>
            <Button variant="subtle" leftSection={<IconUsers size={20} />} fullWidth justify="flex-start">Friends</Button>
            <Button variant="subtle" leftSection={<IconMessage size={20} />} fullWidth justify="flex-start">Messages</Button>
            <Button variant="subtle" leftSection={<IconBell size={20} />} fullWidth justify="flex-start">Notifications</Button>
            <Button variant="subtle" leftSection={<IconPlus size={20} />} fullWidth justify="flex-start">Create</Button>
          </Stack>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Create Post */}
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

            {/* Posts */}
            <div className='scroll-auto'>
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
                : [1, 2, 3].map((post) => (
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
              }
            </div>

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
          </div>
        </main>

        {/* Right Sidebar */}
        {!isMobileOrTablet && (
          <aside className="w-80 bg-white p-4 border-l border-gray-200">
            <Stack>
              <Text fw={500} mb="sm">Sponsored</Text>
              <Paper p="sm" withBorder mb="md">
                <Text size="sm">Sample Ad</Text>
                <div className="bg-gray-200 h-24 rounded mt-2"></div>
              </Paper>

              <Text fw={500} mb="sm">Contacts</Text>
              <ScrollArea h={300}>
                <Stack>
                  {[1, 2, 3, 4, 5].map((contact) => (
                    <Group key={contact}>
                      <Avatar size="sm" />
                      <Text size="sm">Contact {contact}</Text>
                    </Group>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          </aside>
        )}
      </div>
    </div>
  )
}

export default Home;
