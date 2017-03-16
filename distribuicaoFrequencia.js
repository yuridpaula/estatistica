var quantidadeItens = 0;
var conjuntoItem = new Array();

var arrayTabela = new Array();

//ATUALIZA A QUANTIDADE DE ITENS NA TELA
function atualizarQuantidade(){
    $("#quantidadeItens").text(quantidadeItens);
}

//INSERIR ITEM NA DISTRIUICAO
function inserirItem(){
    //VALIDAÇÃO
    if($("#itenInserir").val() == ""){
        alert("Digite algo no campo.");
        return;
    }

    //PEGA O NUMERO PARA INSERIR
    var item = $("#itenInserir").val();
    quantidadeItens++;//ADICIONA UM NA QUANTIDADE

    //VERIFICA SE É O PRIMEIRO ITEM OU NÃO
    if(quantidadeItens - 1 > 0){
        for(i = 0; i < quantidadeItens; i++){//PASSA POR TODO O ARRAY
            if(conjuntoItem[i] == undefined){//VERIFICA SE AQUELE INDICE POSSUI ALGO
                conjuntoItem[i] = item;//SE NÃO POSSUIR ELE POE
                break
            }else if(item < conjuntoItem[i]){//SE POSSUIR ELE DESCOLA O ARRAY
                for(j = quantidadeItens; j > i; j--){
                    conjuntoItem[j] = conjuntoItem[j - 1];
                }
                conjuntoItem[i] = item;
                break;
            }
        }
    }else{
        conjuntoItem[0] = item;
    }


    atualizarQuantidade();
    montarTabelaDeItens();

    $("#itenInserir").val("");
    $("#itenInserir").focus();

}


//MONTA A TELA NO HTML
function montarTabelaDeItens(){
    $("#tabelaDeItens").html(" | ");
    for(i = 0; i < quantidadeItens; i++){
        $("#tabelaDeItens").html($("#tabelaDeItens").html() + conjuntoItem[i] + " | ");
    }
}

//FUNCAO CALCULA TABELA
function calculaATabelaQuantidativaDiscreta(){
    arrayCont = new Array();

    arrayCont[0] = new Array();
    arrayCont[0][0] = conjuntoItem[0];
    arrayCont[0][1] = 1;
    
    for(i = 1; i < quantidadeItens; i++){
        var encontrou = false;
        for(j = 0; j < arrayCont.length; j++){
            if(conjuntoItem[i] == arrayCont[j][0]){
                arrayCont[j][1]++;
                encontrou = true;
                break;
            }
        }

        if(!encontrou){
            indice = arrayCont.length;
            arrayCont[indice] = new Array();
            arrayCont[indice][0] = conjuntoItem[i];
            arrayCont[indice][1] = 1;
        }
    }

    for(i = 0; i < arrayCont.length; i++){
        arrayCont[i][2] = (arrayCont[i][1] / quantidadeItens) * 100;
        
        if(i > 0){
            arrayCont[i][3] = arrayCont[i][1] + arrayCont[i - 1][3];
        }else{
            arrayCont[i][3] = arrayCont[i][1];
        }

        arrayCont[i][4] = (arrayCont[i][3] / quantidadeItens) * 100;
    }
    
    arrayTabela = arrayCont;
}

//EXIBE A TABELA NA TELA
function exibirTabelaQuantidativaDiscreta(){
    $("#corpoTabela").html("");

    for(i = 0; i < arrayTabela.length; i++){
        if(arrayTabela[i][0] != undefined){
            $("#corpoTabela").html($("#corpoTabela").html() + "<tr><th>"+arrayTabela[i][0]+"</th><th>"+arrayTabela[i][1]+"</th><th>"+arrayTabela[i][2]+"</th><th>"+arrayTabela[i][3]+"</th><th>"+arrayTabela[i][4]+"</th></tr>");
        }
    }

}

//EXIBE A TABELA NA TELA VARIAVEL CONTINUA
function exibirTabelaVariavelContinua(){
    $("#corpoTabela").html("");

    for(i = 0; i < arrayTabela.length; i++){
        if(arrayTabela[i][0] != undefined){
            $("#corpoTabela").html($("#corpoTabela").html() + "<tr><th>"+arrayTabela[i][0][0]+" |--- "+arrayTabela[i][0][1]+"</th><th>"+arrayTabela[i][1]+"</th><th>"+arrayTabela[i][2]+"</th><th>"+arrayTabela[i][3]+"</th><th>"+arrayTabela[i][4]+"</th></tr>");
        }
    }

}

