export const getImageUrl = (imagePath: string): string => {
  // If the image path is already a full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Otherwise, prepend the backend URL
  return `http://localhost:5000${imagePath}`;
}; 