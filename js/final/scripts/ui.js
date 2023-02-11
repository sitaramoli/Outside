export class UI {
    constructor(game) {
        this.game = game;
        this.startMenu = document.getElementById('start-menu');
        this.pauseMenu = document.getElementById('pause-menu');
        this.overMenu = document.getElementById('over-menu');
        this.score = document.getElementById('score');
        this.highScore = document.getElementById('high-score');
    }

    draw(context) {

        switch (this.game.state) {
            case 'START':
                this.startMenu.style.display = 'block';
                this.pauseMenu.style.display = 'none';
                this.overMenu.style.display = 'none';
                break;

            case 'PLAY':
                this.startMenu.style.display = 'none';
                this.pauseMenu.style.display = 'none';
                this.overMenu.style.display = 'none';
                context.fillStyle = `white`;
                context.font = `30px Shadows Into Light`;
                context.fillText('Score ' + this.game.score, 20, 40);
                context.fillText('Bullets ' + this.game.player.bulletCount, 20, 80);
                break;
            case 'PAUSE':
                this.startMenu.style.display = 'none';
                this.pauseMenu.style.display = 'block';
                this.overMenu.style.display = 'none';
                break;
            case 'OVER':
                this.startMenu.style.display = 'none';
                this.pauseMenu.style.display = 'none';
                this.overMenu.style.display = 'block';
                this.score.innerHTML = `${this.game.score}`;
                this.highScore.innerHTML = `${this.game.highScore}`;
        }
    }
}