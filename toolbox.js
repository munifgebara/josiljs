const population = require('./gpfunctions/f1');

const winnerCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let lines = ['', '', '', '', '', ''];

function clearLines(){

    lines = ['', '', '', '', ''];
}

function empty(v) {
    return v == 0 ? ' ' : v;
}

function displayState(i, state) {
    lines[0] += `${i} ${empty(state[0])}|${empty(state[1])}|${empty(state[2])}    `;
    lines[1] += `  -----    `;
    lines[2] += `  ${empty(state[3])}|${empty(state[4])}|${empty(state[5])}    `;
    lines[3] += `  -----    `;
    lines[4] += `  ${empty(state[6])}|${empty(state[7])}|${empty(state[8])}    `;
    //lines[5] += `  ${hash(state)} `;
}

function emptyPlaces(state) {
    return state.map((v, i) => i).filter((v, i) => state[i] == 0);
}

function isWinner(p, state) {
    for (let i = 0; i < winnerCombinations.length; i++) {
        if (state[winnerCombinations[i][0]] == p && state[winnerCombinations[i][1]] == p && state[winnerCombinations[i][2]] == p) {
            return p;
        }
    }
    return 0;
}


function next2(i, player, state, func) {
    let ep =  emptyPlaces(state);
    let nextMove = ep[Math.floor(func(i, player, state)) % ep.length];
    state[nextMove] = player;
}

function combat(ind1, ind2) {
    clearLines();
    let state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let winner = 0;
    let i = 0;
    let inds = [0, ind1, ind2];

    for (i = 0; i < 9 && winner == 0; i++) {
        let currentPlayer = i % 2==0?1:2;
        displayState(i, state);
        next2(i + 1, currentPlayer, state, population[`i${inds[currentPlayer]}`]);
        winner = isWinner(currentPlayer, state);
    }
    displayState('F', state);
    lines.forEach(l => console.log(l));
    console.log(`${ind1} vs ${ind2}     ${winner == 0 ? 'No winner' : `${winner} (i${inds[winner]}) wins`} after ${i} rounds`);
    return inds[winner];
}

function combatAll(){
let points = [];
for (let i = 0; i <= population.size; i++) {
    points.push(0);
}

for (let i = 1; i <= population.size - 1; i++) {
    for (let j = i + 1; j <= population.size; j++) {
        let w = combat(i, j);
        if (w == 0) {
            points[i]++;
            points[j]++;
        }
        else {
            points[w] += 3;
        }
        w = combat(j, i);
        if (w == 0) {
            points[i]++;
            points[j]++;
        }
        else {
            points[w] += 3;
        }
    }
}
points.forEach((v,i)=>console.log(i,v));

}

combat(2,2);