import Tank from './Tank.js';
import Missiles from './Missiles.js';
import SpaceInvadersUI from './SpaceInvadersUI.js';
import Minions from './Minions.js';

export default class SpaceInvadersGame {
    constructor() {
        this.intervalToClear = setInterval(this.tick, 8);
        this.listenerToClear = window.addEventListener('keydown', this.handleKeyDown);
        this.tank = new Tank();
        this.missiles = new Missiles();
        this.minions = new Minions();
        this.ui = new SpaceInvadersUI(this.tank, this.missiles, this.minions);
        this.initGame();
    }

    initGame = () => {
        this.ui.initGame();
    }

    stopGame = () => {
        clearInterval(this.intervalToClear);
        window.removeEventListener('keydown', this.handleKeyDown);
        console.log("interval cleared");
    }

    getWindowHeight = () => {
        var myWindow = document.getElementById("space-invaders-game");
        return myWindow.clientHeight;
    }

    getWindowWidth = () => {
        var myWindow = document.getElementById("space-invaders-game");
        return myWindow.clientWidth;
    }

    handleAddMissile = () => {
        var gameMain = document.getElementById("space-invaders-game");
        var newMissile = document.createElement('div');
        var missile = this.missiles.addMissile(this.tank.getPosition(), 20);
        newMissile.className = 'space-invaders-missile';
        newMissile.id = missile.getId();
        newMissile.style.bottom = "10px";
        newMissile.style.left = this.tank.getPosition() + 10 + "px";
        gameMain.appendChild(newMissile);
    }

    tick = () => {
        this.updateTankPosition();
        this.updateMissilesPosition();
    }

    updateTankPosition = () => {
        var position = this.tank.getPosition();
        var direction = this.tank.getDirection();
        if ((position > 0 && direction === -1) || (position < this.getWindowWidth() - 20 && direction === 1)) {
            this.tank.tick();
            var transform = "translate3d(" + position + "px, 0, 0)"
            var tankElement = document.getElementById("space-invaders-tank");
            tankElement.style.transform = transform;
        } 
    }

    updateMissilesPosition = () => {
        this.missiles.tick();
        var allMissiles = this.missiles.getMissiles();
        var missilesToRemove = []
        for (var i = 0; i<allMissiles.length; i++) {
            var missile = allMissiles[i];
            missile.tick();
            var y = missile.getY() * -1;
            if (missile.getY() > this.getWindowHeight()) {
                missilesToRemove.push(i);
            }
            var screenMissile = document.getElementById(missile.getId());
            screenMissile.style.transform = "translate3d(0," + y + "px, 0)";
        }

        missilesToRemove.forEach((i) => {
            this.missiles.removeMissile(i);
        })
    }

    handleKeyDown = (e) => {
        console.log(e.code);
        if (e.code === "ArrowRight") {
            this.tank.setDirection(1);
        } else if (e.code === "ArrowLeft") {
            this.tank.setDirection(-1);
        } else if (e.code === "Space") {
            this.handleAddMissile();
        }
    }
}