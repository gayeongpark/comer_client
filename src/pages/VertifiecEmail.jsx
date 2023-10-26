import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmailVerification from '../components/Auth/EmailVerification';
import Footer from '../components/Footer/Footer';

export default function VertifiecEmail() {
    return (
        <div>
            <Navbar/>
            <EmailVerification/>
            <Footer />
        </div>
    );
}

