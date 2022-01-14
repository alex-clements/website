export default class Missile {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
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

    getId() {
        return "space-invaders-missile-" + this.id;
    }
}