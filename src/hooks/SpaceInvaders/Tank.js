export default class Tank {
    constructor(spaceInvadersGame) {
        this.direction = 1;
        this.positionX = 0;
        this.spaceInvadersGame = spaceInvadersGame;
    }

    /**
     * Updates the direction of the tank (1 for right, -1 for left)
     * @param {1 | -1} dir 
     */
    setDirection(dir) {
        this.direction = dir;
    }

    /**
     * Returns the x position of the tank.
     * @returns the x position of the tank
     */
    getPosition() {
        return this.positionX;
    }

    /**
     * Returns the direction of the tank.
     * @returns the current direction of the tank (1 for right, -1 for left)
     */
    getDirection() {
        return this.direction;
    }

    /**
     * Updates the tank position on each clock cycle.
     */
    tick = () => {
        var windowWidth = this.spaceInvadersGame.getWindowWidth();
        var position = this.getPosition();
        var direction = this.getDirection();
        if ((position > 0 && direction === -1) || (position < windowWidth - 20 && direction === 1)) {
            this.positionX = this.positionX + this.direction;
        } 
    }
}