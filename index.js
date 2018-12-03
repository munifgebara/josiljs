const core=require('./core');

/*
let s="";

operadores.forEach(op=>s+=(operador2js(op)));

let exemplo=geraExemplo("int");

s+=expressao(exemplo);

console.log(s);
*/
eval(core.getFunctions());

function valor(x,ind){
    return eval(core.expressao(ind));
}


let ind=core.geraNo("number",3);

console.log(`f(x)=${core.expressao(ind)}`);

for (let i=0;i<10;i++){
   console.log(`f(${i})=${valor(i,ind)}`);
}


