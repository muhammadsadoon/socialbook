"use client"
// import FriendSugComponent from '@/components/friend-sug/friend-sug';
import { calculateTimeDuration } from '@/utils/custum-code/custum-code';
import { auth } from '@/utils/firebase';
import { getAllPostFromFB, toggleLikeSendHandler } from '@/utils/redux/store/actions/post-actions/post-actions';
import { AppDispatch } from '@/utils/redux/store/store';
import { Avatar, Button, Group, Paper, Skeleton, Text } from '@mantine/core'
// import { useMediaQuery } from '@mantine/hooks';
import { IconHeart, IconHeartFilled, IconPhoto, IconVideo } from '@tabler/icons-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const page = () => {
  // const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');
  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");

  // handle dispatch function defined here...
  const getPosts: any = useSelector((data: any) => data?.postStates);
  const dispatch = useDispatch<AppDispatch>();
  // const commitSectionHandler = () => {

  // }
  const handlerLikeBTN = (post: any) => {
    dispatch(toggleLikeSendHandler({ post, userID: getAuthIDFromFB }));
    dispatch(getAllPostFromFB())
  }
  const AddPost = () => {

    return getPosts.posts.map((post: any, i: number) => (
      <Paper key={i} p="md" withBorder>
        <Group mb="sm">
          <Avatar size="md" />
          <div>
            <Text fw={500}>{post?.name}</Text>
            <Text size="sm" c="dimmed">{calculateTimeDuration(Number(post.createdDate))}</Text>
          </div>
        </Group>

        <Text fw={500}>{post?.title}</Text>
        <Text mb="sm">{post?.content}</Text>

        {/* Show image only if exists */}
        {post?.image && (
          <div className="h-48 rounded mb-2">
            <img
              src={post.image}
              className="w-full h-full object-cover rounded"
              alt="post-image"
            />
          </div>
        )}

        <Group justify="space-between">
          <Button
            variant="subtle"
            size="sm"
            leftSection={post?.likes?.some((user: any) => user === getAuthIDFromFB) ? <IconHeartFilled /> : <IconHeart />}
            onClick={() => handlerLikeBTN(post)}
          >
            Like
          </Button>
          <Button variant="subtle" size="sm">Comment</Button>
          <Button variant="subtle" size="sm">Share</Button>
        </Group>
        <Text size='sm'>Likes : {post.likes?.length || 0}</Text>
      </Paper>
    )).reverse();
  };




  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setGetAuthIDFromFB(user?.uid);
    })
    dispatch(getAllPostFromFB());
  }, [])
  return (
    <div>
      <div className='scroll-auto'>
        {/* <Paper p="md" withBorder>
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
        </Paper> */}

        {
          (getPosts?.posts?.length > 0)
            ?
            <AddPost />
            :
            (
              <>
                <Paper p="md" withBorder>
                  <Group mb="sm">
                    <Avatar size="md" />
                    <div>
                      <Skeleton height={20} width={100} className='my-2' fw={500} />
                      <Skeleton height={10} width={20} fw={500} />
                    </div>
                  </Group>

                  <Skeleton height={8} fw={500} className='my-2'></Skeleton>
                  <Skeleton height={8} mb="sm"></Skeleton>
                  <Group justify="space-between">
                    <Skeleton height={8} width={20} mb="sm"></Skeleton>
                    <Skeleton height={8} width={20} mb="sm"></Skeleton>
                    <Skeleton height={8} width={20} mb="sm"></Skeleton>
                  </Group>
                </Paper>
              </>
            )
        }
        {/* Friend Requests - Only on mobile and tablet */}
        {/* {isMobileOrTablet && (
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
        )} */}
        {/* testing friend suggestions Carousel components */}
        {/* <FriendSugComponent/> */}
      </div>
    </div>
  )
}

export default page
