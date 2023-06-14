const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const game = new Game(ctx);
//const audio = game.audio

const upgradeBtn = document

//const startBtn = document.getElementById('startBtn')
//const titleScreen = document.getElementById('titleScreen')

game.start()

// startBtn.addEventListener('click', () => {
//     titleScreen.style.display = 'none'
    
// })

document.addEventListener('keydown', (event) => {
    game.player.getInput(event);
})

