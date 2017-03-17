/*Definição Processo Estatistico = total*/
function dpeTotal(quantidade) {
    var vetTotal = new Array();
    /*cria um array com a quantidade total passada como parametro*/
    for (var i = 0; i < quantidade; i++) {
        vetTotal.push(i);
    }
    return vetTotal.sort(function(a, b) {
        return a - b;
    });
}
/********************************************************************************************/

/*calcula a populacao de acordo com o erro*/
function calculaAmostraErro(quantidadeTotal, erro) {
    /*converte o erro para percentual e eleva ao quadrdado(formula)*/
    erro = Math.pow((erro / 100), 2);
    /*aplica a formula para achar a população*/
    return populacao = Math.round((quantidadeTotal * (1 / erro)) / (quantidadeTotal + (1 / erro)));
}
/********************************************************************************************/

/*aleatória simples*/
function aleatoriaSimples(populacao, amostra) {
    var vetQuantidade = new Array();
    /*enquanto o array não tem a quantidade especificada*/
    while (vetQuantidade.length != amostra) {
        /*busca um aleatório entre 0 e 1, e multiplica pelo valor de quantidade total para abrangir todas as possibilidades, arredondando para inteiro*/
        var position = parseInt((Math.ceil(Math.random() * populacao)));
        /*se não tiver no array, ele retorna -1, com isso, acrescenta no array*/
        if (vetQuantidade.indexOf(position) === -1) {
            /*retorna Array*/
            vetQuantidade.push(position)
                /*retorna matriz
                vetQuantidade.push([0, position])*/

        }
    }
    return vetQuantidade.sort(function(a, b) {
        return a - b;
    });
}
/********************************************************************************************/

/*recebe um array contendo as quantidades dos extratos, e a população total informada
        retorna verdadeiro caso a soma esteja de acordo com a população*/
function validaExtratos(vetExtratos, populacao) {
    var soma = 0;
    for (var i = 0; i < vetExtratos.length; i++) {
        soma += vetExtratos[i];
    }
    if (soma == populacao) {
        return true
    } else {
        return false;
    }
}
/********************************************************************************************/

/*recebe o array dos estratos, com eles na posição 0. calcula o percentual e retorna o mesmo extrato com o percentual na posicao 1.*/
function propExtratos(vetExtratos, populacao) {
    var prop = new Array();
    for (var i = 0; i < vetExtratos.length; i++) {
        prop.push([vetExtratos[i], ((vetExtratos[i] / populacao) * 100)]);
    }
    return prop;
}
/********************************************************************************************/

/*recebe o array de estratos, e divide proporcionalmente*/
function extratificadaProp(arrayExtratos, populacao, amostra) {
    var retorno = new Array();
    controle = amostra;
    for (var i = 0; i < arrayExtratos.length; i++) {
        retorno.push([arrayExtratos[i][0], arrayExtratos[i][1], (Math.ceil(arrayExtratos[i][1] * (amostra / 100)))]);
        controle -= retorno[i][2];
    }
    /*se a proporção não bater com o total esperado, 
    adiciona ou remove a diferenaça do ultimo, sempre 1, de acordo com o valor da variavel controle*/
    arrayExtratos[(arrayExtratos.length - 1)][2] += controle;

    /***********************
                VERIFICAR ANTES DE ENTREGAR SE VAI IMPLEMENTAR - Yuri 04/03/2017
                ***********************
            
                limiteAnterior = 0;
                for (var i = 0; i < arrayExtratos.length; i++) {
                    qtdearray = 0;
                    while (qtdearray < arrayExtratos[i][2]) {
                        position = parseInt(Math.ceil((Math.random() * arrayExtratos[i][1]) + limiteAnterior));

                        if (retorno.indexOf(position[0]) === -1) {
                            retorno.push([position, arrayExtratos[0]]);
                            qtdearray++;
                        }
                         else {
                                                document.write("<br> não entrou: " + position)
                                            }
                    }
                    document.write(retorno);
                    limiteAnterior += arrayExtratos[i][1];*/
    return retorno;
}
/*teste função
document.write(extratificadaProp(propExtratos(vetextratos, pop), pop, calculaAmostraErro(pop, erro)));*/

/********************************************************************************************/

