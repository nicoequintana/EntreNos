

//! =====CLASES=====
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


//! =====Selectores del DOM=====
let btnAddFriends = document.querySelector('#btnAddFriends');
let playersAdded = document.querySelector('#playersAdded');
let playerName = document.querySelector('.playerName');
let category1 = document.querySelector('#category1');
let category2 = document.querySelector('#category2');
let category3 = document.querySelector('#category3');
let category4 = document.querySelector('#category4');
let questionBox = document.querySelector('.questionBox');
let categorySelect = document.querySelector('.categorySelect');

//! =====ARRAYS=====
const players = [];
const categories = [];
const cat1 = ['pregunta 1', 'pregunta 2', 'pregunta 3'];
const cat2 = ['pregunta 1', 'pregunta 2', 'pregunta 3'];
const cat3 = ['pregunta 1', 'pregunta 2', 'pregunta 3'];
const cat4 = ['pregunta 1', 'pregunta 2', 'pregunta 3'];

//! =====FUNCIONES=====
//* Funcion para agregar jugadores
function addPlayer (e) {
    //e.preventDefault();
    console.log('entro la funcion addPlayer')
    let player = prompt('Ingrese el nombre del jugador');

    let validacionLocalStorageJugadores = JSON.parse(localStorage.getItem('usuarios'));

    if(validacionLocalStorageJugadores == null) {
        console.log('local null')
        let newPlayer = new Player(players.length, player);
        players.push(newPlayer);
        localStorage.setItem('usuarios', JSON.stringify(players));

    } else {
        console.log('local with information')
        localStorage.clear();
        let newPlayer = new Player(validacionLocalStorageJugadores.length, player);
        validacionLocalStorageJugadores.push(newPlayer);
        localStorage.setItem('usuarios', JSON.stringify(validacionLocalStorageJugadores));

    }

    location.reload();

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

//* Funcion para imprimir preguntas category 1
function printCat1 () {
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
category1.addEventListener('click', printCat1);
category2.addEventListener('click', printCat2);
category3.addEventListener('click', printCat3);
category4.addEventListener('click', printCat4);
//! =====LOGICA=====
printPlayers();