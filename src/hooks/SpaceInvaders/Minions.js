export default class Minions {
    constructor() {
        this.minions = [];
    }

    addMinion = (minion) => {
        this.minions.push(minion);
    }

    removeMinion = (i) => {
        this.minions.splice(i, 1)
    }

    getMinions = () => {
        return this.minions;
    }
}