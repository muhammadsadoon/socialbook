"use client";
// pages/friends.tsx
import { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mantine/core";
import FriendsSection from "@/components/friends-section/friends-section";
import Suggestions from "@/components/friends-section/suggations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/utils/redux/store/store";
import { getAllFriendFromFB } from "@/utils/redux/store/actions/friend-request-action/friend-request-action";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";


interface Friend {
    uid: string;
    name: string;
    avatar: string;
    online: boolean;
    requests: string[];
}

export default function FriendsPage() {

    const [users, setUser] = useState<Friend[]>();
    const [loader, setLoader] = useState<Boolean>(true);
    
    // dispatch functions defined here
    const dispatch = useDispatch<AppDispatch>();
    const authID = useSelector(({ authStates }: any) => authStates?.isAuthentication?.uid);
    // console.log(authID);

    useEffect(() => {
        dispatch(getAllFriendFromFB())
            .then((data: Friend[]) => {
                let temp = data.filter((i) => {
                    return(i.uid !== authID)
                });
                setUser(temp);

                setLoader(false)
            })
            .catch((err) => toast(err))
    }, []);
    if (loader) return <Loading />
    else return (
        <Container size="xl" py="md">
            <Toaster />
            <Grid>
                {/* Left Sidebar */}
                <Grid.Col span={12}>
                    <Box bg="white" p="md">
                        Sidebar / Navigation
                    </Box>
                </Grid.Col>

                {/* Friends Section */}
                <Grid.Col span={12} >
                    {users && <FriendsSection friends={users} />}
                </Grid.Col>

                {/* Right Sidebar / Suggestions */}
                <Grid.Col span={12}>
                    {users && <Suggestions suggestions={users.filter((e, i) => i < 3)} />}
                </Grid.Col>
            </Grid>
        </Container>
    );
}
