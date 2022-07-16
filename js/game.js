'use strict';

//! =====CLASES=====
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

//! =====Selectores del DOM=====
let btnAddFriends = document.querySelector('#btnAddFriends');
let reloadRounds = document.querySelector('#reloadRounds');
let btnClose = document.querySelector('#btnClose');
let playersAdded = document.querySelector('#playersAdded');
let playerName = document.querySelector('.playerName');
let ActivePlayer = document.querySelector('.ActivePlayer');
let categoriesContainer = document.querySelector('#categoriesContainer');
let roundCounter = document.querySelector('#roundCounter');
let category1 = document.querySelector('#category1');
let category2 = document.querySelector('#category2');
let category3 = document.querySelector('#category3');
let category4 = document.querySelector('#category4');
let roundBox = document.querySelector('.roundBox');
let questionBox = document.querySelector('.questionBox');
let categorySelect = document.querySelector('.categorySelect');
let addPlayersContainer = document.querySelector('.addPlayersContainer');
let playerNumer = document.querySelector('#playerNumber')
let btnLoadPlayer = document.querySelector('#btnLoadPlayer');
let alertNextQuestion = document.querySelector('.alertNextQuestion');
let btnStart = document.querySelector('#btnStart');
let loader = document.querySelector('#loader');

//! =====VARIABLES=====
let nextQuestionValidation = true;
let round = 0;
//localStorage.setItem('round', round);
let stateOfGame = false;

//! =====ARRAYS=====
const players = [];
const cat1 = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4', 'pregunta 5', 'pregunta 6', 'pregunta 7', 'pregunta 8', 'pregunta 9', 'pregunta 10'];
const cat2 = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4', 'pregunta 5', 'pregunta 6', 'pregunta 7', 'pregunta 8', 'pregunta 9', 'pregunta 10'];
const cat3 = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4', 'pregunta 5', 'pregunta 6', 'pregunta 7', 'pregunta 8', 'pregunta 9', 'pregunta 10'];
const cat4 = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4', 'pregunta 5', 'pregunta 6', 'pregunta 7', 'pregunta 8', 'pregunta 9', 'pregunta 10'];

//! =====FUNCIONES=====

//* Funcion para agregar jugadores
function addPlayer (e) {
    //e.preventDefault();
    addPlayersContainer.classList.toggle('displayAddPlayerContainer');
    console.log('entro la funcion addPlayer')
    if (JSON.parse(localStorage.getItem('usuarios')) == null) {
        playerNumer.textContent = players.length + 1;
    } else {
        let playersNumbers = JSON.parse(localStorage.getItem('usuarios'));
        playerNumer.textContent = playersNumbers.length + 1;
    }
}

//* Funcion para cargar y guardar jugadores
function loadPlayer () {
    let inputPlayerName = document.querySelector('#name').value;
    let validacionLocalStorageJugadores = JSON.parse(localStorage.getItem('usuarios'));
    if(validacionLocalStorageJugadores == null) {
        console.log('players.length')
        playerNumer.textContent = players.length;
        let newPlayer = new Player(players.length, `${inputPlayerName} ⊗`);
        players.push(newPlayer);
        localStorage.setItem('usuarios', JSON.stringify(players));
    } else {
        console.log('local with information')
        localStorage.clear();
        playerNumer.textContent = validacionLocalStorageJugadores.length + 1;
        let newPlayer = new Player(validacionLocalStorageJugadores.length, `${inputPlayerName} ⊗`);
        validacionLocalStorageJugadores.push(newPlayer);
        localStorage.setItem('usuarios', JSON.stringify(validacionLocalStorageJugadores));
    }
    location.reload();
}

//* Funcion del btn para cerrar addFriends
function closeAddFriends () {
    addPlayersContainer.classList.toggle('displayAddPlayerContainer');
}

//* Funcion para imprimir jugadores cargados
function printPlayers () {
    console.log('entro funcion printPlayers')
    const activePlayers = JSON.parse(localStorage.getItem('usuarios'));
    console.log(activePlayers)

    if (activePlayers != null) {
        activePlayers.forEach(e => {
            let p = document.createElement('p');
            p.setAttribute('class', 'playerName')
            p.setAttribute('onClick', `deletePlayer(${e.id})`)
            p.textContent = e.name;
            playersAdded.appendChild(p);

            
        });


    } else {
        console.log('No hay jugadores cargados')
    }


}

//* Funcion para eliminar un jugador cargado
function deletePlayer (id) {
    console.log('entro funcion deletePlayer')

    let eliminated = JSON.parse(localStorage.getItem('usuarios'));
    let actualizado = eliminated.filter(e => e.id != id);
    localStorage.setItem('usuarios', JSON.stringify(actualizado));

    location.reload();
}

