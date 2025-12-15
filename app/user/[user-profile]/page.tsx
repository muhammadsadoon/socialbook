"use client"

import Loading from "@/app/loading";
import { calculateTimeDuration } from "@/utils/custum-code/custum-code";
import { auth } from "@/utils/firebase";
import { findUserFromFB } from "@/utils/redux/store/actions/auth-action/auth-action";
import { commetsSendHandler, getAllPostFromFB, toggleLikeSendHandler } from "@/utils/redux/store/actions/post-actions/post-actions";
import { AppDispatch } from "@/utils/redux/store/store";
import { Avatar, Button, Divider, Group, Paper, Skeleton, Stack, Text, TextInput, Grid, Box, Card, Image } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const getPostKey = (post: any) => {
  return `${post?.uid ?? "no-uid"}-${post?.createdDate ?? "no-date"}`;
};

const page = () => {
  const [getAuthIDFromFB, setGetAuthIDFromFB] = useState<string>("");
  const [commentValues, setCommentValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFindUser, setIsFindUser] = useState<boolean>(false);


  // get parameter from client url...
  const { ["user-profile"]: param }: { ["user-profile"]: string } = useParams();

  // get data from redux store...
  const getPosts: any = useSelector((data: any) => data?.postStates);
  const getAuthStateFromFB = useSelector((data: any) => data.authStates?.isAuthentication);

  // dispatch function define here...
  const dispatch = useDispatch<AppDispatch>();

  // router form next js for navigation...
  const router = useRouter();

  // hander the dispatch comment on each user...
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

  // find the secure user from firestore... if user are not to rediect the 404 page...
  const checkUserAreTrue = async () => {
    try {
      await dispatch(findUserFromFB(param));
      setIsFindUser(true)
    } catch (err) {
      console.log("user are not found: ", err);
      router.push("/404");
    }
  }

  // dispatch like handler function
  const handlerLikeBTN = (post: any) => {
    dispatch(toggleLikeSendHandler({ post, userID: getAuthIDFromFB })).finally(() => {
      dispatch(getAllPostFromFB());
    })
  };


  // on components mount here to define defualt functions...
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setGetAuthIDFromFB(user?.uid);
    });
    checkUserAreTrue()
    dispatch(getAllPostFromFB());
  }, []);

  if (isFindUser) {
    return (
      <div>
        <div className="scroll-auto">
          <Toaster />
          <Box>
            <Card padding="lg" radius="md">
              {/* Profile Info and Avatar Group */}
              <Group pl="lg" align="flex-end">
                <Avatar
                  size={180}
                  radius="xl"
                  alt="User avatar"
                  style={{ border: '4px solid white' }}
                >
                  {param?.split("-").map((item) => item.slice(0, 1)).join("").toUpperCase()}
                </Avatar>
                <Stack gap="sm" pb="md">
                  <Text size="xl" w={700}>
                    {param?.split("-").map((item) => item[0].toUpperCase() + item.slice(1)).join(" ")}
                  </Text>
                  <Text size="sm" color="dimmed">
                    @{param} | SocialBook member
                  </Text>
                  <Group gap={"md"}>
                    <Button>Add Friend</Button>
                    <Button variant="default">Message</Button>
                  </Group>
                </Stack>
              </Group>
            </Card>
            {/* Main Content Grid (Sidebar and Timeline) */}
          </Box>
          {getPosts?.posts?.length > 0 ? (
            [...getPosts.posts].reverse().filter((post: any) => post?.data?.name == param.split("-").join(" ")).map((post: any, i: number) => {
              const key = getPostKey(post);
              return (
                <Paper key={i} p="md" withBorder className="mb-4">
                  <Group mb="sm">
                    <Avatar size="md" />
                    <div>
                      <Text fw={500}>{post?.data?.name}</Text>
                      <Text size="sm" c="dimmed">
                        {calculateTimeDuration(Number(post?.data?.createdDate))}
                      </Text>
                    </div>
                  </Group>
                  <Text fw={500}>{post?.data?.title}</Text>
                  <Text mb="sm" className='line-clamp-2'>{post?.data?.content}</Text>
                  {post?.data.image && (
                    <div className="h-48 rounded mb-2">
                      <img
                        src={post?.data.image}
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
                        post?.data?.likes?.some((user: any) => user === getAuthIDFromFB)
                          ? <IconHeartFilled />
                          : <IconHeart />
                      }
                      onClick={() => handlerLikeBTN(post)}
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
              )
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
    )
  } else {
    return <Loading />
  }
}

export default React.memo(page);