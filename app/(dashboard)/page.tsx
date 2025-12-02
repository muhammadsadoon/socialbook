"use client"
import React from 'react'
import { Button, Input, Avatar, Text, Paper, Group, Stack, Divider, ScrollArea } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconHome, IconUsers, IconMessage, IconBell, IconSearch, IconPlus, IconPhoto, IconVideo, IconHeart, IconList } from '@tabler/icons-react'
import DrawerToggle from '@/components/drawer/drawer'
import { DashBoardLayoutType } from '@/utils/types/components-props'

const DashBoardLayout = ({children}:DashBoardLayoutType) => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 shrink-0">
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
        <button className='flex lg:hidden' onClick={open}><IconList /></button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {
          isMobileOrTablet ? (
            <DrawerToggle close={close} isOpen={opened} >
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
            </DrawerToggle>
          ) : (
            <aside className="w-64 bg-white p-4 border-r border-gray-200 shrink-0">
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
          )
        }

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="max-w-2xl mx-auto space-y-4 h-full overflow-y-auto">
            {/* Posts */}
            {children}


          </div>
        </main>

        {/* Right Sidebar */}
        {!isMobileOrTablet && (
          <aside className="w-80 bg-white p-4 border-l border-gray-200 shrink-0">
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

export default DashBoardLayout;