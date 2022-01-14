import Missile from './Missile.js';

export default class Missiles {
    constructor() {
        this.missiles = [];
        this.nextId = 0;
    }

    addMissile(x, y) {
        var missile = new Missile(x, y, this.nextId);
        this.missiles.push(missile);
        this.incrementId();
        return missile;
    }

    tick() {
        for (var i=0; i<this.missiles.length; i++) {
            this.missiles[i].tick();
        }
    }

    getMissiles() {
        return this.missiles;
    }

    getNextId() {
        return this.nextId;
    }

    incrementId() {
        this.nextId = this.nextId + 1;
    }

    removeMissile(i) {
        this.missiles.splice(i, 1);
    }

}