//FUNCAO QUE ORGANIZA A TELA E CALCULA A MESMA
function calcularTabela(){

    //$("#tabelaDeItens").hide();
    $("#tabelaDeItensCalculada").show();
    $("#itenInserir").prop('disabled', true);
    $("#quantitativaSimplesDados").hide();
    $("#variavelDiscretaDados").hide();

    if($("#quantitativaDescreta").is(":checked")){


        calculaATabelaQuantidativaDiscreta();
        exibirTabelaQuantidativaDiscreta();

        $("#quantativaModa").text(calcularMediaQuantitativaSimples());
        $("#quantativaMediana").text(calcularMedianaQuantitativaSimples());
        $("#quantitativaVarianca").text(calcularVarianca(1));
        $("#quantitativaDP").text(calculaDP(calcularVarianca(1)));
        $("#quantitativaDPPor").text((calculaDP(calcularVarianca(1)) / calcularMediaQuantitativaSimples()) * 100);
        modas = calculaModaAritimeticaQuantitativa();

        if(modas != null){
            $("#quantitativaModas").html("|");
            for(i = 0; i < modas.length; i++){
                $("#quantitativaModas").html($("#quantitativaModas").html()+modas[i]+"|");
            }
        }

        $("#quantitativaSimplesDados").show();
        

    }else if($("#variavelContinua").is(":checked")){
        encontrarNumeroDeClasses();
        exibirTabelaVariavelContinua();

        $("#variavelDiscretaDados").show();
        $("#discretaMedia").text(mediaPonderadaSimplesVariavel());
        $("#discretaMediana").text(medianaPonderadaSimplesVariavel());
        $("#discretaModaSimples").text(modaConvencionalVariavelContinuaSimples());
        $("#discretaVarianca").text(calcularVarianca(2));
        $("#discretaDP").text(calculaDP(calcularVarianca(2)));
        $("#discretaDPPor").text((calculaDP(calcularVarianca(2)) / mediaPonderadaSimplesVariavel()) * 100);
        

    }else{

        modaDadosSoltos = modaDadosSoltos();
        $("#tabelaDeItensCalculada").hide();
        $("#infoSoltasModa").text(mediaDadosSoltos().toFixed(2));

        $("#infoSoltasModas").html("|");
        for(i = 0; i < modaDadosSoltos.length; i++){            
            $("#infoSoltasModas").html($("#infoSoltasModas").html() + modaDadosSoltos[i] + "|");
        }

        $("#infoSoltasMediana").text(medianaDadosSoltos());
        $("#infoSoltasVarianca").text(dispersaoDadosSoltos());
        $("#infoSoltasDP").text(calculaDP(dispersaoDadosSoltos()));
        $("#infoSoltasDPPor").text((calculaDP(dispersaoDadosSoltos()) / medianaDadosSoltos()) * 100);

    }


}

//LIMPAR A TELA QUANDO INICIA O JS
function limparTela(){
    $("#tabelaDeItensCalculada").hide();
}

//MEDIA ARITIMETICA SIMPLES QUANTTATIVA DISCRETA
function calcularMediaQuantitativaSimples(){
    var Sfi = 0;
    var Sxifi = 0;

    for(i = 0; i < arrayTabela.length; i++){
        Sfi += arrayTabela[i][1];
        Sxifi += (arrayTabela[i][1] * arrayTabela[i][0]);
    }

    return Sxifi / Sfi;
}


//MEDIANA ARITIMETICA SIMPLES QUANTTATIVA DISCRETA
function calcularMedianaQuantitativaSimples(){
    var Sfi = 0;
    //var Sxifi = 0;

    for(i = 0; i < arrayTabela.length; i++){
        Sfi += arrayTabela[i][1];
        //Sxifi += (arrayTabela[i][1] * arrayTabela[i][0]);
    }

    posicao = Sfi / 2;

    if(quantidadeItens % 2 == 0){

        primeiro = conjuntoItem[posicao - 1];
        segundo = conjuntoItem[posicao];

        return (primeiro + segundo) / 2;
    }else{
        return conjuntoItem[posicao];
    }

}

//MODA ARITIMETICA QUANTITATIVA SIMPELS
function calculaModaAritimeticaQuantitativa(){
    var modaArray = new Array();
    var modaQtd = "";

    modaArray[modaArray.length] = arrayTabela[0][0];
    modaQtd = arrayTabela[0][1];

    for(i = 1; i < arrayTabela.length; i++){
        if(arrayTabela[i][1] > modaQtd){
            modaArray = new Array();
            modaArray[modaArray.length] = arrayTabela[i][0];
            modaQtd = arrayTabela[i][1];
        }else if(arrayTabela[i][1] == modaQtd){
            modaArray[modaArray.length] = arrayTabela[i][0];
        }
    }

    if(modaArray.length == arrayTabela.length){
        return null;
    }else{
        return modaArray;
    }

}

