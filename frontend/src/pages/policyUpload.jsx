import { useState } from 'react';

export default function PolicyUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a policy document.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setMessage('');

      const token = localStorage.getItem('token');

      const response = await fetch('/api/policies/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setMessage(
        `Uploaded successfully. Chunks: ${data.chunksCreated}`
      );

      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Company Policy</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Upload Policy'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}