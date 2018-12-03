const { operadores, constantes, entradas, saidas } = require('./exemplos/predicao/dominio');

function escolheOperadorDoTipo(tipo) {
    let p = operadores.filter(v => v.saida == tipo);
    return p[Math.floor(Math.random() * p.length)];
}

function escolheTerminalDoTipo(tipo) {

    let terminais = [...Object.keys(entradas).filter(v => entradas[v] == tipo)];
    if (Math.random() > 0.5 || terminais.length == 0) {
        terminais = [...constantes[tipo]];
    }
    return { nome: terminais[Math.floor(Math.random() * terminais.length)], saida: tipo, entradas: [], codigo: {} };
}
let id = 0;

function geraNo(tipo, maxAltura) {
    if (maxAltura < 2 || Math.random() < 0.3) {
        return { no: escolheTerminalDoTipo(tipo), filhos: [], id: id++ };
    }
    let op = escolheOperadorDoTipo(tipo);
    let filhos = [];
    op.entradas.forEach(tipo => filhos.push(geraNo(tipo, maxAltura - 1)));
    return { no: op, filhos, id: id++ };
}


function expressao(arvore) {
    if (arvore.filhos.length == 0) {
        return arvore.no.nome;
    }
    else {
        return `${arvore.no.nome}${arvore.filhos.reduce((p, c, i) => p + expressao(c) + (i < arvore.filhos.length - 1 ? ',' : ')'), "(")}`;
    }
}

function operador2js(op) {
    return `function ${op.nome}(${op.entradas.reduce((p, v, i) => p + 'e' + i + (i < op.entradas.length - 1 ? ',' : ''), "")}){\n  ${op.codigo}\n}\n`;
}

exports.getFunctions = function () {
    let functions = "";
    operadores.forEach(op => functions += (operador2js(op)));
    return functions;
}



function percorre(no, dot) {
    dot.push(`N${no.id} [label="${no.no.nome}"];`);
    no.filhos.forEach(f => {
        dot.push(`N${no.id} -> N${f.id};`);

        percorre(f, dot);
    });

}

exports.getDot = function (no) {
    let dot = [` digraph G${no.id} {`];
    percorre(no, dot, 1);
    dot.push("}");
    return dot.reduce((p, c) => p + c + '\n', '');
}

function contaNo(arvore) {
    let c = 1;
    arvore.filhos.forEach(f => c += contaNo(f));
    return c;
}

exports.conta = function (arvore) {
    let nos = [];
    return contaNo(arvore);
}

function arrayNos(arvore,nos) {
    nos.push(arvore);
    arvore.filhos.forEach(f => arrayNos(f,nos));
    return nos;
}
exports.corta = function (arvore) {
    let nos = [];
    arrayNos(arvore,nos);
    //let nosComFilhos=nos.filter(n=>n.filhos.length>0);
    let corte=1+Math.floor(Math.random()*nos.length-1);
    return {inicio:nos.slice(0,corte),fim:nos.slice(corte)};
}


exports.operador2js = operador2js;
exports.geraNo = geraNo;
exports.expressao = expressao;