//ENCONTRAR O NUMERO DE CLASSES E FUNÇÃO QUE CALCULA A VARIAVEL CONTINUA
function encontrarNumeroDeClasses(){
    var amplitude = conjuntoItem[quantidadeItens-1] - conjuntoItem[0];
    var K = parseInt(Math.sqrt(quantidadeItens));

    var classeEscolhida;

    do{
        classeEscolhida = prompt("Escolha uma das classes: "+(K-1)+" - "+K+" - "+(K + 1));
    }while(classeEscolhida != K && classeEscolhida != K+1 && classeEscolhida != K-1);

    var amplitudeParaCalculo = Math.round(amplitude)+1;
    
    /*if(amplitudeParaCalculo % classeEscolhida != 0){
        amplitudeParaCalculo += amplitudeParaCalculo % classeEscolhida;
    }*/


    do{
        amplitudeParaCalculo++;
    }while(amplitudeParaCalculo % classeEscolhida != 0);

    var intervalo = amplitudeParaCalculo / classeEscolhida;

    arrayCont = new Array();

    arrayCont[0] = new Array();
    arrayCont[0][0] = new Array();
    arrayCont[0][0][0] = conjuntoItem[0];
    arrayCont[0][0][1] = parseFloat(conjuntoItem[0]) + parseFloat(intervalo);
    arrayCont[0][1] = 1;

    for(i = 1; i < quantidadeItens; i++){
        var encontrou = false;
        for(j = 0; j < arrayCont.length; j++){
            if(conjuntoItem[i] >= arrayCont[j][0][0] && conjuntoItem[i] < arrayCont[j][0][1]){
                arrayCont[j][1]++;
                encontrou = true;
                break;
            }
        }

        if(!encontrou){
            do{
                indice = arrayCont.length;
                arrayCont[indice] = new Array();
                arrayCont[indice][0] = new Array();
                arrayCont[indice][0][0] = arrayCont[indice - 1][0][1];
                arrayCont[indice][0][1] = parseFloat(arrayCont[indice - 1][0][1]) + parseFloat(intervalo);
                arrayCont[indice][1] = 0;
            }while(arrayCont[indice][0][1] < conjuntoItem[i]);
            arrayCont[indice][1]++;
        }
    }

    for(i = 0; i < arrayCont.length; i++){
        arrayCont[i][2] = (arrayCont[i][1] / quantidadeItens) * 100;

        if(i > 0){
            arrayCont[i][3] = arrayCont[i][1] + arrayCont[i - 1][3];
        }else{
            arrayCont[i][3] = arrayCont[i][1];
        }

        arrayCont[i][4] = (arrayCont[i][3] / quantidadeItens) * 100;
    }

    arrayTabela = arrayCont;
}

//MEDIA PONDERADA SIMPLES VARIAVEL CONTINUA
function mediaPonderadaSimplesVariavel(){

    var soma = 0;

    for(i = 0; i < arrayTabela.length; i++){
        soma += ((arrayTabela[i][0][0] + arrayTabela[i][0][1]) / 2) * arrayTabela[i][1];
    }

    return soma / quantidadeItens;
}


//MEDIANA VARIAVEL CONTINUA SIMPLES
function medianaPonderadaSimplesVariavel(){

    var posicaoClasse = quantidadeItens / 2;

    posicaoClasse = Math.round(posicaoClasse);

    for(i = 0; i < arrayTabela.length; i++){
        if(arrayTabela[i][3] >=  posicaoClasse){
            break;
        }
    }

    var fant;
    if(i == 0){
        fant = 0;
    }else{
        fant = arrayTabela[i - 1][3];
    }

    var md = arrayTabela[i][0][0] + (((quantidadeItens / 2) - fant) / arrayTabela[i][1]) * (arrayTabela[i][0][1] - arrayTabela[i][0][0]);

    return md;
}

