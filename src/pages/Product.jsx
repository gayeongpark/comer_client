import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import DetailedProduct from '../components/products/DetailedProduct';

export default function product() {
  return (
    <div>
      <Navbar />
      <DetailedProduct />
      <Footer />
    </div>
  );
}
