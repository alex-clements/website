import Tank from './Tank.js';
import Missiles from './Missiles.js';
import SpaceInvadersUI from './SpaceInvadersUI.js';
import Minions from './Minions.js';

export default class SpaceInvadersGame {
    constructor() {
        this.intervalToClear = setInterval(this.tick, 8);
        this.listenerToClear = window.addEventListener('keydown', this.handleKeyDown);
        this.tank = new Tank(this);
        this.missiles = new Missiles(this);
        this.minions = new Minions(this);
        this.ui = new SpaceInvadersUI(this.tank, this.missiles, this.minions);
        this.initGame();
    }

    /**
     * Starts the game.
     */
    initGame = () => {
        this.ui.initGame();
    }

    /**
     * Removes the event listeners from the window and clears the setInterval timer.
     */
    stopGame = () => {
        clearInterval(this.intervalToClear);
        window.removeEventListener('keydown', this.handleKeyDown);
        console.log("interval cleared");
    }

    /**
     * Returns the height of the game window.
     * @returns height of the window.
     */
    getWindowHeight = () => {
        var myWindow = document.getElementById("space-invaders-game");
        return myWindow.clientHeight;
    }

    /**
     * Returns the width of the game window.
     * @returns width of the window
     */
    getWindowWidth = () => {
        var myWindow = document.getElementById("space-invaders-game");
        return myWindow.clientWidth;
    }

    /**
     * Function to add new missile to the screen at the tank's location
     */
    handleAddMissile = () => {
        var missile = this.missiles.addMissile(this.tank.getPosition(), 20);
        this.ui.addMissile(missile);
    }

    /**
     * Removes a missile from the game.
     * @param {missile} missile 
     */
    removeMissile = (missile) => {
        this.ui.removeMissile(missile);
    }

    /**
     * Function to update the screen ui
     */
    tick = () => {
        this.tank.tick();
        this.missiles.tick();
        this.ui.tick();
    }

    /**
     * Handles input from the keyboard
     * @param {React.KeyboardEvent} e 
     */
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