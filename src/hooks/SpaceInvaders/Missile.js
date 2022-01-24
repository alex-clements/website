/**
 * Class representing a missile on the screen.
 */
export default class Missile {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = 5;
        this.height = 20;
    }

    /**
     * Updates the position of the missile on the clock cycle.
     */
    tick() {
        this.y = this.y + 3;
    }

    /**
     * 
     * @returns the x coordinate of the missile
     */
    getX() {
        return this.x;
    }

    /**
     * 
     * @returns the y coordinate of the missile
     */
    getY() {
        return this.y;
    }

    /**
     * Returns the HTML id of the missile
     * @returns the HTML id of the missile
     */
    getId() {
        return "space-invaders-missile-" + this.id;
    }

    /**
     * Returns the width of the missile.
     * @returns the width of the missile.
     */
    getWidth = () => {
        return this.width;
    }

    /**
     * Returns the height of the missile.
     * @returns the height of the missile.
     */
    getHeight = () => {
        return this.height;
    }

    /**
     * Returns the y-coordinate of the top of the missile.
     * @returns the y-coordinate of the top of the missile.
     */
    getTop = () => {
        return this.y
    }

    /**
     * Returns the y-coordinate of the bottom of the missile.
     * @returns the y-coordinate of the bottom of the missile.
     */
    getBottom = () => {
        return this.y + this.height;
    }

    /**
     * Returns the x-coordinate of the left of the missile.
     * @returns the x-coordinate of the left of the missile.
     */
    getLeft = () => {
        return this.x;
    }

    /**
     * Returns the x-coordinate of the right of the missile.
     * @returns the x-coordinate of the right of the missile.
     */
    getRight = () => {
        return this.x + this.width;
    }
}