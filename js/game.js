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
const cat1 = ['Cuál es tu mayor temor?',
    'Sentiste envidia alguna vez?',
    'Crees qué haces lo necesario para alcanzar tus metas?',
    'Qué tipo de tareas soles procastinar?',
    'Te consideras una persona paciente?',
    'Qué te genera mal humor?',
    'Qué haces cuando estas enojado?',
    'Te consideras una persona ansiosa?',
    'Qué manías reconoces de vos mismo?',
    'Cuál es tu mayor temor?',
    'Cuál es el mayor logro de tu vida?',
    'Qué caracteristica personal consideras que te diferencia del resto?',
    'Qué es aquello que aún no has hecho, y tienes muchas ganas de hacer? Hay algo que te detenga?',
    'Si pudieses elegir una opcion, volverías 10 años atrás en tu vida o serías extremadamente famoso?',
    'Qué género musical te identifica?',
    'Con qué cosas consideras que sos muy pesado o plomo?',
    'Las fantasías sexuales, aportan a la pareja o pueden destruirla?',
    'Amistad con ex parejas, si o no?',
    'Cuál fue la experiencia en tu vida que más te marco?',
    'Cuáles son tus tácticas de levante?',
    'Tenes alguna película que te haya marcado de alguna manera?',
    'Cuál fue tu situación más vergonzosa que viviste?',
    'Has dicho mentiras piadosas?, conta la/s que te acuerdes',
    'Qué serías capaz de hacer por amor?',
    'Cuáles son tus anclas emocionales?',
    'Cambiarías algo de tu personalidad?',
    'Qué cosas o situaciones te dan mucha vergüenza ajena?',
    'Hay algo que te gusta y no lo dices o haces por vergüenza?',
    'En una cita, qué cosas o actitudes pueden hacer que se termine antes del postre?'
]
const cat2 = ['Cómo te preparas para encarar una situación que te da miedo?',
    'Cuál es tu mayor motivación?',
    'Crees que tenés alguna actitud autodestructiva?',
    'Qué haces cuando sentís que, por alguna razón, debes dejar de ver a alguien?',
    'Existe el amor a primera vista?',
    'Qué lugar ocupa el trabajo en tu vida?',
    'Quién define la moda para vos?',
    'Se puede ser feliz todo el tiempo?',
    'Tienes miedo a morir? Qué posición tienes respecto a la muerte?',
    'En qué medida es importante nuestro pasado?',
    'Qué edad tendrías si no supieses que edad tienes?',
    'Qué preferirías, perder tus memorias o no poder generar nuevos recuerdos?',
    'Qué harías de forma diferente si supieses que nadie te va a juzgar?',
    'Si alguien cercano te dice que quiere o le da intriga el consumo de drogas, qué harías?',
    'Después de cuantas "idas y vueltas" la relación se debería terminar?',
    'Perdonarías una infidelidad?',
    'Qué harías si alguien cercano te cuenta que comenzará a vender contenido porno?',
    'Qué situaciones te generan felicidad?',
    'La felicidad para vos, es una estado de ánimo o un momento específico?',
    'Cuál es tu sostén en situaciones difíciles?',
    'Sos todo lo que soñaste?',
    'Hasta que punto te sos fiel a vos mismo/a VS lo que impone la sociedad?',
    'Crees que las redes sociales pueden romper un vínculo? por qué?',
    'Qué consejo le darías a tu "yo" de 14 años?'
];
const cat3 = ['Cuál es tu movivación para levantarte todas las mañanas?',
    'Qué actividad o carrera te hubiese gustado seguir?',
    'Dulce o salado?',
    'Que te hace perder el control?',
    'Recordas una situación en la que hayas vendido "humo"? Si te animas, contala.',
    'Cuál es el plato que mejor crees que te sale?',
    'Sos de las personas que piensan que la música de su época es mejor que la actual?',
    'Sos fiel seguidor/a de la moda?',
    'Sos capaz de reconocer manías de los jugadores que están con vos?',
    'Hay algo que te gustaría hacer pero no te atreves?',
    'Quién es la primera persona a la que le pedirías un consejo respecto a un asunto de vida o muerte?',
    'Si pudieras darle a un niño solo un consejo, cuál le darias?',
    'Quebrantarías la Ley para salvar a alguien a quien quieres?',
    'Eres el tipo de amigo que quieres tener como amigo?',
    'Tu mayor temor, Se ha hecho alguna vez realidad?',
    'Si supieses que todas las personas a quien conoces van a desaparecer mañana ¿A quién irías a ver hoy?',
    'A quién/es consideras referente/s?',
    'Qué es lo peor que alguien te puede hacer?',
    'Hay algún rasgo físico muy puntual que te guste de las personas?',
    'Hiciste o te han hecho pasar una situación muy vergonzosa en público?',
    'Pedir "tiempo" en una relación, funciona?',
    'Cuáles fueron las mejores vacaciones que tuviste?, por qué?',
    'Si tuvieses sólo 24 hs. para hacer y/o tener lo que sea que desees, qué harías?',
    'Qué tan importante es lo físico para vos?',
    'Después de un encuentro casual, desayuno sí o no?',
    'Qué cosas o situaciones te la bajan?',
    'Qué cosas o situaciones te dan cringe?',
    'Cómo influyen las redes sociales en tu vida?'
];
const cat4 = ['Existe la envidia sana?',
    'Sos genuino/a todo el tiempo? Se puede?',
    'Sos capaz de reconocer en vos cuando estas enojado y es mejor no actuar?',
    'Te sentiste fuera de lugar alguna vez? recordas el por qué?',
    '"Dinero" por sobre cualquier cosa?',
    'Existe un destino ya escrito o lo creamos nosotros con nuestros actos?',
    'Vivirías eternamente si pudieras?',
    'Qué es peor? Fallar o no haberlo intentado nunca?',
    'Te cuesta confiar en otras personas?, por qué?',
    'El mundo será un lugar mejor, sí o no?',
    'E.S.I. en la escuela primaria. Si o no?',
    'Es necesario actualizar la educación tal cuál la conocemos hoy en día?',
    'Qué pensas del consumo recreativo de drogas?',
    'Qué pensas de incluir educación sobre drogas en la escuela secundaria?',
    'Volverías al pasado para cambiar algo?',
    'Qué pensas sobre las APPs de citas?, modificaron la forma de conocer gente para bien o para mal?',
    'Crees que la pandemia tuvo algún efecto positivo en las personas o en el mundo?',
    'Qué pensas del "fanatismo"?. Es algo positivo o un sinónimo de ceguera?',
    'Las redes sociales, terminan acercando o alejando a las personas?',
    'Sos capaz de reconocer en vos alguna actitud "avara"?',
    'Te sentiste discriminado alguna vez?',
    'La juventud esta perdida??',
    'Qué hay de cierto en que las nuevas generaciones no Leen? Lo crees así?'
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
        pCat.textContent = '¡QUE PROFUNDO!';

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
        pCat.textContent = 'VISIÓN';

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
btnNotPlayerLoaddedClose.addEventListener('click', closeAlertNotPlayerLoadded);
btnLoadPlayer.addEventListener('click', loadPlayer);
reloadRounds.addEventListener('click', resetRounds);
category1.addEventListener('click', printCat1);
category2.addEventListener('click', printCat2);
category3.addEventListener('click', printCat3);
category4.addEventListener('click', printCat4);
alertNextQuestion.addEventListener('click', roundNumber);


