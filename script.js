"use strict";
window.addEventListener("load", start);

let points = 0;
let lives = 0;

function start() {
    console.log("JavaScript kører!");

    // nulstil point og liv
    points = 0;
    lives = 3;

    // Start animationer
    document.querySelector("#coin1_container").classList.add("falling");
    document.querySelector("#coin2_container").classList.add("falling");
    document.querySelector("#coin3_container").classList.add("falling");
    document.querySelector("#bomb_container").classList.add("falling");
    document.querySelector("#heart_container").classList.add("falling");

    // Registrer click
    document
        .querySelector("#coin1_container")
        .addEventListener("click", clickCoin);
    document
        .querySelector("#coin2_container")
        .addEventListener("click", clickCoin2);
    document
        .querySelector("#coin3_container")
        .addEventListener("click", clickCoin3);
    document
        .querySelector("#bomb_container")
        .addEventListener("click", clickBomb);
    document
        .querySelector("#heart_container")
        .addEventListener("click", clickHeart);
}

function clickCoin() {
    console.log("Click coin");
    // Forhindr gentagne clicks
    document
        .querySelector("#coin1_container")
        .removeEventListener("click", clickCoin);

    // Stop coin container
    document.querySelector("#coin1_container").classList.add("paused");

    // sæt forsvind-animation på coin
    document.querySelector("#coin1_sprite").classList.add("zoom_out");

    // når forsvind-animation er færdig: coinGone
    document
        .querySelector("#coin1_container")
        .addEventListener("animationend", coinGone);

    // Giv point
    incrementPoints();
}

function clickCoin2() {
    console.log("Click coin2");
    // Forhindr gentagne clicks
    document
        .querySelector("#coin2_container")
        .removeEventListener("click", clickCoin2);

    // Stop coin container
    document.querySelector("#coin2_container").classList.add("paused");

    // sæt forsvind-animation på coin
    document.querySelector("#coin2_sprite").classList.add("zoom_out");

    // når forsvind-animation er færdig: coinGone
    document
        .querySelector("#coin2_container")
        .addEventListener("animationend", coin2Gone);

    // Giv point
    incrementPoints();
}

function clickCoin3() {
    console.log("Click coin3");
    // Forhindr gentagne clicks
    document
        .querySelector("#coin3_container")
        .removeEventListener("click", clickCoin3);

    // Stop coin container
    document.querySelector("#coin3_container").classList.add("paused");

    // sæt forsvind-animation på coin
    document.querySelector("#coin3_sprite").classList.add("zoom_out");

    // når forsvind-animation er færdig: coinGone
    document
        .querySelector("#coin3_container")
        .addEventListener("animationend", coin3Gone);

    // Giv point
    incrementPoints();
}

function coinGone() {
    // fjern event der bringer os herind
    document
        .querySelector("#coin1_container")
        .removeEventListener("animationend", coinGone);

    // fjern forsvind-animation
    document.querySelector("#coin1_sprite").classList.remove("zoom_out");

    // fjern pause
    document.querySelector("#coin1_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#coin1_container").classList.remove("falling");
    document.querySelector("#coin1_container").offsetWidth;
    document.querySelector("#coin1_container").classList.add("falling");

    // gør det muligt at klikke på coin igen
    document
        .querySelector("#coin1_container")
        .addEventListener("click", clickCoin);
}

function coin2Gone() {
    // fjern event der bringer os herind
    document
        .querySelector("#coin2_container")
        .removeEventListener("animationend", coin2Gone);

    // fjern forsvind-animation
    document.querySelector("#coin2_sprite").classList.remove("zoom_out");

    // fjern pause
    document.querySelector("#coin2_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#coin2_container").classList.remove("falling");
    document.querySelector("#coin2_container").offsetWidth;
    document.querySelector("#coin2_container").classList.add("falling");

    // gør det muligt at klikke på coin igen
    document
        .querySelector("#coin2_container")
        .addEventListener("click", clickCoin2);
}

function coin3Gone() {
    // fjern event der bringer os herind
    document
        .querySelector("#coin3_container")
        .removeEventListener("animationend", coin3Gone);

    // fjern forsvind-animation
    document.querySelector("#coin3_sprite").classList.remove("zoom_out");

    // fjern pause
    document.querySelector("#coin3_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#coin3_container").classList.remove("falling");
    document.querySelector("#coin3_container").offsetWidth;
    document.querySelector("#coin3_container").classList.add("falling");

    // gør det muligt at klikke på coin igen
    document
        .querySelector("#coin3_container")
        .addEventListener("click", clickCoin3);
}

function clickBomb() {
    console.log("Click bomb");
    // Forhindr gentagne clicks
    document
        .querySelector("#bomb_container")
        .removeEventListener("click", clickBomb);

    // Stop coin container
    document.querySelector("#bomb_container").classList.add("paused");

    // sæt forsvind-animation på coin
    document.querySelector("#bomb_sprite").classList.add("zoom_in");

    // når forsvind-animation er færdig: coinGone
    document
        .querySelector("#bomb_container")
        .addEventListener("animationend", bombGone);

    decrementLives();
}

function bombGone() {
    // fjern event der bringer os herind
    document
        .querySelector("#bomb_container")
        .removeEventListener("animationend", bombGone);

    // fjern forsvind-animation
    document.querySelector("#bomb_sprite").classList.remove("zoom_in");

    // fjern pause
    document.querySelector("#bomb_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#bomb_container").classList.remove("falling");
    document.querySelector("#bomb_container").offsetWidth;
    document.querySelector("#bomb_container").classList.add("falling");

    // gør det muligt at klikke på bomb igen
    document
        .querySelector("#bomb_container")
        .addEventListener("click", clickBomb);
}

function clickHeart() {
    console.log("Click heart");
    // Forhindr gentagne clicks
    document
        .querySelector("#heart_container")
        .removeEventListener("click", clickHeart);

    // Stop heart container
    document.querySelector("#heart_container").classList.add("paused");

    // sæt forsvind-animation på heart
    document.querySelector("#heart_sprite").classList.add("zoom_out");

    // når forsvind-animation er færdig: heatGone
    document
        .querySelector("#heart_container")
        .addEventListener("animationend", heartGone);

    incrementLives();
}

function heartGone() {
    // fjern event der bringer os herind
    document
        .querySelector("#heart_container")
        .removeEventListener("animationend", heartGone);

    // fjern forsvind-animation
    document.querySelector("#heart_sprite").classList.remove("zoom_out");

    // fjern pause
    document.querySelector("#heart_container").classList.remove("paused");

    // genstart falling animation
    document.querySelector("#heart_container").classList.remove("falling");
    document.querySelector("#heart_container").offsetWidth;
    document.querySelector("#heart_container").classList.add("falling");

    // gør det muligt at klikke på heart igen
    document
        .querySelector("#heart_container")
        .addEventListener("click", clickHeart);
}

function incrementPoints() {
    console.log("Giv point");
    points++;
    console.log("har nu " + points + " point");
    displayPoints();
}

function displayPoints() {
    console.log("vis point");
    document.querySelector("#coin_count").textContent = points;
}

function decrementLives() {
    console.log("mist et liv");
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
