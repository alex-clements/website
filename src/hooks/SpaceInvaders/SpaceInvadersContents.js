import React, {useEffect, useState, useRef} from 'react';
import captureAnalytics from '../../scripts/captureAnalytics.js';
import './SpaceInvaders.css';
import SpaceInvadersGame from './SpaceInvadersGame.js';

export default function SpaceInvadersContents(props) {
    const [myInterval, setMyInterval] = useState(null);


    useEffect(() => {
        captureAnalytics("space invaders");
        var spaceInvadersGame = new SpaceInvadersGame();

        return (() => {
            spaceInvadersGame.stopGame();
        })
    }, []);

    return (
    <div id="space-invaders-game" tabIndex="0" className="space-invaders-main">
    </div>
    )
}