export default class ScorePanel {
    constructor() {
        this.score = 0;
    }

    increaseScore = () => {
        this.score += 10;
    }

    getScore = () => {
        return this.score;
    }
}