//MODA CONVENCIONAL VARIAVEL CONTINUA SIMPLES
function modaConvencionalVariavelContinuaSimples(){

    var modaArray = new Array();
    var modaQtd = "";

    modaArray[modaArray.length] = (arrayTabela[0][0][0] + arrayTabela[0][0][1]) / 2;
    modaQtd = arrayTabela[0][1];

    for(i = 1; i < arrayTabela.length; i++){
        if(arrayTabela[i][1] > modaQtd){
            modaArray = new Array();
            modaArray[modaArray.length] = (arrayTabela[i][0][0] + arrayTabela[i][0][1]) / 2;
            modaQtd = arrayTabela[i][1];
        }else if(arrayTabela[i][1] == modaQtd){
            modaArray[modaArray.length] = (arrayTabela[i][0][0] + arrayTabela[i][0][1]) / 2;
        }
    }

    if(modaArray.length == arrayTabela.length){
        return null;
    }else{
        return modaArray;
    }
}

//CALCULA A DIPERSAO
function calcularVarianca(tipo){
    if(tipo == 1){
        var xifi = 0;
        var media = calcularMediaQuantitativaSimples();

        for(i = 0; i < arrayTabela.length; i++){
            xifi += Math.pow((arrayTabela[i][0] - media), 2) * arrayTabela[i][1];
        }

        var calc;

        if($("#tipoPopulacao").is(':checked')){
            calc = quantidadeItens;
        }else{
            calc = quantidadeItens - 1;
        }

        variancia = xifi / calc;

        return variancia;
    }else if(tipo == 2){
        var xifi = 0;
        var media = mediaPonderadaSimplesVariavel();;

        for(i = 0; i < arrayTabela.length; i++){
            xifi += Math.pow((((arrayTabela[i][0][0] + arrayTabela[i][0][1]) / 2) - media), 2) * arrayTabela[i][1];
        }

        var calc;

        if($("#tipoPopulacao").is(':checked')){
            calc = quantidadeItens;
        }else{
            calc = quantidadeItens - 1;
        }

        variancia = xifi / calc;

        return variancia;
    }
}

//CALCULA O DP DA VARIANCA
function calculaDP(varianca){
    return Math.sqrt(varianca);
}

//CALCULA MEDIA SOLTA
function mediaDadosSoltos(){
    soma = 0.00;
    for(i = 0; i < quantidadeItens; i++){
        soma = soma + parseFloat(conjuntoItem[i]);
    }

    return soma / quantidadeItens;
}

//CALCULAR A MODA SOLTA
function modaDadosSoltos(){
    arrayCont = new Array();

    arrayCont[0] = new Array();
    arrayCont[0][0] = conjuntoItem[0];
    arrayCont[0][1] = 1;
    
    for(i = 1; i < quantidadeItens; i++){
        var encontrou = false;
        for(j = 0; j < arrayCont.length; j++){
            if(conjuntoItem[i] == arrayCont[j][0]){
                arrayCont[j][1]++;
                encontrou = true;
                break;
            }
        }

        if(!encontrou){
            indice = arrayCont.length;
            arrayCont[indice] = new Array();
            arrayCont[indice][0] = conjuntoItem[i];
            arrayCont[indice][1] = 1;
        }
    }

    var modaArray = new Array();
    var modaQtd = "";

    modaArray[modaArray.length] = arrayCont[0][0];
    modaQtd = arrayCont[0][1];

    for(i = 1; i < arrayCont.length; i++){
        if(arrayCont[i][1] > modaQtd){
            modaArray = new Array();
            modaArray[modaArray.length] = arrayCont[i][0];
            modaQtd = arrayCont[i][1];
        }else if(arrayCont[i][1] == modaQtd){
            modaArray[modaArray.length] = arrayCont[i][0];
        }
    }

    if(modaArray.length == arrayCont.length){
        return null;
    }else{
        return modaArray;
    }
}

//CALCULAR MEDIANA SOLTA
function medianaDadosSoltos(){
    media = 0.00;
    if(quantidadeItens % 2 == 0){
        media += parseFloat(conjuntoItem[(quantidadeItens / 2) - 1]);
        media += parseFloat(conjuntoItem[(quantidadeItens / 2)]);
        return media / 2;
    }else{
        return conjuntoItem[(quantidadeItens + 1) / 2];
    }

}


//CALCULAR DISPERSAO ITENS SOLTOS
function dispersaoDadosSoltos(){
    var media = mediaDadosSoltos();

    var soma = 0;
    //xifi += Math.pow((arrayTabela[i][0] - media), 2) * arrayTabela[i][1];
    for(i = 0; i < quantidadeItens; i++){
        soma += Math.pow(conjuntoItem[i] - media, 2);
    }

    return soma / quantidadeItens;
}


//FUNCOES EXECUTADAS QUANDO ABRE A PAGINA
limparTela();
atualizarQuantidade();