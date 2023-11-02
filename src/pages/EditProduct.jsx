import React from 'react';
import { useLocation } from 'react-router-dom';
import EditPost from '../components/Posting/EditPost';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function EditProduct() {
  const location = useLocation(); // Get the current location

  // Access the post._id from the location state
  const postId = location.state?.postId;
  return (
    <div>
      <Navbar />
      <EditPost postId={postId}/>
      <Footer />
    </div>
  );
}
