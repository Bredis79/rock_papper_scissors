const hrac = document.querySelector(".hrac");
const pocitac = document.querySelector(".pocitac");
const hracKamen = document.querySelector(".hrac .kamen");
const hracNuzky = document.querySelector(".hrac .nuzky");
const hracPapir = document.querySelector(".hrac .papir");
const help = document.querySelector("#help");
const helpInfo = document.querySelector(".help_info");
const okBtn = document.querySelector(".ok_btn");

const pocitacKamen = document.querySelector(".pocitac .kamen");
const pocitacNuzky = document.querySelector(".pocitac .nuzky");
const pocitacPapir = document.querySelector(".pocitac .papir");

const hracResult = document.querySelector(".hrac .score");
const pocitacResult = document.querySelector(".pocitac .score");
const remiza = document.querySelector(".hraciPlocha .remiza");

// Ulozeni score
let scoreHrac = 0;
let scorePocitac = 0;
let scoreRemiza = 0;
let isLosovaniActive = false; // kontrola, zda probiha losovani pocitace

// show help
help.addEventListener("mouseover", (e) => {
    helpInfo.style.display = "block";
});

// close help
okBtn.addEventListener("click", (e) => {
    helpInfo.style.display = "none";
});

function losovani() {
    // Nahodny vyber pocitace
    let pocitacVolba = Math.ceil(Math.random() * 3);

    if (pocitacVolba == 1) {
        pocitacKamen.style.display = "flex";
        pocitacNuzky.style.display = "none";
        pocitacPapir.style.display = "none";
    } else if (pocitacVolba == 2) {
        pocitacNuzky.style.display = "flex";
        pocitacKamen.style.display = "none";
        pocitacPapir.style.display = "none";
    } else if (pocitacVolba == 3) {
        pocitacPapir.style.display = "flex";
        pocitacNuzky.style.display = "none";
        pocitacKamen.style.display = "none";
    }
}

// vypis do tabulky
hracResult.innerText = 0;
pocitacResult.innerText = 0;
remiza.innerText = 0;

// Funkce pro kontrolu výhry
function kontrolaVyhry() {
    if (hracKamen.style.display == "flex" && pocitacNuzky.style.display == "flex") {
        scoreHrac++;
    } else if (hracNuzky.style.display == "flex" && pocitacPapir.style.display == "flex") {
        scoreHrac++;
    } else if (hracPapir.style.display == "flex" && pocitacKamen.style.display == "flex") {
        scoreHrac++;
    } else if (pocitacKamen.style.display == "flex" && hracNuzky.style.display == "flex") {
        scorePocitac++;
    } else if (pocitacNuzky.style.display == "flex" && hracPapir.style.display == "flex") {
        scorePocitac++;
    } else if (pocitacPapir.style.display == "flex" && hracKamen.style.display == "flex") {
        scorePocitac++;
    } else if (pocitacKamen.style.display == "flex" && hracKamen.style.display == "flex") {
        scoreRemiza++;
    } else if (pocitacNuzky.style.display == "flex" && hracNuzky.style.display == "flex") {
        scoreRemiza++;
    } else if (pocitacPapir.style.display == "flex" && hracPapir.style.display == "flex") {
        scoreRemiza++;
    }

    hracResult.innerText = scoreHrac;
    pocitacResult.innerText = scorePocitac;
    remiza.innerText = scoreRemiza;

    // porovnani hodnot a nastaveni barvy textu
    if (scoreHrac > scorePocitac) {
        hracResult.style.color = "green";
        pocitacResult.style.color = "red";
    } else if (scoreHrac < scorePocitac) {
        hracResult.style.color = "red";
        pocitacResult.style.color = "green";
    } else {
        hracResult.style.color = "black";
        pocitacResult.style.color = "black";
    }
}

let interval = null;

document.addEventListener("keydown", (e) => {
    if (e.key == "s" || e.key == "S") {
        clearInterval(interval); // Nejprve zastavit stávající interval
        interval = setInterval(losovani, 50); // Znovu spustit a aktualizovat proměnnou
        hracKamen.style.display = "none";
        hracNuzky.style.display = "none";
        hracPapir.style.display = "none";
        isLosovaniActive = true; // Nastavení proměnné na true
    }

    if (isLosovaniActive) {
        if (e.key == "1") {
            hracKamen.style.display = "flex";
            hracNuzky.style.display = "none";
            hracPapir.style.display = "none";
            clearInterval(interval);
            isLosovaniActive = false; // Nastavení proměnné na false
            kontrolaVyhry();
        } else if (e.key == "2") {
            hracPapir.style.display = "flex";
            hracNuzky.style.display = "none";
            hracKamen.style.display = "none";
            clearInterval(interval);
            isLosovaniActive = false; // Nastavení proměnné na false
            kontrolaVyhry();
        } else if (e.key == "3") {
            hracNuzky.style.display = "flex";
            hracKamen.style.display = "none";
            hracPapir.style.display = "none";
            clearInterval(interval);
            isLosovaniActive = false; // Nastavení proměnné na false
            kontrolaVyhry();
        }
    }
});
