export default class GameMechanics {
    constructor(spaceInvadersGame, minions, missiles) {
        this.spaceInvadersGame = spaceInvadersGame;
        this.minions = minions;
        this.missiles = missiles;
    }

    checkCollisions = () => {
        var minions = this.minions.getMinions();
        var missiles = this.missiles.getMissiles();

        var minionsToRemove = [];
        var missilesToRemove = [];

        var removedMinions = new Set();
        var removedMissiles = new Set();

        for (var i=0; i<minions.length; i++) {
            for (var j=0; j<missiles.length; j++) {
                var minion = minions[i];
                var missile = missiles[j];
                try {
                    if (
                        missile.getTop() <= minion.getBottom() &&
                        missile.getTop() >= minion.getTop() &&
                        missile.getRight() >= minion.getLeft() &&
                        missile.getLeft() <= minion.getRight()
                        ) {
                            if (!removedMinions.has(minion)) {
                                minionsToRemove.push(minion);
                                removedMinions.add(minion);
                            }

                            if (!removedMissiles.has(j)) {
                                missilesToRemove.push(j);
                                removedMissiles.add(j);
                            }
                    }
                }
                catch (err) {
                    //
                }
            }
        }

        minionsToRemove.forEach(minion => {
            this.spaceInvadersGame.removeMinion(minion);
        })

        missilesToRemove.forEach(missile => {
            this.spaceInvadersGame.removeMissile(missiles[missile]);
            this.missiles.removeMissile(missile);
            
        })
    }

    checkGameOver = () => {
        var minions = this.minions.getMinions();
        for (var i=0; i < minions.length; i++) {
            var minion = minions[i];
            var y = minion.getYPosition();
            if (y <= 0) {
                this.spaceInvadersGame.gameOver();
            }
        }
    }
}