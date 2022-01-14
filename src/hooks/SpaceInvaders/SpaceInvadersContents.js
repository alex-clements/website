import React, {useEffect, useState, useRef} from 'react';
import captureAnalytics from '../../scripts/captureAnalytics.js';
import './SpaceInvaders.css';
import Tank from './Tank.js';
import Missile from './Missile.js';

export default function SpaceInvadersContents(props) {
    const [tankX, setTankX] = useState(10);
    const [missiles, setMissiles] = useState([]);

    /**
     * Add event listeners
     */
    useEffect(() => {
        captureAnalytics("space invaders");
        setInterval(moveMissiles, 100);

        return (() => {
        })
    }, []);

    /**
     * Key event handler for game
     * @param {React.KeyboardEvent} e 
     */
    const handleKeyDown = (e) => {
        if (e.code == "ArrowRight" || e.code == "ArrowLeft") {
            moveTank(e);
        } else if (e.code === "Space") {
            shootMissile();
        }
    }

    /**
     * Adds a new missile to the list of missiles from the tank's current x position
     */
    const shootMissile = () => {
        const missileX = tankX;
        const missileY = 20;
        const newMissiles = missiles;
        newMissiles.push([missileX, missileY]);
        setMissiles(newMissiles);
        console.log("adding missile")
    }

    /**
     * Moves the missiles
     * @param {} e 
     */
    const moveMissiles = () => {
        console.log(missiles);
        setMissiles(oldMissiles => {
            const newMissiles = [];
            const existingMissiles = oldMissiles;
            for (var i=0; i < existingMissiles.length; i++) {
                var newMissile = existingMissiles[i];
                newMissile[1] = newMissile[1] + 5;
                newMissiles.push(newMissile);
            }
            return newMissiles
        })
    }

    /**
     * Function to move tank left or right
     * @param {*} e 
     */
    const moveTank = (e) => {
        var newTankX = tankX;
        newTankX = e.code === "ArrowRight" ? tankX + 20 : tankX - 20;
        setTankX(newTankX);
    }

    return (
    <div tabIndex="0" onKeyDown={handleKeyDown} className="space-invaders-main">
        <Tank tankX={tankX} />
        {missiles.map((item, index) => <Missile key={index} position={item} />)}
    </div>
    )
}