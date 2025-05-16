export const uploadImageViaBackend = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('http://localhost:5005/upload', {
      method: 'POST',
      body: formData
    });
  
    const data = await response.json();
    if (!response.ok || !data.imageURL) throw new Error(data.error || 'Upload failed');
  
    return data.imageURL;
  };