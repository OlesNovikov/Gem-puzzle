import { Audio } from './sound.js';
import { Point } from './point.js';
import { ChipsController } from './chipsController.js';
import { GameArea } from './gameArea.js';
import { Stopwatch } from './stopwatch.js';
import { HtmlConstructor } from './htmlConstructor.js';

// Events
const DOMContentLoadedEvent = 'DOMContentLoaded',
    clickEvent = 'click';

// HTML tag elements
const timeTag = 'time';

// EventListeners
document.addEventListener(DOMContentLoadedEvent, createPage);

// HTML elements
let rowsCount = 4,
    targetArray = "";

// Global const values
const startTime = "00:00";

// Global variables
let chipsNumbers = [],
    audio = new Audio(),
    gameArea = new GameArea(),
    stopwatch = new Stopwatch(),
    htmlConstructor = new HtmlConstructor();

let overlayContainer;

// returns random int number to initialize all chips
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Start
function createPage() {
    htmlConstructor.createHeader();
    let pauseGameButton = document.querySelector(".pause");
    pauseGameButton.addEventListener(clickEvent, pauseGame);

    gameArea.drawGameArea(rowsCount);
    chipsNumbers = htmlConstructor.createStartChips(chipsNumbers, gameArea, rowsCount);
    targetArray = stringChipsNumbers();
    
    audio.setupSoundEffects();
    drawOverlayContainer();
}

function stringChipsNumbers() {
    let numbersStr = chipsNumbers.join(' ');
    return numbersStr;
}

// creates overlay that represents menu of the game
function drawOverlayContainer() {
    overlayContainer = htmlConstructor.createOverlay();

    let gameAreaSizeSelection = htmlConstructor.createSizesSelection();
    gameAreaSizeSelection.selectedIndex = rowsCount - 3;
    let selectionOptions = gameAreaSizeSelection.options;
    gameAreaSizeSelection.onchange = () => {
        rowsCount = gameAreaSizeSelection.selectedIndex + 3;
    };

    let soundButton = htmlConstructor.createSoundButton();
    soundButton.textContent = audio.isMuted();
    
    let newGameButton = htmlConstructor.createNewGameButton();
    
    newGameButton.addEventListener(clickEvent, startGame);
    soundButton.addEventListener(clickEvent, audio.soundOnOff);

    overlayContainer.appendChild(gameAreaSizeSelection);
    overlayContainer.appendChild(soundButton);
    overlayContainer.appendChild(newGameButton);
    gameArea.area.appendChild(overlayContainer);
}

// remove overlay, insert chips with random value, starts stopwatch
function startGame() {
    htmlConstructor.setPauseGameButtonColor();
    overlayContainer.remove();
    gameArea.clearGameArea();
    chipsNumbers = [];

    //console.log(gameArea.area.childNodes.length);

    chipsNumbers = htmlConstructor.createStartChips(chipsNumbers, gameArea, rowsCount);
    targetArray = stringChipsNumbers();
    gameArea.clearGameArea();
    gameArea.changeGameAreaSize(rowsCount);
    initializeRandomChips();

    stopwatch.startStopwatch();
    htmlConstructor.setupMovesCounter();
}

// pause stopwatch, shows overlay
function pauseGame(event) {
    let pauseButton = event.target;
    const stopwatchHTML = document.querySelector(timeTag);
    const overlay = document.querySelector(".overlay");

    if (stopwatchHTML.textContent !== startTime && overlay === null) {
        stopwatch.pauseStopwatch();
        drawOverlayContainer();
        let resumeGameButton = htmlConstructor.createResumeGameButton(pauseButton);
        resumeGameButton.addEventListener(clickEvent, resumeGame);
        
        overlayContainer.appendChild(resumeGameButton);
        gameArea.area.appendChild(overlayContainer);
    }
}

// stop the stopwatch, shows message, that player wins
function stopGame() {
    stopwatch.pauseStopwatch(stopwatch);
    
    let resultTime = document.querySelector(timeTag).innerText;
    let resultMoves = document.querySelector(".moves__counter").innerText;
    drawOverlayContainer();

    htmlConstructor.createWinOutput(overlayContainer, resultTime, resultMoves);
}

// remove overlay & start stopwatch
function resumeGame() {
    htmlConstructor.setPauseGameButtonColor();
    overlayContainer.remove();
    stopwatch.startStopwatch(stopwatch.pausedTimeMin, stopwatch.pausedTimeSec);
}

