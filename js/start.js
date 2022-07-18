
let btnStart = document.querySelector('#btnStart');
let loader = document.querySelector('#loader');

function startGame() {
    console.log('entro funcion startGame')
    location.href = 'pregame.html';
}



//! =====EVENTOS=====
btnStart.addEventListener('click', startGame);