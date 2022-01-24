export default class SpaceInvadersUI {
    constructor(tank, missiles, minions, scorePanel) {
        this.tank = tank;
        this.missiles = missiles;
        this.minions = minions;
        this.scorePanel = scorePanel;
        this.gameMain = document.getElementById("space-inavders-game");
    }

    /**
     * Starts the space invaders game.
     */
    initGame = () => {
        var gameMain = document.getElementById("space-invaders-game");
        while (gameMain.firstChild) {
            gameMain.removeChild(gameMain.firstChild);
        }
        var scorePanel = document.createElement('div');
        var scorePanelText = document.createElement('h5');

        scorePanelText.innerHTML = "SCORE: 0";
        scorePanelText.className = 'space-invaders-score-panel-text';
        scorePanel.className = "space-invaders-score-panel";
        scorePanelText.id = "space-invaders-score-panel-text";
        scorePanelText.style.zIndex = 500;

        scorePanel.appendChild(scorePanelText);
        gameMain.appendChild(scorePanel);

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

    gameOver = () => {
        var gameMain = document.getElementById("space-invaders-game");
        var gameOver = document.createElement('div');
        var gameOverText = document.createElement('h1');
        var gameOverSubText = document.createElement('h5');
        gameOverText.innerHTML = "GAME OVER";
        gameOverText.className = "space-invaders-game-over-text";
        gameOverSubText.innerHTML = "PRESS R TO PLAY AGAIN"
        gameOverSubText.className = "space-invaders-game-over-subtext";
        gameOver.className = "space-invaders-game-over";
        gameOver.appendChild(gameOverText);
        gameOver.appendChild(gameOverSubText);
        gameMain.appendChild(gameOver);
    }

    /**
     * updates the missiles on the screen
     */
    updateMissilePositions = () => {
        var allMissiles = this.missiles.getMissiles();
        for (var i = 0; i<allMissiles.length; i++) {
            var missile = allMissiles[i];
            var y = missile.getY() * -1;
            var x = missile.getX();
            var screenMissile = document.getElementById(missile.getId());
            screenMissile.style.transform = "translate3d(" + x + "px," + y + "px, 0)";
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
        var allMinions = this.minions.getMinions();
        for (var i=0; i<allMinions.length; i++) {
            var minion = allMinions[i];
            var minionElement = document.getElementById(minion.getId());
            var x = minion.getXPosition();
            var y = minion.getYPosition() * -1;
            minionElement.style.transform = "translate3d(" + x + "px," + y + "px, 0)"; 
        }
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
        newMissile.style.bottom = "0px";
        newMissile.style.left = "0px"
        newMissile.style.width = missile.getWidth() + "px";
        newMissile.style.height = missile.getHeight() + "px";
        newMissile.style.transform = "translate3d(" + missile.getX() + "," + missile.getY() + "px, 0)";
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
            console.log("Missile type error caught");
        }
    }

    /**
     * Adds a new minion row to the ui
     */
    addMinion = (minion) => {
        var gameMain = document.getElementById("space-invaders-game");
        var newMinion = document.createElement('div');
        newMinion.className = 'space-invaders-minion';
        newMinion.id = minion.getId();
        newMinion.style.left = "0px";
        newMinion.style.right = "0px";
        newMinion.style.bottom = "0px";
        var x = minion.getXPosition();
        var y = minion.getYPosition() * -1;
        newMinion.style.transform = "translate3d(" + x + "px," + y + "px, 0)"; 

        gameMain.append(newMinion);
    }

    removeMinion = (minion) => {
        var gameMain = document.getElementById("space-invaders-game");
        var minionElement = document.getElementById(minion.getId());
        gameMain.removeChild(minionElement);
        this.updateScorePanel();
    }

    updateScorePanel = () => {
        var panelElement = document.getElementById("space-invaders-score-panel-text");
        var score = this.scorePanel.getScore();
        panelElement.innerHTML = "SCORE: " + score;
    }
}