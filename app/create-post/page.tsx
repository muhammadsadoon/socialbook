"use client"
import Image from 'next/image';
import React, { useState ,useEffect } from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { Button, Stack, Text, TextInput, Group, Textarea, Avatar, Divider } from '@mantine/core'
import { useForm } from "@mantine/form";
import toast, { Toaster } from 'react-hot-toast';
import { IconPhoto, IconTag } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store/store';
import { dispatchPostAction } from '@/utils/redux/store/actions/post-actions/post-actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { checkImageFileSize } from '@/utils/custom-functions';
const Page = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  let temp: any = null;
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      content: '',
      image: null,
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
      content: (value) => (value.length > 0 ? null : 'Content is required'),
    },
  });

  // app dispatch function defined here...
  const dispatch = useDispatch<AppDispatch>();

  const handleOnCompleted = (files: any) => {
    const imageSize = checkImageFileSize(files[0]?.base64_file);
    if (imageSize < 125000) {
      form.setFieldValue('image', files[0]?.base64_file);
      setImagePreview(files[0].base64_file);
    } else {
      toast("😵 Your Image is to large please resubmitted image less then 500 kb")
    }

  }


  // handler dispatch post submitting
  const handleSubmit = (values: any) => {
    clearTimeout(temp);
    onAuthStateChanged(auth, (user) => {
    temp = setTimeout(() => {
        if (user) {
          dispatch(dispatchPostAction({ ...values, uid: user.uid })).catch((err) => {
            toast("😵 something went wrong..." + JSON.stringify(err));
          }).finally(() => {
            toast("🥳 Post created successfully!");
            form.reset();
            setImagePreview(null);
          });
        }
      }, 1000);
    });
  }

  // on component mounted

  useEffect(()=>{
    document.title = "Create the post | your mind";
    
  },[]);

  const handleCustumizedButton = () => {
    return (
      <Button variant="subtle" leftSection={<IconPhoto size={16} />} onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}>
        Photo/Video
      </Button>
    );
  }
  return (
    <div className='min-h-[80vh] h-full w-full flex items-center justify-center flex-col gap-4'>
      <Toaster />
      <Stack className='min-h-[400px] bg-white w-[50vw] min-w-[400px] border border-slate-200 p-4 shadow rounded-lg'>
        <Group>
          <Avatar size="md" />
          <Text fw={500}>Your Name</Text>
        </Group>
        <Divider />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="What's on your mind?"
            required
            id="title"
            key={form.key('title')}
            {...form.getInputProps('title')}
            className="mb-4"
          />
          <Textarea
            label="Content"
            placeholder="Share your thoughts..."
            required
            id="content"
            key={form.key('content')}
            {...form.getInputProps('content')}
            className="mb-4"
            minRows={3}
          />
          <div className="mb-4">
            <Text size="sm" fw={500} mb="xs">Add to your post</Text>
            <Group>
              <ReactImageFileToBase64 onCompleted={handleOnCompleted} CustomisedButton={handleCustumizedButton} />
              <Text size='sm'>While selecting an image, please make sure it is less than 500 KB.</Text>
            </Group>
          </div>
          {imagePreview && (
            <div className="mb-4">
              <Text size="sm" fw={500} mb="xs">Image Preview</Text>
              <Image src={imagePreview} height={100} width={100} alt="Preview" />
            </div>
          )}
          <Group justify="flex-end" mt="md">
            <Button type="submit" className='bg-blue-600 hover:bg-blue-700'>Post</Button>
          </Group>
        </form>
      </Stack>
    </div>
  )
}

export default Page
