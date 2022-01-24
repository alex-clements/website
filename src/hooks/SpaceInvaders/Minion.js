export default class Minion {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = 100;
        this.height = 100;
    }

    tick = (dir) => {
        if (dir == 0) {
            this.y -=1;
        } else if (dir == 1) {
            this.x += 1;
        } else if (dir == 2) {
            this.x -= 1;
        }
    }

    getId = () => {
        var returnVar = "space-invaders-minion-" + this.id;
        return returnVar;
    }

    getXPosition = () => {
        return this.x;
    }

    getYPosition = () => {
        return this.y;
    }

    getWidth = () => {
        return this.width;
    }

    getHeight = () => {
        return this.height;
    }

    getTop = () => {
        return this.y;
    }

    getBottom = () => {
        return this.y + this.height;
    }

    getLeft = () => {
        return this.x;
    }

    getRight = () => {
        return this.x + this.width;
    }
}