import { countTimer } from "../dist/timer.js";
const character = document.querySelector('.character');
const obstacle = document.querySelector('.obstacle');
const button = document.querySelector('button');
const score = document.getElementById('top');
const timerEl = document.getElementById('score');
const reportWindowSize = () => {
    let windowWidth = window.innerWidth;
    let gameContainer = document.getElementById('game');
    if (windowWidth >= 600) {
        gameContainer.style.width = '600px';
    }
    else {
        gameContainer.style.width = windowWidth + 'px';
    }
};
window.addEventListener('resize', reportWindowSize);
let gameStarted;
document.addEventListener('keydown', function () {
    gameStarted && jump();
});
document.addEventListener('touchstart', function () {
    gameStarted && jump();
});
button.addEventListener('click', function () {
    gameStarted = true;
    startGame();
});
const randomobstacle = () => {
    let startTheobstacle = Math.random() + 1;
    obstacle.style.animation = `obstacleMove ${startTheobstacle}s infinite linear`;
    console.log(startTheobstacle);
};
function startGame() {
    countTimer.timer("reset");
    countTimer.timer("start");
    button.style.display = 'none';
    character.classList.add('characterGo');
    character.style.animationPlayState = "running";
    obstacle.style.animation = 'none';
    obstacle.offsetWidth;
    randomobstacle();
    score.innerHTML = localStorage.getItem("score");
}
function jump() {
    if (!character.classList.contains('jump')) {
        character.classList.add('jump');
    }
    setTimeout(function () {
        character.classList.remove('jump');
    }, 500);
}
const ischaracterAlive = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft < 60 && obstacleLeft > 0 && characterTop >= 140) {
        countTimer.timer("stop");
        gameStarted = false;
        const currentScore = timerEl.innerHTML;
        if (parseInt(localStorage.getItem("score")) <= parseInt(currentScore) || !localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore);
            score.innerHTML = localStorage.getItem("score");
        }
        obstacle.style.animationPlayState = "paused";
        character.style.animationPlayState = "paused";
        button.style.display = '';
    }
    if (obstacleLeft < -40) {
        obstacle.style.animation = 'none';
        obstacle.offsetWidth;
        randomobstacle();
    }
}, 10);
