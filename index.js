
const entradas={jogador:"int",p0:"int",p1:"int",p2:"int",p3:"int",p4:"int",p5:"int",p6:"int",p7:"int",p8:"int"};
const saidas={posicao:"int"};
const constantes={int:[0,1,2],bol:[true,false]};
const operadores=[
     {nome:"soma",entradas:["int","int"],saida:"int",codigo:"return e0+e1;"},
     {nome:"subi",entradas:["int","int"],saida:"int",codigo:"return e0-e1;"},
     {nome:"mult",entradas:["int","int"],saida:"int",codigo:"return e0*e1;"},
     {nome:"divi",entradas:["int","int"],saida:"int",codigo:"return e1==0?1:e0/e1;"},
     {nome:"maior",entradas:["int","int"],saida:"bol",codigo:"return e0>e1;"},
     {nome:"menor",entradas:["int","int"],saida:"bol",codigo:"return e0<e1"},
     {nome:"resto",entradas:["int","int"],saida:"int",codigo:"return e0%e1;"},
     {nome:"igual",entradas:["int","int"],saida:"bol",codigo:"return e0==e1;"},
     {nome:"diferente",entradas:["int","int"],saida:"bol",codigo:"return e0!=e1;"},
     {nome:"se_entao_senao",entradas:["bol","int","int"],saida:"int",codigo:"return e0?e1:e2;"}
];

function escolheOperadorDoTipo(tipo){
    let p=operadores.filter(v=>v.saida==tipo);
    return p[Math.floor(Math.random()*p.length)];
}
function escolheTerminalDoTipo(tipo){    
    let terminais=[...Object.keys(entradas).filter(v=>entradas[v]==tipo),...constantes[tipo]];
    return terminais[Math.floor(Math.random()*terminais.length)];
}


function geraNo(tipo,maxAltura){
    if (maxAltura<2||Math.random()<0.3){
        return {no:escolheTerminalDoTipo(tipo),filhos:[]};
    }
    let op=escolheOperadorDoTipo(tipo);
    let filhos=[];
    op.entradas.forEach(tipo=>filhos.push(geraNo(tipo,maxAltura-1)));
    return {no:op,filhos};
    
}

function geraExemplo(tipo){
    let op=escolheOperadorDoTipo(tipo);
    let filhos=[];
    op.entradas.forEach(tipo=>filhos.push(geraNo(tipo,3)));
    return {no:op,filhos};
}

function expressao(arvore){
    if (arvore.filhos.length==0){
        return arvore.no;
    }
    else{
        return `${arvore.no.nome}${arvore.filhos.reduce((p,c,i)=>p+expressao(c)+(i<arvore.filhos.length-1?',': ')'),"(")}`;
    }
}

function operador2js(op){    
    return `function ${op.nome}(${op.entradas.reduce((p,v,i)=>p+'e'+i+(i<op.entradas.length-1?',':''),"")}){\n  ${op.codigo}\n}\n`;
}

let s="";

operadores.forEach(op=>s+=(operador2js(op)));

let exemplo=geraExemplo("int");

s+=expressao(exemplo);

console.log(s);