//* Funcion para contar los rounds
function roundNumber () {
    
    let newRound = localStorage.getItem('round');
    if( newRound == null) {
        round++;
    console.log(round)
    localStorage.setItem('round', round);
    } else {
        newRound ++;
        console.log(newRound)
        localStorage.setItem('round', newRound); 
    }
}

//* Funcion para imprimir los rounds
function showRounds () {
    let actualRounds = localStorage.getItem('round', 0);
    roundCounter.textContent = actualRounds;
}

//* Funcion para resetear los rounds del localStorage
function resetRounds () {
    localStorage.removeItem('round');
    location.reload();
    localStorage.setItem('round', 0);
}

//* Funcion para imprimir el jugador de turno
function currentPlayer () {
    let actualPlayer = JSON.parse(localStorage.getItem('usuarios'));
    console.log(actualPlayer);

    let actualRound = localStorage.getItem('round') - 1;
    console.log(actualRound);
    
    if (actualRound < actualPlayer.length) {
        console.log(`actualRound ${actualRound}`)
        console.log(`actualPlayer.length ${actualPlayer.length}`)
        let p = document.createElement('p');
        p.textContent = actualPlayer[actualRound].name;
        ActivePlayer.appendChild(p);

    } else {
        let newRound = localStorage.getItem('round');
        newRound = 0;
        let p = document.createElement('p');
        p.textContent = actualPlayer[newRound].name;
        ActivePlayer.appendChild(p);
        newRound ++;
        localStorage.setItem('round', newRound);
    } 

}

//* Funcion para imprimir preguntas category 1
function printCat1 () {
    roundBox.classList.toggle('roundBoxDisplay');
    roundNumber ()
    currentPlayer ()
    console.log('entro funcion printCat1');
    
    let questionRandom = Math.floor(Math.random() * cat1.length);
    
    let p = document.createElement('p');
    p.textContent = cat1[questionRandom];
    
    let pCat = document.createElement('p');
    pCat.textContent = 'Categoria 1';

    let nextQuestion = document.createElement('button');
    nextQuestion.setAttribute('class', 'nextQuestion');
    nextQuestion.setAttribute('type', 'submit');
    nextQuestion.setAttribute('onClick', 'reloadPage()');
    nextQuestion.textContent = 'Siguiente pregunta';

    categorySelect.appendChild(pCat);
    questionBox.appendChild(p);
    questionBox.appendChild(nextQuestion);
    

}

//* Funcion para imprimir preguntas category 2
function printCat2 () {
    roundBox.classList.toggle('roundBoxDisplay');
    roundNumber ()
    currentPlayer ()
    console.log('entro funcion printCat2');
        let questionRandom = Math.floor(Math.random() * cat2.length);
    
        let p = document.createElement('p');
        p.textContent = cat2[questionRandom];
        
        let pCat = document.createElement('p');
        pCat.textContent = 'Categoria 2';
    
        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';
    
        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);

}

//* Funcion para imprimir preguntas category 3
function printCat3 () {
    roundBox.classList.toggle('roundBoxDisplay');
    roundNumber ();
    currentPlayer ();
    console.log('entro funcion printCat3');
        let questionRandom = Math.floor(Math.random() * cat3.length);
    
        let p = document.createElement('p');
        p.textContent = cat3[questionRandom];
        
        let pCat = document.createElement('p');
        pCat.textContent = 'Categoria 3';
    
        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';
    
        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);

}

//* Funcion para imprimir preguntas category 4
function printCat4 () {
    roundBox.classList.toggle('roundBoxDisplay');
    roundNumber ();
    currentPlayer ();
    console.log('entro funcion printCat4');
        let questionRandom = Math.floor(Math.random() * cat4.length);
    
        let p = document.createElement('p');
        p.textContent = cat4[questionRandom];
        
        let pCat = document.createElement('p');
        pCat.textContent = 'Categoria 4';
    
        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';
    
        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);

}

//* Funcion para recargar pagina y dejar el campo de pregunta vacio para que el usuario pueda elegir nuevamente una categoria
function reloadPage() {
    location.reload();
}

//! =====EVENTOS=====
btnAddFriends.addEventListener('click', addPlayer);
btnClose.addEventListener('click', closeAddFriends);
btnLoadPlayer.addEventListener('click', loadPlayer);
reloadRounds.addEventListener('click', resetRounds);
category1.addEventListener('click', printCat1);
category2.addEventListener('click', printCat2);
category3.addEventListener('click', printCat3);
category4.addEventListener('click', printCat4);
alertNextQuestion.addEventListener('click', roundNumber);

//! =====LOGICA=====
showRounds ()
printPlayers();