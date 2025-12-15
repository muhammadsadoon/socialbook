"use client";

import { calculateTimeDuration } from '@/utils/custum-code/custum-code';
import { auth } from '@/utils/firebase';
import { getAllPostFromFB, toggleLikeSendHandler, commetsSendHandler } from '@/utils/redux/store/actions/post-actions/post-actions';
import { AppDispatch } from '@/utils/redux/store/store';
import { Avatar, Button, Divider, Group, Image, Paper, Skeleton, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


// SAFE UNIQUE POST KEY
const getPostKey = (post: any) => {
  return `${post?.uid ?? "no-uid"}-${post?.createdDate ?? "no-date"}`;
};


const Page = () => {

  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");
  const [commentValues, setCommentValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const getPosts: any = useSelector((data: any) => data?.postStates.posts);
  const getAuthStateFromFB = useSelector((data: any) => data.authStates?.isAuthentication);
  const dispatch = useDispatch<AppDispatch>();


  // Comment Button Handler
  const commitSectionHandler = (post: any) => {
    setLoading(true)
    const key = getPostKey(post);
    dispatch(commetsSendHandler({ post, comment: commentValues[key], commentSender: getAuthStateFromFB }))
      .catch((e) => { toast("some thing went wonrg..." + e) })
      .finally(() => {
        toast("Your Comment was add");
        setCommentValues({});
        dispatch(getAllPostFromFB());
        setLoading(false)
      })

  };

  // dispatch like handler function
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
        <Toaster />
        {getPosts?.length > 0 ? (
          // ❌ No Component — Direct Map → No Input Blur
          [...getPosts].reverse().map((post: any, i: number) => {
            const key = getPostKey(post);
            return (
              <Paper key={i} p="md" withBorder className="mb-1">
                <Link href={`/user/${(post?.data?.name).split(" ").join("-")}`}>
                  <Group mb="sm">
                    <Avatar size="md" />
                    <div>
                      <Text fw={500}>{post?.data?.name}</Text>
                      <Text size="sm" c="dimmed">
                        {calculateTimeDuration(Number(post?.data?.createdDate))}
                      </Text>
                    </div>
                  </Group>
                </Link>
                <Text fw={500}>{post?.title}</Text>
                <Text mb="sm" className='line-clamp-2'>{post?.data?.content}</Text>
                {post?.data?.image && (
                  <div className="h-full rounded mb-2">
                    <Image src={post.data?.image} mah={300} h={"100%"} fit="fill" />
                  </div>
                )}
                <Group justify="space-between">
                  <Button
                    variant="subtle"
                    size="sm"
                    leftSection={
                      post?.data?.likes?.some((user: any) => user === getAuthIDFromFB)
                        ? <IconHeartFilled />
                        : <IconHeart />
                    }
                    onClick={() => handlerLikeBTN({ post, docID: post?.docID })}
                  >
                    Like
                  </Button>
                  <Button component={Link} href={`/post/${post?.docID}`} variant="subtle" size="sm">See More Comments</Button>
                </Group>
                <Text fw={600}>
                  Comments
                </Text>
                {
                  (post?.data?.comments?.length > 0)
                    ?
                    (
                      <Paper p={4}>
                        <Group my={5} justify='start'>
                          <Avatar />
                          <Stack gap={0} justify='center'>
                            <Group>

                              <Text fw={400} size='lg'>
                                {post?.data?.comments[post?.data?.comments.length - 1]?.userName}
                              </Text>
                              <Divider variant="dotted" orientation="vertical" color='black' />
                              <Text fw={200} size='sm'>
                                {calculateTimeDuration(Number(post?.data?.comments[post?.data?.comments.length - 1]?.timestamp))}
                              </Text>
                            </Group>
                            <Text>
                              {post?.data?.comments[post?.data?.comments.length - 1]?.text}
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
                  {post?.data?.likes?.length || 0} likes {post?.data?.comments ? `and ${post?.data?.comments.length} comments` : ``}
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