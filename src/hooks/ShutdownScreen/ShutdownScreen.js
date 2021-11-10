import React from 'react';
import './Shutdown.css';
import captureAnalytics from '../../scripts/captureAnalytics.js';
import { useEffect } from 'react/cjs/react.development';

export default function ShutdownScreen(props) {

    useEffect(() => {
        captureAnalytics("shutdown screen");
    } ,[])

    return (
        <div className='shutdown-screen'>
            <div className='shutdown-screen-spacer'></div>
            <p className="shutdown-screen-text">thanks for visiting.</p>
            <p className="shutdown-screen-text">to see more of my projects, check out my <strong><a className="shutdown-screen-text" href="https://github.com/alex-clements">GitHub</a></strong>.</p>
        </div>
    )
}