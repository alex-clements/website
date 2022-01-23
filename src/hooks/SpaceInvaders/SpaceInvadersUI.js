export default class SpaceInvadersUI {
    constructor(tank, missiles, minions) {
        this.tank = tank;
        this.missiles = missiles;
        this.minions = minions;
    }

    /**
     * Starts the space invaders game.
     */
    initGame = () => {
        var gameMain = document.getElementById("space-invaders-game");
        var tankElement = document.createElement("div");
        tankElement.className="space-invaders-tank"
        tankElement.id = "space-invaders-tank";
        gameMain.appendChild(tankElement);
    }
}