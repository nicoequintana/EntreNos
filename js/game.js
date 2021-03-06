'use strict';

window.onload = function () {
    spinner.classList.toggle('spinnerOff');  
    showRounds()
    printPlayers();
}

//! =====CLASES=====
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

//! =====Selectores del DOM=====
let spinner = document.querySelector('.spinnerContainer');
let btnAddFriends = document.querySelector('#btnAddFriends');
let reloadRounds = document.querySelector('#reloadRounds');
let btnClose = document.querySelector('#btnClose');
let btnNotPlayerLoaddedClose = document.querySelector('#btnNotPlayerLoaddedClose');
let alertEmptyName = document.querySelector('#alertEmptyName');
let alertNotPlayerLoadded = document.querySelector('#alertNotPlayerLoadded');
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
let btnCloseRoundBox = document.querySelector('#btnCloseRoundBox');
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
const cat1 = ['Cu??l es tu mayor temor?',
    'Sentiste envidia alguna vez?',
    'Crees qu?? haces lo necesario para alcanzar tus metas?',
    'Qu?? tipo de tareas soles procastinar?',
    'Te consideras una persona paciente?',
    'Qu?? te genera mal humor?',
    'Qu?? haces cuando estas enojado?',
    'Te consideras una persona ansiosa?',
    'Qu?? man??as reconoces de vos mismo?',
    'Cu??l es tu mayor temor?',
    'Cu??l es el mayor logro de tu vida?',
    'Qu?? caracteristica personal consideras que te diferencia del resto?',
    'Qu?? es aquello que a??n no has hecho, y tienes muchas ganas de hacer? Hay algo que te detenga?',
    'Si pudieses elegir una opcion, volver??as 10 a??os atr??s en tu vida o ser??as extremadamente famoso?',
    'Qu?? g??nero musical te identifica?',
    'Con qu?? cosas consideras que sos muy pesado o plomo?',
    'Las fantas??as sexuales, aportan a la pareja o pueden destruirla?',
    'Amistad con ex parejas, si o no?',
    'Cu??l fue la experiencia en tu vida que m??s te marco?',
    'Cu??les son tus t??cticas de levante?',
    'Tenes alguna pel??cula que te haya marcado de alguna manera?',
    'Cu??l fue tu situaci??n m??s vergonzosa que viviste?',
    'Has dicho mentiras piadosas?, conta la/s que te acuerdes',
    'Qu?? ser??as capaz de hacer por amor?',
    'Cu??les son tus anclas emocionales?',
    'Cambiar??as algo de tu personalidad?',
    'Qu?? cosas o situaciones te dan mucha verg??enza ajena?',
    'Hay algo que te gusta y no lo dices o haces por verg??enza?',
    'En una cita, qu?? cosas o actitudes pueden hacer que se termine antes del postre?'
]
const cat2 = ['C??mo te preparas para encarar una situaci??n que te da miedo?',
    'Cu??l es tu mayor motivaci??n?',
    'Crees que ten??s alguna actitud autodestructiva?',
    'Qu?? haces cuando sent??s que, por alguna raz??n, debes dejar de ver a alguien?',
    'Existe el amor a primera vista?',
    'Qu?? lugar ocupa el trabajo en tu vida?',
    'Qui??n define la moda para vos?',
    'Se puede ser feliz todo el tiempo?',
    'Tienes miedo a morir? Qu?? posici??n tienes respecto a la muerte?',
    'En qu?? medida es importante nuestro pasado?',
    'Qu?? edad tendr??as si no supieses que edad tienes?',
    'Qu?? preferir??as, perder tus memorias o no poder generar nuevos recuerdos?',
    'Qu?? har??as de forma diferente si supieses que nadie te va a juzgar?',
    'Si alguien cercano te dice que quiere o le da intriga el consumo de drogas, qu?? har??as?',
    'Despu??s de cuantas "idas y vueltas" la relaci??n se deber??a terminar?',
    'Perdonar??as una infidelidad?',
    'Qu?? har??as si alguien cercano te cuenta que comenzar?? a vender contenido porno?',
    'Qu?? situaciones te generan felicidad?',
    'La felicidad para vos, es una estado de ??nimo o un momento espec??fico?',
    'Cu??l es tu sost??n en situaciones dif??ciles?',
    'Sos todo lo que so??aste?',
    'Hasta que punto te sos fiel a vos mismo/a VS lo que impone la sociedad?',
    'Crees que las redes sociales pueden romper un v??nculo? por qu???',
    'Qu?? consejo le dar??as a tu "yo" de 14 a??os?'
];
const cat3 = ['Cu??l es tu movivaci??n para levantarte todas las ma??anas?',
    'Qu?? actividad o carrera te hubiese gustado seguir?',
    'Dulce o salado?',
    'Que te hace perder el control?',
    'Recordas una situaci??n en la que hayas vendido "humo"? Si te animas, contala.',
    'Cu??l es el plato que mejor crees que te sale?',
    'Sos de las personas que piensan que la m??sica de su ??poca es mejor que la actual?',
    'Sos fiel seguidor/a de la moda?',
    'Sos capaz de reconocer man??as de los jugadores que est??n con vos?',
    'Hay algo que te gustar??a hacer pero no te atreves?',
    'Qui??n es la primera persona a la que le pedir??as un consejo respecto a un asunto de vida o muerte?',
    'Si pudieras darle a un ni??o solo un consejo, cu??l le darias?',
    'Quebrantar??as la Ley para salvar a alguien a quien quieres?',
    'Eres el tipo de amigo que quieres tener como amigo?',
    'Tu mayor temor, Se ha hecho alguna vez realidad?',
    'Si supieses que todas las personas a quien conoces van a desaparecer ma??ana ??A qui??n ir??as a ver hoy?',
    'A qui??n/es consideras referente/s?',
    'Qu?? es lo peor que alguien te puede hacer?',
    'Hay alg??n rasgo f??sico muy puntual que te guste de las personas?',
    'Hiciste o te han hecho pasar una situaci??n muy vergonzosa en p??blico?',
    'Pedir "tiempo" en una relaci??n, funciona?',
    'Cu??les fueron las mejores vacaciones que tuviste?, por qu???',
    'Si tuvieses s??lo 24 hs. para hacer y/o tener lo que sea que desees, qu?? har??as?',
    'Qu?? tan importante es lo f??sico para vos?',
    'Despu??s de un encuentro casual, desayuno s?? o no?',
    'Qu?? cosas o situaciones te la bajan?',
    'Qu?? cosas o situaciones te dan cringe?',
    'C??mo influyen las redes sociales en tu vida?'
];
const cat4 = ['Existe la envidia sana?',
    'Sos genuino/a todo el tiempo? Se puede?',
    'Sos capaz de reconocer en vos cuando estas enojado y es mejor no actuar?',
    'Te sentiste fuera de lugar alguna vez? recordas el por qu???',
    '"Dinero" por sobre cualquier cosa?',
    'Existe un destino ya escrito o lo creamos nosotros con nuestros actos?',
    'Vivir??as eternamente si pudieras?',
    'Qu?? es peor? Fallar o no haberlo intentado nunca?',
    'Te cuesta confiar en otras personas?, por qu???',
    'El mundo ser?? un lugar mejor, s?? o no?',
    'E.S.I. en la escuela primaria. Si o no?',
    'Es necesario actualizar la educaci??n tal cu??l la conocemos hoy en d??a?',
    'Qu?? pensas del consumo recreativo de drogas?',
    'Qu?? pensas de incluir educaci??n sobre drogas en la escuela secundaria?',
    'Volver??as al pasado para cambiar algo?',
    'Qu?? pensas sobre las APPs de citas?, modificaron la forma de conocer gente para bien o para mal?',
    'Crees que la pandemia tuvo alg??n efecto positivo en las personas o en el mundo?',
    'Qu?? pensas del "fanatismo"?. Es algo positivo o un sin??nimo de ceguera?',
    'Las redes sociales, terminan acercando o alejando a las personas?',
    'Sos capaz de reconocer en vos alguna actitud "avara"?',
    'Te sentiste discriminado alguna vez?',
    'La juventud esta perdida??',
    'Qu?? hay de cierto en que las nuevas generaciones no Leen? Lo crees as???'
];

