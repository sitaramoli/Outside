import { Game } from "./game.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    const ctx = canvas.getContext('2d');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');

    const spritesData = [
        { name: 'player', path: './assets/sprites/player.png' },
        { name: 'enemy', path: './assets/sprites/enemy.png' },
        { name: 'playerBullet', path: './assets/sprites/player_bullet.png' },
        { name: 'doubleBullet', path: './assets/sprites/double_bullet.png' },
        { name: 'enemyBullet', path: './assets/sprites/enemy_bullet.png' },
        { name: 'background', path: './assets/sprites/background.jpg' },
        { name: 'damageCoin', path: './assets/sprites/damage_coin.png' },
        { name: 'bulletCoin', path: './assets/sprites/bullet_coin.png' },
        { name: 'healthCoin', path: './assets/sprites/health_coin.png' },
        { name: 'explosion', path: './assets/sprites/explosion.png' }
    ];

    const soundsData = [
        { name: 'bullet', path: './assets/audios/bullet.mp3', volume: .05 },
        { name: 'powerup', path: './assets/audios/powerup.mp3', volume: 1 },
        { name: 'explosion', path: './assets/audios/explosion.mp3', volume: .3 },
        { name: 'gameOver', path: './assets/audios/game_over.mp3', volume: 1 }
    ];

    let totalResources = spritesData.length;
    let loadedResources = 0;

    // load sprites
    let sprites = {};
    loadImages();

    // load sounds
    let sounds = {};
    loadSounds();

    for (const key in sprites) {
        sprites[key].addEventListener('load', function () {
            loadedResources++;
            loadingBar.style.width = `${loadedResources / totalResources * 100}%`;
            if (loadedResources === totalResources) {
                loadingScreen.style.display = `none`;
                canvas.style.display = `block`;

                let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas, sprites, sounds);
                let lastTime = 0;

                function animate(timeStamp) {
                    const deltaTime = timeStamp - lastTime;
                    lastTime = timeStamp;
                    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    game.update(deltaTime);
                    game.draw(ctx);
                    requestAnimationFrame(animate);
                }

                animate(0);
            }
        });
    }

    /**
     *Loads sprites
     *
     * @return {*} 
     */
    function loadImages() {
        spritesData.forEach(sprite => {
            const img = new Image();
            img.src = sprite.path;
            sprites[sprite.name] = img;
        });
    }

    /**
     *load sounds
     *
     */
    function loadSounds() {
        soundsData.forEach(sound => {
            const audio = new Audio(sound.path);
            audio.volume = sound.volume;
            sounds[sound.name] = audio;
        });
    }
});