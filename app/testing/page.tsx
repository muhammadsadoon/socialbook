"use client";
import React, { useState } from 'react';
import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = 'df0ad27h1'; // Replace with your Cloud Name
const CLOUDINARY_UPLOAD_PRESET = 'socialbook-project'; // Replace with your Unsigned Upload Preset name

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage(null);
    }
    setUrl('');
    setError('');
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setUrl(response.data.secure_url);
      setLoading(false);
      setImage(null); // Clear the selected file input
    } catch (err) {
      setError('Upload failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={!image || loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {url && (
        <div>
          <p>Image uploaded successfully:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          <img src={url} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