//! =====FUNCIONES=====

//* Funcion para agregar jugadores
function addPlayer(e) {
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
function loadPlayer() {
    let inputPlayerName = document.querySelector('#name').value;
    let validacionLocalStorageJugadores = JSON.parse(localStorage.getItem('usuarios'));

    if (inputPlayerName !== '') {
        if (validacionLocalStorageJugadores == null) {
            console.log('players.length')
            playerNumer.textContent = players.length;
            let newPlayer = new Player(players.length, `${inputPlayerName} ???`);
            players.push(newPlayer);
            localStorage.setItem('usuarios', JSON.stringify(players));
        } else {
            console.log('local with information')
            localStorage.clear();
            playerNumer.textContent = validacionLocalStorageJugadores.length + 1;
            let newPlayer = new Player(validacionLocalStorageJugadores.length, `${inputPlayerName} ???`);
            validacionLocalStorageJugadores.push(newPlayer);
            localStorage.setItem('usuarios', JSON.stringify(validacionLocalStorageJugadores));
        }

        location.reload();

    } else {
        alertEmptyName.classList.toggle('alertEmptyNameDisplayOff')
        setTimeout( () => {
            alertEmptyName.classList.toggle('alertEmptyNameDisplayOff')
        }, 2500)
    }   
    
}

//* Funcion del btn para cerrar addFriends
function closeAddFriends() {
    addPlayersContainer.classList.toggle('displayAddPlayerContainer');
}

function closeAlertNotPlayerLoadded () {
    alertNotPlayerLoadded.classList.toggle('alertNotPlayerLoaddedDisplayOff');
}

//* Funcion para imprimir jugadores cargados
function printPlayers() {
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
function deletePlayer(id) {
    console.log('entro funcion deletePlayer')

    let eliminated = JSON.parse(localStorage.getItem('usuarios'));
    let actualizado = eliminated.filter(e => e.id != id);
    localStorage.setItem('usuarios', JSON.stringify(actualizado));

    location.reload();
}

//* Funcion para contar los rounds
function roundNumber() {

    let newRound = localStorage.getItem('round');
    if (newRound == null) {
        round++;
        console.log(round)
        localStorage.setItem('round', round);
    } else {
        newRound++;
        console.log(newRound)
        localStorage.setItem('round', newRound);
    }
}

//* Funcion para imprimir los rounds
function showRounds() {
    let actualRounds = localStorage.getItem('round', 0);
    roundCounter.textContent = actualRounds;
}

//* Funcion para resetear los rounds del localStorage
function resetRounds() {
    localStorage.removeItem('round');
    location.reload();
    localStorage.setItem('round', 0);
}

//* Funcion para imprimir el jugador de turno
function currentPlayer() {
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
        newRound++;
        localStorage.setItem('round', newRound);
    }

}

//* Funcion para imprimir preguntas category 1
function printCat1() {
    let playersLoadded = JSON.parse(localStorage.getItem('usuarios'));
    if (playersLoadded == null || playersLoadded.length == 0) {
        alertNotPlayerLoadded.classList.toggle('alertNotPlayerLoaddedDisplayOff');
    } else {
        roundBox.classList.toggle('roundBoxDisplay');
        roundNumber()
        currentPlayer()
        console.log('entro funcion printCat1');

        let questionRandom = Math.floor(Math.random() * cat1.length);

        let p = document.createElement('p');
        p.textContent = cat1[questionRandom];

        let pCat = document.createElement('p');
        pCat.textContent = 'SOBRE VOS';

        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';

        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);
    }
}

