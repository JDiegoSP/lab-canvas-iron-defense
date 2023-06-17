const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);
//const audio = game.audio;

const upgradeBtn = document;

const startBtn = document.getElementById('startBtn')
// const restartBtn = document.getElementById('restartBtn')
const titleScreen = document.getElementById('titleScreen')

startBtn.addEventListener('click', () => {
    titleScreen.style.display = 'none'
    game.start();
})

document.addEventListener('keydown', (event) => {
    game.player.getInput(event);
})

// restartBtn.addEventListener('click', () => {
//     restartBtn.style.display = 'none';
// })

