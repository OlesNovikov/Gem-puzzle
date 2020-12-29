export class ChipsController {
    emptyChipOnTheTop(emptyChipPosition, chipPosition, cellHeight) {
        if (chipPosition.y - cellHeight === emptyChipPosition.y && chipPosition.x === emptyChipPosition.x) {
            return true;
        }
        return false;
    }

    static canSwapChips(emptyChipPosition, chipPosition, cellHeight, cellWidth) {
        if (this.emptyChipOnTheTop(emptyChipPosition, chipPosition, cellHeight) ||
            this.emptyChipOnTheRight(emptyChipPosition, chipPosition, cellWidth) ||
            this.emptyChipOnTheBottom(emptyChipPosition, chipPosition, cellHeight) ||
            this.emptyChipOnTheLeft(emptyChipPosition, chipPosition, cellWidth)) {
                return true; 
        }
        return false;
    }

    // returns true if empty chip is on the top from the clicked chip
    static emptyChipOnTheTop(emptyChipPosition, chipPosition, cellHeight) {
        if (chipPosition.y - cellHeight === emptyChipPosition.y && chipPosition.x === emptyChipPosition.x) {
            return true;
        }
        return false;
    }

    // returns true if empty chip is on the right from the clicked chip
    static emptyChipOnTheRight(emptyChipPosition, chipPosition, cellWidth) {
        if (chipPosition.x + cellWidth === emptyChipPosition.x && chipPosition.y === emptyChipPosition.y) {
            return true;
        }
        return false;
    }

    // returns true if empty chip is on the bottom from the clicked chip
    static emptyChipOnTheBottom(emptyChipPosition, chipPosition, cellHeight) {
        if (chipPosition.y + cellHeight === emptyChipPosition.y && chipPosition.x === emptyChipPosition.x) {
            return true;
        }
        return false;
    }

    // returns true if empty chip is on the left from the clicked chip
    static emptyChipOnTheLeft(emptyChipPosition, chipPosition, cellWidth) {
        if (chipPosition.x - cellWidth === emptyChipPosition.x && chipPosition.y === emptyChipPosition.y) {
            return true;
        }
        return false;
    }
}