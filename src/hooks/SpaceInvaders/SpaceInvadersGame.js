import Tank from './Tank.js';
import Missiles from './Missiles.js';
import SpaceInvadersUI from './SpaceInvadersUI.js';
import Minions from './Minions.js';
import GameMechanics from './GameMechanics.js';
import ScorePanel from './ScorePanel.js';

export default class SpaceInvadersGame {
    constructor() {
        this.initGame();
    }

    /**
     * Starts the game.
     */
    initGame = () => {
        this.intervalToClear = setInterval(this.tick, 8);
        this.listenerToClear = window.addEventListener('keydown', this.handleKeyDown);
        this.tank = new Tank(this);
        this.missiles = new Missiles(this);
        this.minions = new Minions(this);
        this.scorePanel = new ScorePanel();
        this.ui = new SpaceInvadersUI(this.tank, this.missiles, this.minions, this.scorePanel);
        this.gameMechanics = new GameMechanics(this, this.minions, this.missiles);
        this.ui.initGame();
    }

    /**
     * Removes the event listeners from the window and clears the setInterval timer.
     */
    stopGame = () => {
        clearInterval(this.intervalToClear);
        this.clearEventListener();
    }

    clearEventListener = () => {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    gameOver = () => {
        clearInterval(this.intervalToClear);
        this.ui.gameOver();
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
        var missile = this.missiles.addMissile(this.tank.getPosition() + 48, 50);
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
        this.minions.tick();
        this.gameMechanics.checkCollisions();
        this.gameMechanics.checkGameOver();
        this.ui.tick();
    }

    /**
     * Handles input from the keyboard
     * @param {React.KeyboardEvent} e 
     */
    handleKeyDown = (e) => {
        if (e.code === "ArrowRight") {
            this.tank.setDirection(1);
        } else if (e.code === "ArrowLeft") {
            this.tank.setDirection(-1);
        } else if (e.code === "Space") {
            this.handleAddMissile();
        } else if (e.code === "KeyR") {
            this.stopGame();
            this.initGame();
        }
    }

    addMinion = (minion) => {
        this.ui.addMinion(minion);
    }

    removeMinion = (minion) => {
        this.minions.removeMinion(minion);
        this.scorePanel.increaseScore();
        this.ui.removeMinion(minion);
    }
}