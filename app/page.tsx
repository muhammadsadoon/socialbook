"use client";

import { calculateTimeDuration } from '@/utils/custum-code/custum-code';
import { auth } from '@/utils/firebase';
import { getAllPostFromFB, toggleLikeSendHandler, commetsSendHandler } from '@/utils/redux/store/actions/post-actions/post-actions';
import { AppDispatch } from '@/utils/redux/store/store';
import { Avatar, Button, Divider, Group, Paper, Skeleton, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


// SAFE UNIQUE POST KEY
const getPostKey = (post: any) => {
  return `${post?.uid ?? "no-uid"}-${post?.createdDate ?? "no-date"}`;
};


const Page = () => {

  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");
  const [commentValues, setCommentValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const getPosts: any = useSelector((data: any) => data?.postStates);
  const dispatch = useDispatch<AppDispatch>();


  // Comment Button Handler
  const commitSectionHandler = (post: any) => {
    setLoading(true)
    const key = getPostKey(post);
    console.log("Comment for Post:", key, "=>", commentValues[key]);
    dispatch(commetsSendHandler({ post, comment: commentValues[key] }))
      .catch((e) => { toast("some thing went wonrg..." + e) })
      .finally(() => {
        toast("Your Comment was add");
        setCommentValues({});
        dispatch(getAllPostFromFB());
        setLoading(false)
      })

  };


  const handlerLikeBTN = (post: any) => {
    dispatch(toggleLikeSendHandler({ post, userID: getAuthIDFromFB }));
    dispatch(getAllPostFromFB());
  };


  // Load Firebase User + All Posts
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setGetAuthIDFromFB(user?.uid);
    });

    dispatch(getAllPostFromFB());
  }, []);


  return (
    <div>
      <div className="scroll-auto">
        {getPosts?.posts?.length > 0 ? (
          // ❌ No Component — Direct Map → No Input Blur
          [...getPosts.posts].reverse().map((post: any, i: number) => {

            const key = getPostKey(post);

            return (
              <Paper key={i} p="md" withBorder className="mb-4">

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
                <Text mb="sm" className='line-clamp-2'>{post?.content}</Text>

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
                <Text fw={600}>
                  Comments
                </Text>
                {
                  (post?.comments?.length > 0)
                    ?
                    (
                      <Paper p={4}>
                        <Group my={5} justify='start'>
                          <Avatar />
                          <Stack gap={0} justify='center'>
                            <Group>

                              <Text fw={400} size='lg'>
                                {post?.comments[post?.comments.length - 1]?.userName}
                              </Text>
                              <Divider variant="dotted" orientation="vertical" color='black' />
                              <Text fw={200} size='sm'>
                                {calculateTimeDuration(Number(post?.comments[post?.comments.length - 1]?.timestamp))}
                              </Text>
                            </Group>
                            <Text>
                              {post?.comments[post?.comments.length - 1]?.text}
                            </Text>
                          </Stack>
                        </Group>
                      </Paper>
                    )
                    :
                    ("")
                }
                {/* 💯 FIXED INPUT — NO MORE BLUR */}
                <TextInput
                  placeholder="Type your comment..."
                  value={commentValues[key] || ""}
                  onChange={(e) =>
                    setCommentValues((prev: any) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  rightSection={
                    <Button
                      size="sm"
                      onClick={() => commitSectionHandler(post)}
                      loaderProps={{ type: 'oval' }}
                      loading={loading}
                    >
                      Go
                    </Button>
                  }
                  rightSectionWidth={60}
                />

                <Text mt="xs" size='sm'>
                  {post.likes?.length || 0} likes {post?.comments ? `and ${post?.comments.length} comments` : ``}
                </Text>

              </Paper>
            );
          })

        ) : (

          // Skeleton
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
        )}

      </div>
    </div>
  );
};

export default Page;
