let cafecito = document.querySelector('.cafecito');
let nextToGame = document.querySelector('#nextToGame');

function loadGame () {
    setTimeout( () => {
        nextToGame.classList.toggle('nextToGame')
    }, 1000);
}

nextToGame.addEventListener('click', () =>{
    location.href = 'game.html';

});

window.onload = loadGame();