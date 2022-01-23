export default class SpaceInvadersUI {
    constructor(tank, missiles, minions) {
        this.tank = tank;
        this.missiles = missiles;
        this.minions = minions;
        this.gameMain = document.getElementById("space-inavders-game");
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

    /**
     * Updates the positions of the ui components each clock cycle
     */
    tick = () => {
        this.updateMissilePositions();
        this.updateTankPosition();
        this.updateMinionPositions();
    }

    /**
     * updates the missiles on the screen
     */
    updateMissilePositions = () => {
        var allMissiles = this.missiles.getMissiles();
        for (var i = 0; i<allMissiles.length; i++) {
            var missile = allMissiles[i];
            var y = missile.getY() * -1;
            var screenMissile = document.getElementById(missile.getId());
            screenMissile.style.transform = "translate3d(0," + y + "px, 0)";
        }
    }

    /**
     * Updates the position of the tank on the screen.
     */
    updateTankPosition = () => {
        var position = this.tank.getPosition();
        var transform = "translate3d(" + position + "px, 0, 0)"
        var tankElement = document.getElementById("space-invaders-tank");
        tankElement.style.transform = transform;
    }

    /**
     * Updates the position of the minions on the screen.
     */
    updateMinionPositions = () => {

    }

    /**
     * Adds a missile at the x position provided.
     * @param {missile} missile
     */
    addMissile = (missile) => {
        var gameMain = document.getElementById("space-invaders-game");
        var newMissile = document.createElement('div');
        newMissile.className = 'space-invaders-missile';
        newMissile.id = missile.getId();
        newMissile.style.bottom = "10px";
        newMissile.style.left = this.tank.getPosition() + 10 + "px";
        gameMain.appendChild(newMissile);
    }

    /**
     * Removes a missile with the provided id from the screen.
     * @param {missile} missile missile to be removed from screen.
     */
    removeMissile = (missile) => {
        var gameMain = document.getElementById("space-invaders-game");
        try {
            var missileElement = document.getElementById(missile.getId());
            gameMain.removeChild(missileElement);
        } catch(TypeError) {
            console.log("got here");
        }
        
    }
}