/*recebe a apostra e popução e divide sistematicamente
quando for passar um vetor em população, tem que alterar*/
function sistematica(amostra, populacao) {
    var vetQuantidade = new Array();
    intervaloAmostragem = (populacao / amostra);

    /*inicio casual é um valor aleatório entre 0 e o intervalo de amostragem*/
    inicioCasual = (Math.floor(Math.random() * intervaloAmostragem));
    /*cada incremento recebe o indice * o intervaloAmostragem + iniciocasual, arredondado para baixo*/
    for (var i = 0; i < amostra; i++) {
        /*retorna matriz
        vetQuantidade.push([0, Math.ceil(inicioCasual + (i * intervaloAmostragem))]);*/
        /*retorna array*/
        vetQuantidade.push(Math.ceil(inicioCasual + (i * intervaloAmostragem)));
    }
    /*retorno já está ordenado*/
    return vetQuantidade;
}
/********************************************************************************************/

/*Ordena Array
Array dados 0 = variavel pesquisada*/
function ordena(dados) {
    return dados.sort(function(a, b) {
        return a - b;
    });
}
/********************************************************************************************/

/*recebe os dados e monta a tabela*/
function tabelaQuantDiscreta(dados) {
    /*Array tabela
    0-variável
    1-frequencia (fi)
    2-FR%
    3-F
    4-F%
    */
    var tabela = new Array();

    /*percorre o array inicial*/
    for (var i = 0; i < dados.length; i++) {
        var achou = false;
        for (var j = 0; j < tabela.length; j++) {
            /*verifica se a posição de i ja tem no Array de repetição, se tiver, incrementa*/
            if (dados[i] == tabela[j][0]) {
                tabela[j][1] += 1;
                achou = true;
                continue;
            }
        }
        /*se não tiver no array de repetição, adiciona*/
        if (achou == false) {
            tabela.push([dados[i], 1]);
        }
    }
    /*calculos da tabela*/
    for (var i = 0; i < tabela.length; i++) {
        /*calculo do percentual do indice*/
        tabela[i][2] = parseFloat(((tabela[i][1] / dados.length) * 100).toFixed(3));
        if (i == 0) {
            tabela[i][3] = tabela[i][1];
            tabela[i][4] = tabela[i][2];
        } else {
            /*soma anterior com o autal, acumultivo*/
            tabela[i][3] = tabela[i][1] + tabela[(i - 1)][3];
            tabela[i][4] = tabela[i][2] + tabela[(i - 1)][4];
        }
    }
    return tabela;
}
/********************************************************************************************/

/*recebe os dados e monta a tabela*/
function tabelaQuantContinua(dados) {
    /*calcula a amplitude, maior menos o menor*/
    menor = Math.min.apply(null, dados);
    maior = Math.max.apply(null, dados);
    amplitude = maior - menor;

    /*calcula a raiz da quantidade de elementos do Array*/
    raiz = Math.floor(Math.sqrt(dados.length));

    var achou = false;
    intervaloDeClasse = 0;
    classe = 0;
    while (!achou) {
        amplitude++;
        for (var i = -1; i < 2; i++) {
            if ((amplitude % (raiz + i)) == 0) {
                achou = true;
                classe = (i + raiz);
                intervaloDeClasse = (amplitude / classe);
                break;
            }
        }
    }
    /*Array tabela
    0- classe
    1- min intervalo
    2- |--
    3- max intervalo
    4- frequencia (fi)
    5- FR%
    6- F
    7- F%
    8- (min + max)/2
    */
    var tabela = new Array();

    /*monta a tabela*/
    for (var i = 0; i < classe; i++) {
        /*incrementa a classe*/
        tabela.push([(i + 1)]);
        /*monta o intervalo de salários*/
        tabela[i][1] = menor + (i * intervaloDeClasse);
        tabela[i][2] = " |-- ";
        tabela[i][3] = menor + ((i + 1) * intervaloDeClasse);

        /*Verifica a quantidade de repetições no intervalo, e incrementa na tabela*/
        count = 0;
        for (var j = 0; j < dados.length; j++) {
            if ((dados[j] >= tabela[i][1]) && (dados[j] < tabela[i][3])) {
                count++;
            }
        }
        tabela[i][4] = count;

        /*calcula o percentual da quantidade de repetição*/
        tabela[i][5] = ((tabela[i][4] / dados.length) * 100);

        /*calcula acumulado de repetição e de percentual
        primeiro indice não soma com anterior*/
        if (i == 0) {
            tabela[i][6] = tabela[i][4];
            tabela[i][7] = tabela[i][5];
        } else {
            tabela[i][6] = tabela[i][4] + tabela[(i - 1)][6];
            tabela[i][7] = tabela[i][5] + tabela[(i - 1)][7];
        }
        /*Calculo ma media por classe*/
        tabela[i][8] = ((tabela[i][1] + tabela[i][3]) / 2);
    }
    return tabela;
}
/********************************************************************************************/

