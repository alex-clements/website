import Missile from './Missile.js';

/**
 * Class for handling all missiles in the game.
 */
export default class Missiles {
    constructor(spaceInvadersGame) {
        this.missiles = [];
        this.nextId = 0;
        this.spaceInvadersGame = spaceInvadersGame;
    }

    /**
     * Adds a missile to the game at the provided x and y coordinates.
     * @param {number} x 
     * @param {number} y 
     * @returns Missile
     */
    addMissile(x, y) {
        var missile = new Missile(x, y, this.nextId);
        this.missiles.push(missile);
        this.incrementId();
        return missile;
    }

    /**
     * Function to update the position of the missiles on each clock cycle.
     */
    tick() {
        for (var i=0; i<this.missiles.length; i++) {
            this.missiles[i].tick();
        }
        this.checkMissilesOffScreen();
    }

    /**
     * Returns the array of missiles in the game.
     * @returns Array of missiles
     */
    getMissiles() {
        return this.missiles;
    }

    /**
     * REturns the next available missile id
     * @returns The next available missile id
     */
    getNextId() {
        return this.nextId;
    }

    /**
     * Increases the next available missile id by one
     */
    incrementId() {
        this.nextId = this.nextId + 1;
    }

    /**
     * Removes a missile at the given index
     * @param {number} i 
     */
    removeMissile(i) {
        this.missiles.splice(i, 1);
    }

    /**
     * Updates the position of the missiles on the screen.
     */
    checkMissilesOffScreen = () => {
        var missilesToRemove = []
        for (var i = 0; i<this.missiles.length; i++) {
            var missile = this.missiles[i];
            if (missile.getY() > this.spaceInvadersGame.getWindowHeight()) {
                missilesToRemove.push(i);
            }
        }
        missilesToRemove.forEach((i) => {
            this.spaceInvadersGame.removeMissile(this.missiles[i]);
            this.removeMissile(i);
        })
    }

}