// inserts chips with random values to the game area
function initializeRandomChips() {
    for (let i = 0; i < 500; i++) {
        const up = rowsCount,
            down = rowsCount,
            emptyNumber = 0;

        let emptyIndex = chipsNumbers.indexOf(emptyNumber);
        let emptyRow = Math.floor(emptyIndex / rowsCount);

        let nextChipIndex = emptyIndex + 1,
            previousChipIndex = emptyIndex - 1,
            upChipIndex = emptyIndex - up,
            downChipIndex = emptyIndex + down;

        let randomInt = 0;    
        if (nextChipIndex === Math.pow(rowsCount, 2)) {
            randomInt = getRandomInt(2);
            if (randomInt === 1) {
                swapChipsInArray(emptyIndex, previousChipIndex, chipsNumbers[previousChipIndex], emptyNumber);
            } else {
                swapChipsInArray(emptyIndex, upChipIndex, chipsNumbers[upChipIndex], emptyNumber);
            }
        } else if (previousChipIndex === -1) {
            randomInt = getRandomInt(2);
            if (randomInt === 1) {
                swapChipsInArray(emptyIndex, nextChipIndex, chipsNumbers[nextChipIndex], emptyNumber);
            } else {
                swapChipsInArray(emptyIndex, downChipIndex, chipsNumbers[downChipIndex], emptyNumber);
            }
        } else {
            let directions = [0, 0, 0, 0];

            if (upChipIndex >= 0) { directions[0] = 1; }
            if (Math.floor(nextChipIndex / rowsCount) === emptyRow) { directions[1] = 1; }
            if (downChipIndex < chipsNumbers.length) { directions[2] = 1; }
            if (Math.floor(previousChipIndex / rowsCount) === emptyRow && previousChipIndex !== -1) { directions[3] = 1; }

            randomInt = getRandomInt(directions.length);
            while (directions[randomInt] === 0) {
                randomInt = getRandomInt(directions.length);
            }

            initializationSwapping(randomInt, emptyIndex, upChipIndex, nextChipIndex, downChipIndex, previousChipIndex, emptyNumber);
        }
    }

    htmlConstructor.createRandomChips(chipsNumbers, gameArea, rowsCount);
    gameArea.area.addEventListener(clickEvent, chipClick);
}

function initializationSwapping(randomInt, emptyIndex, upChipIndex, nextChipIndex, downChipIndex, previousChipIndex, emptyNumber) {
    if (randomInt === 0) {
        swapChipsInArray(emptyIndex, upChipIndex, chipsNumbers[upChipIndex], emptyNumber);
    } else if (randomInt === 1) {
        swapChipsInArray(emptyIndex, nextChipIndex, chipsNumbers[nextChipIndex], emptyNumber);
    } else if (randomInt === 2) {
        swapChipsInArray(emptyIndex, downChipIndex, chipsNumbers[downChipIndex], emptyNumber);
    } else if (randomInt === 3) { 
        swapChipsInArray(emptyIndex, previousChipIndex, chipsNumbers[previousChipIndex], emptyNumber);
    }
}

function chipClick(event) {
    audio.pause();
    let clickedChip = event.target;

    let chipCoordinates = clickedChip.getBoundingClientRect();
    let chipPosition = new Point(chipCoordinates.x, chipCoordinates.y);

    let cellWidth = chipCoordinates.width + 2;
    let cellHeight = cellWidth;

    let emptyChip = document.querySelector(".empty");
    let emptyChipCoordinates = emptyChip.getBoundingClientRect();
    let emptyChipPosition = new Point(emptyChipCoordinates.x, emptyChipCoordinates.y);

    if (ChipsController.canSwapChips(emptyChipPosition, chipPosition, cellHeight, cellWidth)) {
        swapChips(emptyChip, clickedChip);
        htmlConstructor.updateMovesCounter();
        audio.play();
    }
}

// checks if current game state equals to final game state
function isPuzzleComplete() {
    let numbersStr = chipsNumbers.join(' ');
    console.log(numbersStr);
    console.log(targetArray);
    if (numbersStr === targetArray) return true;
    return false;
}

// swap chips on the game board and in chipsNumbers array
function swapChips(emptyChip, clickedChip) {
    const emptyChipSymbol = 0;

    let chipNumber = parseInt(clickedChip.textContent);
    let emptyIndex = chipsNumbers.indexOf(emptyChipSymbol);
    let chipIndex = chipsNumbers.indexOf(chipNumber);

    swapChipsInArray(emptyIndex, chipIndex, chipNumber, emptyChipSymbol);

    clickedChip.className = "empty";
    clickedChip.textContent = '';
    
    animateSwap(clickedChip, chipNumber, emptyChip);
}

function swapChipsInArray(emptyIndex, chipIndex, chipNumber, emptyChipSymbol) {
    chipsNumbers[emptyIndex] = chipNumber;
    chipsNumbers[chipIndex] = emptyChipSymbol;
}

function animateSwap(clickedChip, chipNumber, emptyChip) {
    let chipCoordinates = clickedChip.getBoundingClientRect();
    let emptyChipCoordinates = emptyChip.getBoundingClientRect();

    let startX = chipCoordinates.left;
    let startY = chipCoordinates.top;
    let finalX = emptyChipCoordinates.left;
    let finalY = emptyChipCoordinates.top;
    let startPoint = new Point(startX, startY);
    let finalPoint = new Point(finalX, finalY);

    let clickedChipCopy = htmlConstructor.createClickedChipCopy(clickedChip, chipNumber);
    document.body.appendChild(clickedChipCopy);

    let stopMove = false;
    let myTimer = setInterval(function() {
        if (stopMove) {
            clearInterval(myTimer);
            clickedChipCopy.remove();
            emptyChip.textContent = chipNumber;
            emptyChip.className = "chip";

            if (isPuzzleComplete()) {
                stopGame();
            }
            return;
        }
      
        stopMove = htmlConstructor.moveChip(clickedChipCopy, startPoint, finalPoint);
      
      }, 10);
}