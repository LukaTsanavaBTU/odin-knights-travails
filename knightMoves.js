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
                movesArray.push(coordinateConverter(...move));
            }
            move = [x + j, y + i];
            if (move[0] <= 7 && move[0] >= 0 && move[1] <= 7 && move[1] >= 0) {
                movesArray.push(coordinateConverter(...move));
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

const list = adjacencyList();

// function recursiveSearch(startIdx, targetIdx) {
    // for (let i = 0; i < list[startIdx].length; i++) {
    //     if (beenTo.includes(list[startIdx][i])) {
    //         continue;
    //     }
    //     console.log(list[startIdx][i], targetIdx);
    //     if (list[startIdx][i] === targetIdx) {
    //         beenTo.push(list[startIdx][i]);
    //         return beenTo;
    //     }
    //     beenTo.push(list[startIdx][i]);
    //     recursiveSearch(list[startIdx][i], targetIdx, beenTo);
    // }
// }

function knightMoves(start, target) {
    const startIdx = coordinateConverter(...start);
    const targetIdx = coordinateConverter(...target);
    const beenTo = [];
    const queue = [[startIdx]];
    let currIdx;
    while (queue.length !== 0) {
        path = queue.shift();
        currIdx = path.at(-1);
        beenTo.push(currIdx);
        for (let i = 0; i < list[currIdx].length; i++) {
            if (beenTo.includes(list[currIdx][i])) {
                continue;
            }
            if (list[currIdx][i] === targetIdx) {
                return path.concat(list[currIdx][i]).map((idx) => indexConverter(idx));
            }
            queue.push(path.concat(list[currIdx][i]));
        }
    }
}

console.log(knightMoves([0, 0], [7, 7]));