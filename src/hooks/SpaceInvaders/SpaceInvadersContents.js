import React, {useEffect, useState, useRef} from 'react';
import captureAnalytics from '../../scripts/captureAnalytics.js';
import './SpaceInvaders.css';
import Tank from './Tank.js';
import Missiles from './Missiles.js';

export default function SpaceInvadersContents(props) {
    const left = 10;
    const bottom = 10;
    var tankClass = new Tank();
    var missiles = new Missiles();

    useEffect(() => {
        captureAnalytics("space invaders");
        initGame();
    }, []);

    const initGame = () => {
        setInterval(tick, 10);
        var gameMain = document.getElementById("space-invaders-game");
        var tank = document.createElement("div");
        tank.className="space-invaders-tank"
        tank.id = "space-invaders-tank";
        gameMain.appendChild(tank);
        window.addEventListener('keydown', handleKeyDown);
    }

    const handleAddMissile = () => {
        var gameMain = document.getElementById("space-invaders-game");
        var newMissile = document.createElement('div');
        newMissile.className = 'space-invaders-missile';
        newMissile.id = missiles.getId();
        missiles.incrementId();
        missiles.addMissile(tankClass.getPosition() + 10, 20);
        newMissile.style.bottom = "10px";
        newMissile.style.left = tankClass.getPosition() + "px";
        gameMain.appendChild(newMissile);
    }

    const tick = () => {
        tankClass.tick();
        missiles.tick();
        updateTankPosition();
        updateMissilesPosition();
    }

    const updateTankPosition = () => {
        var position = tankClass.getPosition();
        var transform = "translate3d(" + position + "px, 0, 0)"
        var tank = document.getElementById("space-invaders-tank");
        tank.style.transform = transform;
    }

    const updateMissilesPosition = () => {
        var allMissiles = missiles.getMissiles();
        for (var i = 0; i<allMissiles.length; i++) {
            var missile = allMissiles[i];
            missile.tick();
            var x = missile.getX();
            var y = missile.getY() * -1;
            var screenMissile = document.getElementById("space-invaders-missile-" + i);
            screenMissile.style.transform = "translate3d(0," + y + "px, 0)";
        }
    }

    const handleKeyDown = (e) => {
        console.log(e.code);
        if (e.code === "ArrowRight") {
            tankClass.setDirection(1);
        } else if (e.code === "ArrowLeft") {
            tankClass.setDirection(-1);
        } else if (e.code === "Space") {
            handleAddMissile();
        }
    }

    return (
    <div id="space-invaders-game" tabIndex="0" className="space-invaders-main">
    </div>
    )
}