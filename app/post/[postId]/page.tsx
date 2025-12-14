"use client";

import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { useParams, useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';
export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { ["postId"]: param }: { ["postId"]: string } = useParams();
  const [post, setPost] = useState<any>({});

  const routes = useRouter();

  const getPost = async () => {
    const docRef = doc(db, "posts", param); // Get a reference to the document

    const docSnap = await getDoc(docRef); // Fetch the document snapshot

    if (docSnap.exists()) { 
      setPost(docSnap.data());
    } else {
      routes.push("/404");
    }
  };
  useEffect(() => {
    getPost()

  }, []);


  if (!loading) return <Loading />



}
