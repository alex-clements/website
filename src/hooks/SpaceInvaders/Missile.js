/**
 * Class representing a missile on the screen.
 */
export default class Missile {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    /**
     * Updates the position of the missile on the clock cycle.
     */
    tick() {
        this.y = this.y + 1;
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
}