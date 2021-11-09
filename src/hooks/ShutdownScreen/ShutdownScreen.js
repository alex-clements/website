import React from 'react';
import './Shutdown.css';

export default function ShutdownScreen(props) {

    return (
        <div className='shutdown-screen'>
            <div className='shutdown-screen-spacer'></div>
            <p className="shutdown-screen-text">thanks for checking this out</p>
            <p className="shutdown-screen-text">to see more of my projects, check out my 
                <strong>
                    <a className="shutdown-screen-text" href="https://github.com/alex-clements">GitHub</a>
                </strong>
            </p>


        </div>
    )
}