import React from 'react';
import './WindowComponent.css';

export default function WindowHeaderBarTitle(props) {

    return (
        <div className="col-6 px-0 d-flex justify-content-start">
            <img className="mt-1" height="20px" src={props.icon} />
            <p className="font-header-bar my-0 mx-2">{props.windowTitle}</p>
        </div>

    )
}