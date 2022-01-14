import Missile from './Missile.js';

export default class Missiles {
    constructor() {
        this.missiles = [];
        this.nextId = 0;
    }

    addMissile(x, y) {
        var missile = new Missile(x, y);
        this.missiles.push(missile);
    }

    tick() {
        for (var i=0; i<this.missiles.length; i++) {
            this.missiles[i].tick();
        }
    }

    getMissiles() {
        return this.missiles;
    }

    getId() {
        return "space-invaders-missile-" + this.nextId;
    }

    incrementId() {
        this.nextId = this.nextId + 1;
    }

}