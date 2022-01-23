export default class Minions {
    constructor(spaceInvadersGame) {
        this.minions = [];
        this.spaceInvadersGame = spaceInvadersGame;
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
}