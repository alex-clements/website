export default class Minion {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = 100;
        this.height = 100;
    }

    /**
     * Adjusts the position of the minion.
     * @param {0 | 1 | 2} dir direction of movement (0 - down, 1 - right, 2 - left)
     */
    tick = (dir) => {
        if (dir == 0) {
            this.y -=1;
        } else if (dir == 1) {
            this.x += 1;
        } else if (dir == 2) {
            this.x -= 1;
        }
    }

    /**
     * Returns the HTML ID of the minion.
     * @returns The HTML ID of the minion.
     */
    getId = () => {
        var returnVar = "space-invaders-minion-" + this.id;
        return returnVar;
    }

    /**
     * Returns the x position of the minion.
     * @returns the x position of the minion.
     */
    getXPosition = () => {
        return this.x;
    }

    /**
     * Returns the y position of the minion
     * @returns the y position of the minion
     */
    getYPosition = () => {
        return this.y;
    }

    /**
     * Returns the width of the minion.
     * @returns the width of the minion.
     */
    getWidth = () => {
        return this.width;
    }

    /**
     * Returns the height of the minion.
     * @returns the height of the minion.
     */
    getHeight = () => {
        return this.height;
    }

    /**
     * Returns the y-coordinate of the top of the minion.
     * @returns the y-coordinate of the top of the minion.
     */
    getTop = () => {
        return this.y;
    }

    /**
     * Returns the y-coordinate of the bottom of the minion.
     * @returns the y-coordinate of the bottom of the minion.
     */
    getBottom = () => {
        return this.y + this.height;
    }

    /**
     * Returns the x-coordinate of the left of the minion.
     * @returns The x-coordinate of the left of the minion.
     */
    getLeft = () => {
        return this.x;
    }

    /**
     * Returns the x-coordinate of the right of the minion.
     * @returns the x-coordinate of the right of the minion.
     */
    getRight = () => {
        return this.x + this.width;
    }
}