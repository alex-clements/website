export default class ScorePanel {
    constructor() {
        this.score = 0;
    }

    /**
     * Increases the score by 10 points.
     */
    increaseScore = () => {
        this.score += 10;
    }

    /**
     * Returns the current score.
     * @returns the current score.
     */
    getScore = () => {
        return this.score;
    }
}