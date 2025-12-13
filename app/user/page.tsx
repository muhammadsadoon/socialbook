"use client"
import {useEffect} from "react"

const page = () => {
  useEffect(()=>{
    document.title("user profile");
  },[]);
  return (
    <div>
      <h1>user profile</h1>
    </div>
  )
}

export default page;