/*calcula a media ponderada da variavel discreta, 
recebe a tabela como parametro, e apenas a quantidade da populacao*/
function mediaPonderadaVarDisc(tabela) {
    soma = 0;
    for (var i = 0; i < tabela.length; i++) {
        soma += (tabela[i][0] * tabela[i][1]);
    }
    return (soma / tabela[(tabela.length - 1)][3]);
}
/********************************************************************************************/

/*calcula a mediana da variavel discreta
recebe o array de dados*/
function medianaVarDisc(dados) {
    var mediana = 0;
    /*se o array for par, pega o valor do meio do array e o meio+1, faz a media entre os dois*/
    if (dados.length % 2 == 0) {
        var valor1 = dados[(dados.length / 2) - 1];
        var valor2 = dados[(dados.length / 2)];
        mediana = (valor1 + valor2) / 2;
    } else {
        mediana = dados[((dados.length - 1) / 2)];
    }
    return mediana;
}
/********************************************************************************************/

/*calcula a moda, retornando um array, vazio ou com a(s) moda(s)
recebe a tabela como parametro*/
function modaVarDis(tabela) {
    /*cria um array para a moda e adiciona como moda o primeiro valor de tabela
    0 - variavel
    1 - quantidade de repetição
    */
    var moda = new Array();
    moda.push([tabela[0][0], tabela[0][1]]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        if (tabela[i][1] > moda[0][1]) {
            /*quando acha um maior, zera o array, e adiciona ele*/
            moda.splice(0, moda.length);
            moda.push([tabela[i][0], tabela[i][1]]);
        } else if (tabela[i][1] == moda[0][1]) {
            moda.push([tabela[i][0], tabela[i][1]]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.celar;
    }
    return moda;
}
/********************************************************************************************/

/*calcula a media ponderada da variavel continua, 
    recebe a tabela como parametro, e apenas a quantidade da populacao*/
function mediaVarContinua(tabela, populacao) {
    soma = 0;
    for (var i = 0; i < tabela.length; i++) {
        soma += (tabela[i][8] * tabela[i][4]);
    }
    return (soma / populacao);
}
/********************************************************************************************/

function medianaVarCont(tabela, populacao) {
    /*calcula a amplitude, maior menos o menor*/
    menor = Math.min.apply(null, populacao);
    maior = Math.max.apply(null, populacao);
    amplitude = maior - menor;

    /*calcula a raiz da quantidade de elementos do Array*/
    raiz = Math.floor(Math.sqrt(populacao.length));

    /* vai testar a raiz, -1 e +1 pra ver se tem calculo inteiro*/
    var achou = false;
    intervaloDeClasse = 0;
    var classe = 0;

    while (!achou) {
        amplitude++;
        for (var i = -1; i < 2; i++) {
            if ((amplitude % (raiz + i)) == 0) {
                achou = true;
                intervaloDeClasse = (amplitude / (i + raiz));
                break;
            }
        }
    }
    /*é o indice da classe quando posição for menor que tabela[i][6] - acumulado da tabela */
    for (var i = 0; i < tabela.length; i++) {
        if ((populacao.length / 2) < tabela[i][6]) {
            classe = i;
            break;
        }
    }
    minClasse = tabela[classe][1];

    /*se for indice 0 não tem anterior, joga 0*/
    if (classe == 0) {
        acumClasseAnt = 0;
    } else {
        acumClasseAnt = tabela[(i - 1)][6];
    }
    quantClasse = tabela[classe][4];

    /* retorna calculo da mediana*/
    return (minClasse + ((((populacao.length / 2) - acumClasseAnt) / quantClasse) * intervaloDeClasse));
}
/********************************************************************************************/

function modaConvVarCont(tabela) {
    /* array moda
    0 - classe (0)
    1 - Frequencia (4)
    2 - ponto medio(8)
    */
    var moda = new Array();
    /*insere a primeira posição como moda*/
    moda.push([tabela[0][0], tabela[0][4], tabela[0][8]]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        if (tabela[i][4] > moda[0][1]) {
            /*quando acha um maior, zera o array, e adiciona ele*/
            moda.splice(0, moda.length);
            moda.push([tabela[i][0], tabela[i][4], tabela[i][8]]);
        } else if (tabela[i][1] == moda[0][1]) {
            moda.push([tabela[i][0], tabela[i][4], tabela[i][8]]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.celar;
    }
    return moda;
}
/********************************************************************************************/

function modaKing(tabela) {
    /* array moda
      0 - classe (0)
      1 - Frequencia (4)
      2 - calculo
      */
    var moda = new Array();
    /*calcula a adiciona a primeira posição*/
    limInferior = tabela[0][1];
    qtdeClasseAnterior = 0;
    if (tabela.length > 1) {
        qtdeClassePosterior = tabela[(1)][4];
    } else {
        qtdeClassePosterior = 0;
    }
    intervaloDeClasse = tabela[0][3] - tabela[0][1];
    calcModa = (limInferior + (((qtdeClassePosterior / (qtdeClasseAnterior + qtdeClassePosterior)) * intervaloDeClasse)));

    moda.push([tabela[0][0], tabela[0][4], calcModa]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        var insere = false;
        if (tabela[i][4] > moda[0][1]) {
            /*quando acha um maior, zera o array e marca pra adicionar*/
            moda.splice(0, moda.length);
            insere = true;
        } else if (tabela[i][1] == moda[0][1]) {
            /*se for igual marca pra adicionar*/
            insere = true;
        }
        /*adiciona no array*/
        if (insere == true) {
            limInferior = tabela[i][1];
            qtdeClasseAnterior = tabela[(i - 1)][4];
            //se for o ultimo, posterior recebe 0
            if (i == (tabela.length - 1)) {
                qtdeClassePosterior = 0;
            } else {
                qtdeClassePosterior = tabela[(i + 1)][4];
            }

            calcModa = (limInferior + (((qtdeClassePosterior / (qtdeClasseAnterior + qtdeClassePosterior)) * intervaloDeClasse)));

            moda.push([tabela[i][0], tabela[i][4], calcModa]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.splice(0, moda.length);
    }
    return moda;
}
/********************************************************************************************/

function modaCzuber(tabela) {
    /* array moda
      0 - classe (0)
      1 - Frequencia (4)
      2 - calculo
      */
    var moda = new Array();
    /*calcula e insere a primeira posição como moda*/
    limInferior = tabela[0][1];
    qtde = tabela[0][4];
    qtdeClasseAnterior = 0;
    if (tabela.length > 1) {
        qtdeClassePosterior = tabela[(1)][4];
    } else {
        qtdeClassePosterior = 0;
    }
    intervaloDeClasse = tabela[0][3] - tabela[0][1];
    calcModa = (limInferior + ((qtde - qtdeClasseAnterior) / ((qtde - qtdeClasseAnterior) + (qtde - qtdeClassePosterior))) * intervaloDeClasse);

    moda.push([tabela[0][0], tabela[0][4], calcModa]);

    /*percorre tabela verificando qual repete mais*/
    for (var i = 1; i < tabela.length; i++) {
        var insere = false;
        if (tabela[i][4] > moda[0][1]) {
            /*quando acha um maior, zera o array, e marca pra adicionar*/
            moda.splice(0, moda.length);
            insere = true;
        } else if (tabela[i][1] == moda[0][1]) {
            insere = true;
        }
        /*adiciona quando estiver marcado*/
        if (insere == true) {
            limInferior = tabela[i][1];
            qtde = tabela[i][0];
            qtdeClasseAnterior = tabela[(i - 1)][4];
            //se for o ultimo, posterior recebe 0
            if (i == (tabela.length - 1)) {
                qtdeClassePosterior = 0;
            } else {
                qtdeClassePosterior = tabela[(i + 1)][4];
            }
            calcModa = (limInferior + ((qtde - qtdeClasseAnterior) / ((qtde - qtdeClasseAnterior) + (qtde - qtdeClassePosterior)) * intervaloDeClasse));

            moda.push([tabela[i][0], tabela[i][4], calcModa]);
        }
    }
    /*se a moda tiver o mesmo tamanho que a tabela e amodal*/
    if (moda.length == tabela.length) {
        moda.splice(0, moda.length);
    }
    return moda;
}
/********************************************************************************************/

function modaPearson(mediana, media) {
    /*retorna calculo*/
    return ((3 * mediana) - (2 * media));
}
/********************************************************************************************/

function variancia(tabela, media, populacao) {
    /*SEMPRE PASSAR A TABELA DISCRETA COMO PARAMETRO*/
    soma = 0;

    if (populacao) {
        divisor = tabela[(tabela.length - 1)][3];
    } else {
        divisor = (tabela[(tabela.length - 1)][3] - 1);
    }
    //divisor = tabela[(tabela.length - 1)][3];

    for (var i = 0; i < tabela.length; i++) {
        soma += (Math.pow((tabela[i][0] - media), 2) * tabela[i][1]);
    }
    /*tabela[tabela.length - 1][3] é o ultimo acumulado de quantidade (total)*/
    return (soma / divisor);
}
/********************************************************************************************/

function DesvioPadrao(variancia, media) {
    var desvioPadrao = new Array();
    desvioPadrao.push([Math.sqrt(variancia), ((Math.sqrt(variancia) / media) * 100)]);
    return desvioPadrao;
}
/********************************************************************************************/
//#### incorporadas


function validaEntrada(num) {
    //função para validar entrada apenas de numeros e ;
    var er = /[^0-9;.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    } else if (campo == ",") {
        campo.value = ".";
    }
}

function setPopulacao() {
    v_populacao = parseFloat(document.getElementById("populacao").value);
}

function setErro() {
    v_erro = parseFloat(document.getElementById("erro").value);
}

function setValor() {
    v_valor = parseFloat(document.getElementById("valor").value);
}

function addValor() {
    if (!(v_valor > 0)) {
        alert("É necessário informar um valor antes!!");
        throw "";
    }
    v_valores.push(v_valor);
    getValores();
    document.getElementById("valor").value = null;
    v_valor = null;
}

function getValores() {
    v_valores_str = "";
    v_valores = ordena(v_valores);
    for (var i = 0; i < v_valores.length; i++) {
        if (v_valores_str == "") {
            v_valores_str = v_valores[i]
        } else {
            v_valores_str += ";" + v_valores[i];
        }
    }
    v_tabelaDiscreta.splice(0, v_tabelaDiscreta.length);
    v_tabelaContinua.splice(0, v_tabelaContinua.length);
    document.getElementById("valores").value = v_valores_str;
}

function setValores() {
    v_valores.splice(0, v_valores.length);
    v_valores_str = document.getElementById("valores").value;
    v_valores = v_valores_str.split(";").map(function(t) {
        return parseFloat(t)
    });
    v_valores = ordena(v_valores);
}

function setValorExtrato() {
    v_valorExtrato = parseFloat(document.getElementById("valorExtrato").value);
}

function addValorExtrato() {
    if (!(v_valorExtrato > 0)) {
        alert("É necessário informar um valor antes!!");
        throw "";
    }
    v_valoresExtrato.push(v_valorExtrato);
    getValoresExtrato();
    document.getElementById("valorExtrato").value = null;
    v_valorExtrato = null;
}

function getValoresExtrato() {
    v_valoresExtrato_str = "";
    for (var i = 0; i < v_valoresExtrato.length; i++) {
        if (v_valoresExtrato_str == "") {
            v_valoresExtrato_str = v_valoresExtrato[i]
        } else {
            v_valoresExtrato_str += ";" + v_valoresExtrato[i];
        }
    }
    document.getElementById("valoresExtrato").value = v_valoresExtrato_str;
}

function setValoresExtrato() {
    v_valoresExtrato.splice(0, v_valoresExtrato.length);
    v_valoresExtrato_str = document.getElementById("valoresExtrato").value;
    v_valoresExtrato = v_valoresExtrato_str.split(";").map(function(t) {
        return parseFloat(t)
    });
}