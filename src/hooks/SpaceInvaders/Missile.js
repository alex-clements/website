export default class Missile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    tick() {
        this.y = this.y + 1;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}