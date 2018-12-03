const {operadores,constantes,entradas,saidas}=require('./exemplos/predicao/dominio');

function escolheOperadorDoTipo  (tipo) {
    let p = operadores.filter(v => v.saida == tipo);
    return p[Math.floor(Math.random() * p.length)];
}

function escolheTerminalDoTipo  (tipo) {
    let terminais=[];
    if (Math.random()>0.5){
      terminais = [...Object.keys(entradas).filter(v => entradas[v] == tipo)];
    }
    else{
        terminais = [...constantes[tipo]];
    }
    return terminais[Math.floor(Math.random() * terminais.length)];
}


function geraNo (tipo, maxAltura) {
    if (maxAltura < 2 || Math.random() < 0.3) {
        return { no: escolheTerminalDoTipo(tipo), filhos: [] };
    }
    let op = escolheOperadorDoTipo(tipo);
    let filhos = [];
    op.entradas.forEach(tipo => filhos.push(geraNo(tipo, maxAltura - 1)));
    return { no: op, filhos };
}


function expressao (arvore) {
    if (arvore.filhos.length == 0) {
        return arvore.no;
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
exports.operador2js=operador2js;
exports.geraNo=geraNo;
exports.expressao=expressao;