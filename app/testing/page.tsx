"use client";
import { Button, Input } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app } from '@/utils/firebase';
import { useSelector } from 'react-redux';


const page = () => {
  const [state, setState] = useState<any>("");
  const [messages, setMessages] = useState<any>([]);

  const auth = useSelector((state: any) => state.authStates?.isAuthentication);
  const db = getDatabase(app);
  const sendMessage = () => {

    set(ref(db, 'users/' + "room-id"), {
      message: state,
      name: auth.payload.name,
      Date: new Date().getTime().toString()
    });


  }

  useEffect(() => {
    onValue(ref(db, 'users/' + "room-id"), (snapshot) => {
      const data = snapshot.val();
      setMessages((pre: any) => [data])
    });
  }, [])
  return (
    <div>
      <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <table cellSpacing={20}>
        <thead>
          {
            messages && messages?.map((item: any, i: number) => {
              return (<tr key={i}>
                <th>{item?.name}</th>
                <th style={{ marginLeft: "20px" }}>{item?.message}</th>
                <th>{item?.date}</th>
              </tr>)
            })
          }
        </thead>
      </table>
      <Button onClick={sendMessage}>Send Massage</Button>
    </div>
  )
}

export default page
