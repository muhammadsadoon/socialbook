"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "df0ad27h1";
const CLOUDINARY_UPLOAD_PRESET = "socialbook-project";

interface ImageUploadProps {
  file: File | null;
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
}

export default function ImageUpload({
  file,
  onUploadComplete,
  onError,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const lastUploadedFileRef = useRef<File | null>(null);

  useEffect(() => {
    if (!file) return;

    // 🔒 Prevent same file uploading twice
    if (lastUploadedFileRef.current === file) return;

    lastUploadedFileRef.current = file;

    const upload = async () => {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        onUploadComplete(res.data.secure_url);
      } catch {
        onError?.("Image upload failed");
      } finally {
        setUploading(false);
      }
    };

    upload();
  }, [file]);

  if (!file) return null;

  return <p>{uploading ? "Uploading..." : "Uploaded"}</p>;
}
