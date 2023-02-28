"use strict";
window.addEventListener("load", ready);

// globale variabler
let points = 0;
let lives = 0;

function ready() {
    console.log("JavaScript ready!");
    document.querySelector("#btn_start").addEventListener("click", startGame);
}

function startGame() {
    // nulstil point og liv
    points = 0;
    lives = 3;

    // skjul startskærm
    document.querySelector("#start").classList.add("hidden");

    // Start baggrundsmusik
    document.querySelector("#sound_dreams").play();
    // start alle animationer
    startAllAnimations();

    // Registrer click
    document.querySelector("#coin1_container").addEventListener("click", clickCoin);
    document.querySelector("#coin2_container").addEventListener("click", clickCoin);
    document.querySelector("#coin3_container").addEventListener("click", clickCoin);
    document.querySelector("#bomb_container").addEventListener("click", clickBomb);
    document.querySelector("#heart_container").addEventListener("click", clickHeart);

    // Registrer når bunden rammes
    document.querySelector("#coin1_container").addEventListener("animationiteration", coinRestart);
    document.querySelector("#coin2_container").addEventListener("animationiteration", coinRestart);
    document.querySelector("#coin3_container").addEventListener("animationiteration", coinRestart);
}

function startAllAnimations() {
    // Start falling animationer
    document.querySelector("#coin1_container").classList.add("falling");
    document.querySelector("#coin2_container").classList.add("falling");
    document.querySelector("#coin3_container").classList.add("falling");
    document.querySelector("#bomb_container").classList.add("falling");
    document.querySelector("#heart_container").classList.add("falling");

    // Sæt position klasser
    document.querySelector("#coin1_container").classList.add("position1");
    document.querySelector("#coin2_container").classList.add("position2");
    document.querySelector("#coin3_container").classList.add("position3");
    document.querySelector("#bomb_container").classList.add("position4");
    document.querySelector("#heart_container").classList.add("position5");
}

function clickCoin() {
    console.log("Click coin");
    // Brug en coin variabel i stedet for gentagne querySelectors
    const coin = this; // document.querySelector("#coin1_container");

    // Forhindr gentagne clicks
    coin.removeEventListener("click", clickCoin);

    // Stop coin container
    coin.classList.add("paused");

    // sæt forsvind-animation på sprite
    coin.querySelector("img").classList.add("zoom_out");

    // når forsvind-animation er færdig: coinGone
    coin.addEventListener("animationend", coinGone);

    // Genstart mønt-lyd
    document.querySelector("#sound_coin").currentTime = 0;
    // Afspil mønt-lyd
    document.querySelector("#sound_coin").play();

    // Giv point
    incrementPoints();
}

function coinGone() {
    console.log("coin gone");
    // Brug en coin variabel i stedet for gentagne querySelectors
    const coin = this; //document.querySelector("#coin1_container");
    // fjern event der bringer os herind
    coin.removeEventListener("animationend", coinGone);

    // fjern forsvind-animation på sprite
    coin.querySelector("img").classList.remove("zoom_out");

    // fjern pause
    coin.classList.remove("paused");

    coinRestart.call(this);

    // gør det muligt at klikke på coin igen
    coin.addEventListener("click", clickCoin);
}

function coinRestart() {
    console.log("coin restart");
    const coin = this;

    // genstart falling animation
    coin.classList.remove("falling");
    coin.offsetWidth;
    coin.classList.add("falling");

    // fjern alle positioner
    coin.classList.remove("position1", "position2", "position3", "position4", "position5");

    // sæt position til en ny klasse
    const p = Math.ceil(Math.random() * 5);
    coin.classList.add(`position${p}`);
}

function clickBomb() {
    console.log("Click bomb");
    // Forhindr gentagne clicks
    document.querySelector("#bomb_container").removeEventListener("click", clickBomb);

    // Stop coin container
    document.querySelector("#bomb_container").classList.add("paused");

    // sæt forsvind-animation på coin
    document.querySelector("#bomb_sprite").classList.add("zoom_in");

    // når forsvind-animation er færdig: coinGone
    document.querySelector("#bomb_container").addEventListener("animationend", bombGone);

    // Genstart bombe-lyd
    document.querySelector("#sound_bomb").currentTime = 0;
    // Afspil bombe-lyd
    document.querySelector("#sound_bomb").play();

    decrementLives();
}

