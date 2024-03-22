import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmailVerification from '../components/Auth/EmailVerification';
import Footer from '../components/Footer/Footer';

export default function VerifiedEmail() {
    return (
        <div>
            <Navbar/>
            <EmailVerification/>
            <Footer />
        </div>
    );
}

