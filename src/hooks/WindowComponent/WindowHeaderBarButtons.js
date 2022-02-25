import React from 'react';
import './WindowComponent.css';

export default function WindowHeaderBarButtons(props) {

    const updatePropsMinimizedFlag = () => {
        props.onMinimize();
    }

    const handleMaximize = () => {
        props.onMaximize();
    }

    const handleClose = () => {
        props.onClose();
    }

    return (
        <div className="col-6 px-0 d-flex justify-content-end">
            <div>
                <button className="window-button" onClick={updatePropsMinimizedFlag}>_</button>
                <button className="window-button" onClick={handleMaximize}>❏</button>
                <button className="window-button" onClick={handleClose}>✕</button>
            </div>
        </div>
    )
}