function bombGone() {
    // fjern event der bringer os herind
    document.querySelector("#bomb_container").removeEventListener("animationend", bombGone);

    // fjern forsvind-animation
    document.querySelector("#bomb_sprite").classList.remove("zoom_in");

    // fjern pause
    document.querySelector("#bomb_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#bomb_container").classList.remove("falling");
    document.querySelector("#bomb_container").offsetWidth;
    document.querySelector("#bomb_container").classList.add("falling");

    // gør det muligt at klikke på bomb igen
    document.querySelector("#bomb_container").addEventListener("click", clickBomb);
}

function clickHeart() {
    console.log("Click heart");
    // Forhindr gentagne clicks
    document.querySelector("#heart_container").removeEventListener("click", clickHeart);

    // Stop heart container
    document.querySelector("#heart_container").classList.add("paused");

    // sæt forsvind-animation på heart
    document.querySelector("#heart_sprite").classList.add("zoom_out");

    // når forsvind-animation er færdig: heatGone
    document.querySelector("#heart_container").addEventListener("animationend", heartGone);

    // Genstart success-lyd
    document.querySelector("#sound_success").currentTime = 0;
    // Afspil success-lyd
    document.querySelector("#sound_success").play();

    if (lives < 3) {
        incrementLives();
    }
}

function heartGone() {
    // fjern event der bringer os herind
    document.querySelector("#heart_container").removeEventListener("animationend", heartGone);

    // fjern forsvind-animation
    document.querySelector("#heart_sprite").classList.remove("zoom_out");

    // fjern pause
    document.querySelector("#heart_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#heart_container").classList.remove("falling");
    document.querySelector("#heart_container").offsetWidth;
    document.querySelector("#heart_container").classList.add("falling");

    // gør det muligt at klikke på heart igen
    document.querySelector("#heart_container").addEventListener("click", clickHeart);
}

function incrementPoints() {
    console.log("Giv point");
    points++;
    console.log("har nu " + points + " point");
    displayPoints();

    if (points >= 10) {
        levelComplete();
    }
}

function displayPoints() {
    console.log("vis point");
    document.querySelector("#coin_count").textContent = points;
}

function decrementLives() {
    console.log("mist et liv");

    if (lives <= 1) {
        gameOver();
    }

    showDecrementedLives();
    lives--;
}

function incrementLives() {
    console.log("få et liv");
    lives++;
    showIncrementedLives();
}

function showDecrementedLives() {
    document.querySelector("#heart" + lives).classList.remove("active_heart");
    document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
    document.querySelector("#heart" + lives).classList.remove("broken_heart");
    document.querySelector("#heart" + lives).classList.add("active_heart");
}

function gameOver() {
    console.log("Game Over");
    document.querySelector("#game_over").classList.remove("hidden");
    stopGame();
    document.querySelector("#sound_game_over").play();
}

function levelComplete() {
    console.log("Level Complete");
    document.querySelector("#level_complete").classList.remove("hidden");
    stopGame();
    // Afspil tada-lyd
    document.querySelector("#sound_tada").play();
}

function stopGame() {
    // Stop animationer
    document.querySelector("#coin1_container").classList.remove("falling");
    document.querySelector("#coin2_container").classList.remove("falling");
    document.querySelector("#coin3_container").classList.remove("falling");
    document.querySelector("#bomb_container").classList.remove("falling");
    document.querySelector("#heart_container").classList.remove("falling");

    // Fjern click
    document.querySelector("#coin1_container").removeEventListener("click", clickCoin);
    document.querySelector("#coin2_container").removeEventListener("click", clickCoin);
    document.querySelector("#coin3_container").removeEventListener("click", clickCoin);
    document.querySelector("#bomb_container").removeEventListener("click", clickBomb);
    document.querySelector("#heart_container").removeEventListener("click", clickHeart);

    // Stop og nulstil lyde, fx baggrundsmusik
    document.querySelector("#sound_dreams").pause();
    document.querySelector("#sound_dreams").currentTime = 0;
}
