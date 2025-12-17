"use client"
import { FileInput, Image } from "@mantine/core"
import { useState, useEffect } from 'react'
import { Button, Stack, Text, TextInput, Group, Textarea, Avatar, Divider } from '@mantine/core'
import { useForm } from "@mantine/form";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store/store';
import { dispatchPostAction } from '@/utils/redux/store/actions/post-actions/post-actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import ImageUpload from '@/components/upload-file/upload-file';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  let temp: any = null;

  const getAuthStateFromFB = useSelector((data: any) => data.authStates?.isAuthentication);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      content: '',
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
      content: (value) => (value.length > 0 ? null : 'Content is required'),
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: any) => {
    clearTimeout(temp);

    onAuthStateChanged(auth, (user) => {
      setLoading(true);

      temp = setTimeout(() => {
        if (user) {
          dispatch(
            dispatchPostAction({
              ...values,
              imageUrls, // ✅ MULTIPLE IMAGES
              uid: user.uid,
            })
          )
            .then(() => {
              toast("🥳 Post created successfully!");
              form.reset();
              setImageUrls([]);
            })
            .catch((err) => {
              toast("😵 something went wrong..." + JSON.stringify(err));
            })
            .finally(() => setLoading(false));
        }
      }, 800);
    });
  };

  useEffect(() => {
    document.title = "Create the post | your mind";
  }, []);

  return (
    <div className='h-full w-full flex items-center justify-center flex-col gap-4'>
      <Toaster />

      <Stack className='bg-white w-[50vw] min-w-[400px] p-4 shadow rounded-lg'>
        <Group>
          <Avatar size="md" src={getAuthStateFromFB?.payload?.photoUrl} />
          <Text fw={500}>{getAuthStateFromFB?.payload?.name}</Text>
        </Group>

        <Divider />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="What's on your mind?"
            {...form.getInputProps('title')}
            mb="sm"
          />

          <Textarea
            label="Content"
            placeholder="Share your thoughts..."
            {...form.getInputProps('content')}
            minRows={3}
            mb="sm"
          />

          {/* IMAGE UPLOAD */}
          <div className="mb-4">
            <Text size="sm" fw={500} mb="xs">Add images</Text>

            <FileInput
              accept="image/*"
              placeholder="Choose image"
              onChange={(file) => {
                if (!file) return;
                setCurrentFile(file);
              }}
            />

            <ImageUpload
              file={currentFile}
              onUploadComplete={(url) => {
                setImageUrls((prev) => [...prev, url]);
                setCurrentFile(null);
              }}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {imageUrls.length > 0 && (
            <Group gap="sm" mb="md">
              {imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  h={80}
                  w={80}

                  fit="cover"
                  radius="md"
                  styles={{
                    root: { overflow: "hidden" },
                  }}
                />
              ))}
            </Group>
          )}

          <Group justify="flex-end">
            <Button
              loading={loading}
              loaderProps={{ type: 'oval' }}
              type="submit"
              className='bg-blue-600 hover:bg-blue-700'
            >
              Post
            </Button>
          </Group>
        </form>
      </Stack>
    </div>
  )
}

export default Page;
