const divTag = 'div',
    headerTag = 'header',
    spanTag = 'span',
    buttonTag = 'button',
    timeTag = 'time',
    selectTag = 'select',
    optionTag = 'option';

const startTime = "00:00",
    startMovesCounter = 0;

let chipsCount = 16;

export class HtmlConstructor {
    movesCounterHTML;
    movesCounter;

    createHeader() {
        let header = document.createElement(headerTag);
        header.className = "header";
    
        let info = document.createElement(divTag);
        info.className = "info";
    
        let info__description = document.createElement(spanTag);
        info__description.className = "info__description";
        info__description.innerText = "Time ";
    
        let info__timer = document.createElement(timeTag);
        info__timer.className = "info__timer";
        info__timer.innerText = startTime;
    
        info.appendChild(info__description);
        info.appendChild(info__timer);
    
        let moves = document.createElement(divTag);
        moves.className = "moves";
    
        let moves__description = document.createElement(spanTag);
        moves__description.className = "moves__description";
        moves__description.innerText = "Moves ";
    
        let moves__counter = document.createElement(spanTag);
        moves__counter.className = "moves__counter";
        moves__counter.innerText = startMovesCounter;
        this.movesCounterHTML = moves__counter;
        this.movesCounter = moves__counter.innerText;
    
        moves.appendChild(moves__description);
        moves.appendChild(moves__counter);
    
        let pauseButton = document.createElement(buttonTag);
        pauseButton.className = "pause";
        pauseButton.textContent = "Pause game";
        pauseButton.style.color = "#8ed790";
    
        header.appendChild(info);
        header.appendChild(moves);
        header.appendChild(pauseButton);
    
        document.body.insertBefore(header, document.body.childNodes[0]);
    }

    createStartChips(chipsNumbers, gameArea, rowsCount) {
        chipsCount = Math.pow(rowsCount, 2);
        
        for (let i = 0; i < chipsCount - 1; i++) {
            let chip = document.createElement(divTag);
            chip.className = "chip";
            chip.textContent = i + 1;
    
            chipsNumbers.push(i + 1);
            gameArea.area.appendChild(chip);
        }
        let emptyChip = document.createElement(divTag);
        emptyChip.className = "empty";
        
        chipsNumbers.push(0);
        gameArea.area.appendChild(emptyChip);
        return chipsNumbers;
    }

    createRandomChips(chipsNumbers, gameArea, rowsCount) {
        chipsCount = Math.pow(rowsCount, 2);
        
        for (let i = 0; i < chipsCount; i++) {
            let chip = document.createElement(divTag);
            if (chipsNumbers[i] !== 0) {
                chip.className = "chip";
                chip.textContent = chipsNumbers[i];
            } else {
                chip.className = "empty";
            }

            gameArea.area.appendChild(chip);
        }
    }

    createOverlay() {
        let overlayContainer = document.createElement(spanTag);
        overlayContainer.className = "overlay";
        return overlayContainer;
    }

    createSizesSelection() {
        const sizedAmount = 6;
        let gameAreaSizeSelection = document.createElement(selectTag);
        gameAreaSizeSelection.className = "selectBox";
        gameAreaSizeSelection.style.background = "#8ed790";

        for (let i = 0; i < sizedAmount; i++) {
            let size = document.createElement(optionTag);
            size.className = "select-option";
            size.textContent = `${i+3}x${i+3}`;
            gameAreaSizeSelection.appendChild(size);
        }
        return gameAreaSizeSelection;
    }

    createSoundButton() {
        let soundButton = document.createElement(divTag);
        soundButton.className = "overlayButton";
        return soundButton;
    }

    createNewGameButton() {
        let newGameButton = document.createElement(buttonTag);
        newGameButton.className = "overlayButton";
        newGameButton.textContent = "New Game";
        return newGameButton;
    }

    createResumeGameButton(pauseButton) {
        let resumeGameButton = document.createElement(buttonTag);
        resumeGameButton.className = "overlayButton";
        resumeGameButton.textContent = "Resume Game";
        pauseButton.style.color = "#8ed790";

        return resumeGameButton;
    }

    createWinOutput(overlayContainer, resultTime, resultMoves) {
        let winTextElement = document.createElement(divTag);
        winTextElement.className = "winText";
        winTextElement.textContent = `Ура! Вы решили головоломку за ${resultTime} и ${resultMoves} ходов`;
        overlayContainer.appendChild(winTextElement);
        overlayContainer.insertBefore(winTextElement, overlayContainer.childNodes[0]);
    }

    setPauseGameButtonColor() {
        let pauseButton = document.querySelector(".pause");
        pauseButton.style.color = "#000000";
    }

    setupMovesCounter() {
        this.movesCounter = startMovesCounter;
        this.movesCounterHTML.innerText = this.movesCounter;
    }

    updateMovesCounter() {
        this.movesCounter++;
        this.movesCounterHTML.innerText = this.movesCounter;
    }

    createClickedChipCopy(clickedChip, chipNumber) {
        let chipCoordinates = clickedChip.getBoundingClientRect();
    
        let chipWidth = chipCoordinates.width;
        let chipHeight = chipWidth;
    
        let clickedChipCopy = document.createElement(divTag);
        clickedChipCopy.style.position = 'absolute';
        clickedChipCopy.style.width = chipWidth + "px";
        clickedChipCopy.style.height = chipHeight + "px";
        clickedChipCopy.style.left = chipCoordinates.left + "px";
        clickedChipCopy.style.top = chipCoordinates.top + "px";
        clickedChipCopy.className = "chip";
        clickedChipCopy.textContent = chipNumber;
    
        return clickedChipCopy;
    }

    moveChip(clickedChipCopy, startPoint, finalPoint) {
        const step = 10;
        let currentX = clickedChipCopy.style.left;
        let currentY = clickedChipCopy.style.top;
        let chipPositionX = 0;
        let chipPositionY = 0;
        
        currentX = parseInt(currentX.slice(0, -2));
        currentY = parseInt(currentY.slice(0, -2));
    
        if (startPoint.x === finalPoint.x) {
            // move chip down
            if (startPoint.y < finalPoint.y) { 
                chipPositionY = currentY + step;
                clickedChipCopy.style.top = chipPositionY + 'px';
    
                if (chipPositionY >= finalPoint.y) {
                    clickedChipCopy.style.top = finalPoint.y + 'px';   
                    return true;
                }
            }
            // move chip up 
            else { 
                chipPositionY = currentY - step; 
                clickedChipCopy.style.top = chipPositionY + 'px';
                if (chipPositionY <= finalPoint.y) {
                    clickedChipCopy.style.top = finalPoint.y + 'px';
                    return true;
                }
            }
        } else {
            // move chip to the right
            if (startPoint.x < finalPoint.x) { 
                chipPositionX = currentX + step;
                clickedChipCopy.style.left = chipPositionX + 'px';
    
                if (chipPositionX >= finalPoint.x) {
                    clickedChipCopy.style.left = finalPoint.x + 'px';
                    return true;
                }
            }
            // move chip to the left
            else { 
                chipPositionX = currentX - step;
                clickedChipCopy.style.left = chipPositionX + 'px';
    
                if (chipPositionX <= finalPoint.x) {
                    clickedChipCopy.style.left = finalPoint.x + 'px';
                    return true;
                }
            }
        }
    }
}