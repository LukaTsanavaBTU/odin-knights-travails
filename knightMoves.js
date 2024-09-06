function coordinateConverter(x, y) {
    return x + y * 8;
}

function indexConverter(i) {
    let x = i % 8;
    let y = (i - x) / 8;
    return [x, y];
}

function possibleMoves(x, y) {
    if (x > 7 || x < 0 || y > 7 || y < 0) {
        throw new Error("Coordinates out of range");
    }
    const movesArray = [];
    for (let i = -1; i <= 1; i += 2) {
        for (let j = -2; j <= 2; j += 4) {
            let move = [x + i, y + j];
            if (move[0] <= 7 && move[0] >= 0 && move[1] <= 7 && move[1] >= 0) {
                movesArray.push(move);
            }
            move = [x + j, y + i];
            if (move[0] <= 7 && move[0] >= 0 && move[1] <= 7 && move[1] >= 0) {
                movesArray.push(move);
            }
        }
    }
    return movesArray; 
}

function adjacencyList() {
    const list = [];
    for (let i = 0; i < 64; i++) {
        list.push(possibleMoves(...indexConverter(i)));
    }
    return list;
}


console.log(adjacencyList());