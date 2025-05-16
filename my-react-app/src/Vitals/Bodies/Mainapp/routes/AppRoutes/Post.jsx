import React from 'react';
import DynamicComponent from './DynamicComponent'; // Import the reusable component
import ViewPost from '../MainComponents/User/ViewPost';
import AddPost from '../MainComponents/User/AddPost';

const Post = () => {
  return (
    <DynamicComponent
      dataKey="posts" // Fetch posts data
      title="Posts"
      ViewComponent={ViewPost} // Pass the specific view component for posts
      AddComponent={AddPost}  // Pass the specific add component for posts
    />
  );
};

export default Post;
