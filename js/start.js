
let btnStart = document.querySelector('#btnStart');
let loader = document.querySelector('#loader');

//* Funcion para el loader presentacion
function loaderOn() {
    console.log('entro la funcion loaderOn')
    let url = '../gameEntreNOS.html';
    window.open(url)
}

//! =====EVENTOS=====
btnStart.addEventListener('click', loaderOn);