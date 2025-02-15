import React from 'react';
import './SplashScreen.css';
import logo from 'assets/logo.svg';


export default function SplashScreen() {

    return (
        <div className='fallback'>
            <div><img src={logo} alt="" /></div>
        </div>
    );
}