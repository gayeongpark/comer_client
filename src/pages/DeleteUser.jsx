import React from 'react';
import Delete from '../components/Auth/Delete';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function DeleteUser() {
    return (
        <div>
           <Navbar/>
           <Delete/>
           <Footer/>
        </div>
    );
}

