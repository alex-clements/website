import Minion from './Minion.js';

export default class Minions {
    constructor(spaceInvadersGame) {
        this.minions = [];
        this.spaceInvadersGame = spaceInvadersGame;
        this.clockCounter = 0;
        this.movementCounter = 0;
        this.nextId = 0;
    }

    /**
     * Adds a minion to the game.
     * @param {minion} minion 
     */
    addMinion = (minion) => {
        this.minions.push(minion);
    }

    /**
     * Removes the minion at the provided index from the game.
     * @param {number} i 
     */
    removeMinion = (i) => {
        this.minions.splice(i, 1)
    }

    /**
     * Returns the array of minions in the game.
     * @returns the array of minions in the game.
     */
    getMinions = () => {
        return this.minions;
    }

    /**
     * Checks to see if new minions need to be added to the screen. Determines the direction
     * of movement for the minions and updates the minions positions.
     */
    tick = () => {
        this.checkAddNewMinions();
        var dir = this.determineDir();
        for (var i=0; i<this.minions.length; i++) {
            this.minions[i].tick(dir);
        }
    }

    /**
     * Returns the direction of travel for the minions.
     * @returns the direction of travel for the minions.
     */
    determineDir = () => {
        var dir;
        if (this.movementCounter < 100) {
            dir = 1;
        } else if (this.movementCounter < 250) {
            dir = 0;
        } else if (this.movementCounter < 350) {
            dir = 2;
        } else if (this.movementCounter < 500) {
            dir = 0;
        }

        if (this.movementCounter < 500) {
            this.movementCounter++;
        } else {
            this.movementCounter = 0;
        }
    
        return dir;
    }

    /**
     * Checks the clock counter to determine if new minions need to be added to the screen.
     */
    checkAddNewMinions = () => {
        if (this.clockCounter == 0) {
            this.addNewMinionRow();
        }
        this.clockCounter += 1;
        if (this.clockCounter >= 500) {
            this.clockCounter = 0;
        }
    }

    /**
     * Adds a new row of minions to the screen.
     */
    addNewMinionRow = () => {
        var spacing = this.spaceInvadersGame.getWindowWidth() / 5;
        for (var i=0; i<5; i++) {
            var newMinion = new Minion(i * spacing, this.spaceInvadersGame.getWindowHeight(), this.nextId);
            this.minions.push(newMinion);
            this.spaceInvadersGame.addMinion(newMinion);
            this.nextId += 1;
        }
    }

    /**
     * Removes a minion from the screen.
     * @param {Minion} minion 
     */
    removeMinion = (minion) => {
        var minionsToRemove = [];

        for (var i=0; i<this.minions.length; i++) {
            if (this.minions[i] == minion) {
                minionsToRemove.push(i);
                break;
                
            }
        }

        minionsToRemove.forEach((i) => {
            this.minions.splice(i, 1);
        })
    }
}