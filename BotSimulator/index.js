const readLineSync = require('readline-sync')

let userRes;
let opcionActiva = 0;
let casos = [];
let grafica = [];
let answerCasos = ['Pais?','Fecha?','Tipo de casos(confirmados, recuperados, muertes o todos)?'];
let answerGrafica = ['Pais?', 'Rango de fechas'];
let indice = 0;

console.log("1: Casos")
console.log("2: Grafica")

while (userRes !== '0') {

    if(opcionActiva == 0){
        userRes = readLineSync.question("Pick an option: ");
        if (userRes === 'casos') {
            opcionActiva = 1;
        } 
        else if (userRes === 'grafica') {
            opcionActiva = 2;
        }
    }
    else if(opcionActiva == 1){
        userRes = readLineSync.question(answerCasos[indice] + ': ');
        casos[indice++] = userRes;
        if(indice == 3){
            indice = 0;
            opcionActiva = 0;
            console.log("ENVIAR PETICION");
            console.log(casos);
        }
    }
    else if(opcionActiva == 2){
        userRes = readLineSync.question(answerGrafica[indice] + ': ');
        grafica[indice++] = userRes;
        if(indice == 2){
            indice = 0;
            opcionActiva = 0;
            console.log('ENVIAR PETICION');
            console.log(grafica);
        }
    }
}