//* Funcion para imprimir preguntas category 2
function printCat2() {
    let playersLoadded = JSON.parse(localStorage.getItem('usuarios'));
    if (playersLoadded == null || playersLoadded.length == 0) {
        alertNotPlayerLoadded.classList.toggle('alertNotPlayerLoaddedDisplayOff');
    } else {
        roundBox.classList.toggle('roundBoxDisplay');
        roundNumber()
        currentPlayer()
        console.log('entro funcion printCat2');
        let questionRandom = Math.floor(Math.random() * cat2.length);

        let p = document.createElement('p');
        p.textContent = cat2[questionRandom];

        let pCat = document.createElement('p');
        pCat.textContent = '??QUE PROFUNDO!';

        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';

        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);
    }
}

//* Funcion para imprimir preguntas category 3
function printCat3() {
    let playersLoadded = JSON.parse(localStorage.getItem('usuarios'));
    if (playersLoadded == null || playersLoadded.length == 0) {
        alertNotPlayerLoadded.classList.toggle('alertNotPlayerLoaddedDisplayOff');
    } else {
        roundBox.classList.toggle('roundBoxDisplay');
        roundNumber();
        currentPlayer()
        console.log('entro funcion printCat3');
        let questionRandom = Math.floor(Math.random() * cat3.length);

        let p = document.createElement('p');
        p.textContent = cat3[questionRandom];

        let pCat = document.createElement('p');
        pCat.textContent = 'RELAJEMOS';

        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';

        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);
    }
}

//* Funcion para imprimir preguntas category 4
function printCat4() {
    let playersLoadded = JSON.parse(localStorage.getItem('usuarios'));
    if (playersLoadded == null || playersLoadded.length == 0) {
        alertNotPlayerLoadded.classList.toggle('alertNotPlayerLoaddedDisplayOff');
    } else {
        roundBox.classList.toggle('roundBoxDisplay');
        roundNumber();
        currentPlayer()
        console.log('entro funcion printCat4');
        let questionRandom = Math.floor(Math.random() * cat4.length);

        let p = document.createElement('p');
        p.textContent = cat4[questionRandom];

        let pCat = document.createElement('p');
        pCat.textContent = 'VISI??N';

        let nextQuestion = document.createElement('button');
        nextQuestion.setAttribute('class', 'nextQuestion');
        nextQuestion.setAttribute('type', 'submit');
        nextQuestion.setAttribute('onClick', 'reloadPage()');
        nextQuestion.textContent = 'Siguiente pregunta';

        categorySelect.appendChild(pCat);
        questionBox.appendChild(p);
        questionBox.appendChild(nextQuestion);
    }
}

//* Funcion para recargar pagina y dejar el campo de pregunta vacio para que el usuario pueda elegir nuevamente una categoria
function reloadPage() {
    location.reload();
}

//! =====EVENTOS=====
btnAddFriends.addEventListener('click', addPlayer);
btnClose.addEventListener('click', closeAddFriends);
btnCloseRoundBox.addEventListener('click', () => { roundBox.classList.toggle('roundBoxDisplay'); reloadPage() });
btnNotPlayerLoaddedClose.addEventListener('click', closeAlertNotPlayerLoadded);
btnLoadPlayer.addEventListener('click', loadPlayer);
reloadRounds.addEventListener('click', resetRounds);
category1.addEventListener('click', printCat1);
category2.addEventListener('click', printCat2);
category3.addEventListener('click', printCat3);
category4.addEventListener('click', printCat4);
alertNextQuestion.addEventListener('click', roundNumber);


