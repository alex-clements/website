export default class Tank {
    constructor() {
        this.direction = 1;
        this.positionX = 0;
    }

    setDirection(dir) {
        this.direction = dir;
    }

    getPosition() {
        return this.positionX;
    }

    getDirection() {
        return this.direction;
    }

    tick() {
        this.positionX = this.positionX + this.direction;
    }
}