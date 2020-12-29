const divTag = 'div';

export class GameArea {
    constructor() {
        this.area = document.createElement(divTag);
    }

    insert() {
        document.body.insertBefore(this.area, document.querySelector(".header").nextSibling);
    }

    clearGameArea() {
        while (this.area.firstChild) {
            this.area.removeChild(this.area.firstChild);
        }
    }

    drawGameArea(rowsCount) {
        this.insert();
        this.area.className = "gameArea";
        this.changeGameAreaSize(rowsCount);
    }

    changeGameAreaSize(rowsCount) {
        this.area.style.gridTemplateColumns = `repeat(${rowsCount}, 1fr)`;
    }
}