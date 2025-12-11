"use client"

import { calculateTimeDuration } from '@/utils/custum-code/custum-code';
import { auth } from '@/utils/firebase';
import { getAllPostFromFB, toggleLikeSendHandler } from '@/utils/redux/store/actions/post-actions/post-actions';
import { AppDispatch } from '@/utils/redux/store/store';
import { Avatar, Button, Group, Paper, Skeleton, Text, TextInput } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Page = () => {

  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");
  const [commentValues, setCommentValues] = useState<any>({}); // ← FIXED

  const getPosts: any = useSelector((data: any) => data?.postStates);
  const dispatch = useDispatch<AppDispatch>();


  // send comment handler
  const commitSectionHandler = (post: any) => {
    console.log("Comment for Post:", post.uid, "=>", commentValues[post.uid]);
  };

  const handlerLikeBTN = (post: any) => {
    dispatch(toggleLikeSendHandler({ post, userID: getAuthIDFromFB }));
    dispatch(getAllPostFromFB())
  };


  // FIXED AddPost (now returns JSX correctly)
  const AddPost = () => {
    return getPosts.posts
      .map((post: any, i: number) => {

        return (   // ← RETURN ADDED
          <Paper key={i} p="md" withBorder>
            <Group mb="sm">
              <Avatar size="md" />
              <div>
                <Text fw={500}>{post?.name}</Text>
                <Text size="sm" c="dimmed">
                  {calculateTimeDuration(Number(post.createdDate))}
                </Text>
              </div>
            </Group>

            <Text fw={500}>{post?.title}</Text>
            <Text mb="sm">{post?.content}</Text>

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
                leftSection={
                  post?.likes?.some((user: any) => user === getAuthIDFromFB)
                    ? <IconHeartFilled />
                    : <IconHeart />
                }
                onClick={() => handlerLikeBTN(post)}
              >
                Like
              </Button>

              <Button variant="subtle" size="sm">Comment</Button>
              <Button variant="subtle" size="sm">Share</Button>
            </Group>

            {/* FIXED COMMENT INPUT */}
            <TextInput
              label="Comment"
              placeholder="Type your comment..."
              value={commentValues[post.uid] || ""}
              onChange={(e) =>
                setCommentValues((prev: any) => ({
                  ...prev,
                  [post.uid]: e.target.value
                }))
              }
              rightSection={
                <Button size="sm" onClick={() => commitSectionHandler(post)}>
                  Go
                </Button>
              }
              rightSectionWidth={60}
            />

            <Text size='sm'>
              {post.likes?.length || 0} likes {post?.commit ? `and ${post?.commit[0]} comments` : ``}
            </Text>
          </Paper>
        );
      })
      .reverse();
  };


  // Load Data + User
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setGetAuthIDFromFB(user?.uid);
    });

    dispatch(getAllPostFromFB());

  }, []);


  return (
    <div>
      <div className='scroll-auto'>
        {
          (getPosts?.posts?.length > 0)
            ? <AddPost />
            : (
              <Paper p="md" withBorder>
                <Group mb="sm">
                  <Avatar size="md" />
                  <div>
                    <Skeleton height={20} width={100} className='my-2' />
                    <Skeleton height={10} width={20} />
                  </div>
                </Group>

                <Skeleton height={8} className='my-2' />
                <Skeleton height={8} mb="sm" />

                <Group justify="space-between">
                  <Skeleton height={8} width={20} mb="sm" />
                  <Skeleton height={8} width={20} mb="sm" />
                  <Skeleton height={8} width={20} mb="sm" />
                </Group>
              </Paper>
            )
        }
      </div>
    </div>
  )
}

export default Page;
