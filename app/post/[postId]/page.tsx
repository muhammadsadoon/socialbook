"use client";

import { useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';
import { Avatar, Button, Card, Divider, Group, Image, Paper, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { calculateTimeDuration } from '@/utils/custum-code/custum-code';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { commetsSendHandler, getAllPostFromFB, toggleLikeSendHandler } from '@/utils/redux/store/actions/post-actions/post-actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store/store';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import PostImageGrid from '@/components/post-image-grid/post-image-grid';
const getPostKey = (post: any) => {
  return `${post?.uid ?? "no-uid"}-${post?.createdDate ?? "no-date"}`;
};

export default function Page() {
  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [commentValues, setCommentValues] = useState<any>({});
  const [isUserFind, setIsUserFind] = useState<boolean>(false);
  const [post, setPost] = useState<any>({});

  const { ["postId"]: param }: { ["postId"]: string } = useParams();

  const routes = useRouter();

  const getPost = async () => {
    const docRef = doc(db, "posts", param); // Get a reference to the document
    const docSnap = await getDoc(docRef); // Fetch the document snapshot
    if (docSnap.exists()) {
      setPost({ data: docSnap.data(), docID: docSnap.id });
      setIsUserFind(true)
    } else {
      routes.push("/404");
    }
  };

  // redux dispatch function defined here..
  const dispatch = useDispatch<AppDispatch>();
  const getAuthStateFromFB = useSelector((data: any) => data.authStates?.isAuthentication);

  // Comment Button Handler
  const commitSectionHandler = (post: any) => {
    setLoading(true)
    console.log(post);
    const key = getPostKey(post);
    dispatch(commetsSendHandler({ post, comment: commentValues[key], commentSender: getAuthStateFromFB }))
      .catch((e) => { toast("some thing went wonrg..." + e) })
      .finally(() => {
        toast("Your Comment was add");
        setCommentValues({});
        dispatch(getAllPostFromFB());
        setLoading(false)
        getPost();
      })
      
    };

  // dispatch like handler function
  const handlerLikeBTN = (post: any) => {
    dispatch(toggleLikeSendHandler({ post, userID: getAuthIDFromFB }));
    getPost();
  };

  useEffect(() => {
    getPost();
    dispatch(getAllPostFromFB());
    onAuthStateChanged(auth, (user: any) => {
      setGetAuthIDFromFB(user?.uid);
    });

  }, []);
  const key = getPostKey(post);
  if (!isUserFind) return <Loading />
  else return (post) ?
    <Paper p="md" withBorder className="mb-1">
      <Toaster />
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
      <Text fw={500}>{post?.data?.title}</Text>
      <Text mb="sm">{post?.data?.content}</Text>
      {post && <PostImageGrid images={post?.data?.imageUrls} />}
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
        <Button variant="subtle" size="sm">See More Comments</Button>
      </Group>
      <Text fw={600}>
        Comments
      </Text>

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
            send
          </Button>
        }
        rightSectionWidth={60}
      />

      <Text mt="xs" size='sm'>
        {post?.data?.likes?.length || 0} likes {post.data?.comments ? `and ${post?.data?.comments.length} comments` : ``}
      </Text>

      {
        (post?.data?.comments?.length > 0)
          ?
          post?.data?.comments?.map((item: any, i: number) => {
            return (
              <Paper key={i} p={4}>
                <Group my={5} justify='start'>
                  <Avatar />
                  <Stack gap={0} justify='center'>
                    <Group>

                      <Text fw={400} size='lg'>
                        {item?.userName}
                      </Text>
                      <Divider variant="dotted" orientation="vertical" color='black' />
                      <Text fw={200} size='sm'>
                        {calculateTimeDuration(Number(item?.timestamp))}
                      </Text>
                    </Group>
                    <Text>
                      {item?.text}
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            )
          })
          :
          ("")
      }
    </Paper>
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
