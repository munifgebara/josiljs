
module.exports.size=12;

const winnerCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


function isWinner(p, state) {
    for (let i = 0; i < winnerCombinations.length; i++) {
        if (state[winnerCombinations[i][0]] == p && state[winnerCombinations[i][1]] == p && state[winnerCombinations[i][2]] == p) {
            return p;
        }
    }
    return 0;
}

function hasPossibiliteToWin(player, state) {
    for (let i = 0; i < winnerCombinations.length; i++) {
        let emptys = 0;
        let belogsToPlayer = false;
        let lastEmpty = 0;
        for (let j = 0; j < 3; j++) {
            if (!state[winnerCombinations[i][j]]) {
                emptys++;
                lastEmpty = winnerCombinations[i][j];
            }
            else {
                belogsToPlayer = state[winnerCombinations[i][j]] == player;
            }
            if (emptys == 2 && belogsToPlayer) {
                return lastEmpty;
            }
        }
    }
    return -1;
}

function hash(state) {
    let r = 0;
    let s1 = 1;
    let s2 = 1024;
    for (let i = 0; i < 9; i++) {
        if (state[i] == 1) {
            r += s1;
        }
        if (state[i] == 2) {
            r += s2;
        }
        s1 *= 2;
        s2 *= 2;
    }
    return r;
}

module.exports.i1=function (round,player,state){
    let ep = state.map((v, i) => i).filter((v, i) => state[i] == 0);
    let otherPlayer = player == 1 ? 2 : 1;
    let nextMove = Math.floor(Math.random() * ep.length);

    for (let i = 0; i < ep.length; i++) {
        let newState = state.slice(0);
        newState[ep[i]] = player;
        if (isWinner(player, newState)) {
            //console.log(round, `${player} moves to win`);
            return i;
            //state[ep[i]] = player;
         // 
            
        }
    }
    for (let i = 0; i < ep.length; i++) {
        let newState = state.slice(0);
        newState[ep[i]] = otherPlayer;
        if (isWinner(otherPlayer, newState)) {
            //console.log(round, `${player} moves to block`);
            return i;
            //state[ep[i]] = player;
     //
            //return;
        }
    }
    let pw = hasPossibiliteToWin(player, state);
    if (pw != -1) {
        return ep.map((v,i)=>i).find((v,i)=>ep[i]==pw);
    }
    return nextMove;
}


module.exports.i2=function (i,player,state){
    let h=hash(state);
    return eval("h/2+i+player");
}

module.exports.i3=function (i,player,state){
    let h=hash(state);
    return h/3+i+player;
}

module.exports.i4=function (i,player,state){
    let h=hash(state);
    return h/4+i+player;
}

module.exports.i5=function (i,player,state){
    let h=hash(state);
    return h+i+player;
}


module.exports.i6=function (i,player,state){
    let h=hash(state);
    return h+i*player;
}


module.exports.i7=function (i,player,state){
    let h=hash(state);
    return h-i*player;
}


module.exports.i8=function (i,player,state){
    let h=hash(state);
    return h/i*player;
}


module.exports.i9=function (i,player,state){
    let h=hash(state);
    return Math.sqrt(h)+player;
}


module.exports.i10=function (i,player,state){
    let h=hash(state);
    return h*5+i*2+player*1;
}


module.exports.i11=function (i,player,state){
    let h=hash(state);
    return h*4+i*2+player*2;
}


module.exports.i12=function (i,player,state){
    let h=hash(state);
    return h*3+i*2+player*4;
}

