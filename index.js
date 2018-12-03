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

function funcao(x){
  return x*x+2*x+3;
}

let pop=[];
for(let i=0;i<100;i++){
    let ind=core.geraNo("number",5);
    let fit=0;
    for(let x=-10;x<=10;x++){
        let dif=funcao(x)-valor(x,ind);
        fit+=dif*dif;
    }
    pop.push({ind,fit});
}

pop.sort((el1,el2)=>el1.fit-el2.fit);

//pop.forEach(p=>console.log(p.fit,core.expressao(p.ind)));

console.log(pop[0].fit,core.expressao(pop[0].ind));