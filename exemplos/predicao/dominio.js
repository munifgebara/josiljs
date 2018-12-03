

exports.entradas={x:"number"};
exports.saidas={y:"number"};
exports.constantes={number:[0,1,2,3,4,5,6,7,8,9],bol:[true,false]};
exports.operadores=[
     {nome:"soma",entradas:["number","number"],saida:"number",codigo:"return e0+e1;"},
     {nome:"subi",entradas:["number","number"],saida:"number",codigo:"return e0-e1;"},
     {nome:"mult",entradas:["number","number"],saida:"number",codigo:"return e0*e1;"},
     {nome:"divi",entradas:["number","number"],saida:"number",codigo:"return e1==0?1:e0/e1;"},
     {nome:"maior",entradas:["number","number"],saida:"bol",codigo:"return e0>e1;"},
     {nome:"menor",entradas:["number","number"],saida:"bol",codigo:"return e0<e1"},
     {nome:"resto",entradas:["number","number"],saida:"number",codigo:"return e1==0?1:e0%e1;"},
     {nome:"igual",entradas:["number","number"],saida:"bol",codigo:"return e0==e1;"},
     {nome:"diferente",entradas:["number","number"],saida:"bol",codigo:"return e0!=e1;"},
     {nome:"se_entao_senao",entradas:["bol","number","number"],saida:"number",codigo:"return e0?e1:e2;"}
];

