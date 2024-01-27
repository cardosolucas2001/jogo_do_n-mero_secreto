let listaDeNumerosSorteados = [];//lista vazia
let numeroLimite=10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas=1;
function exibirTextoNaTela(tag,texto){//função com parâmetros 
    let campo=document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2} );
}
function exibirMensagemInicial() { //função sem parâmetros
    exibirTextoNaTela("h1", "Jogo do número secreto"); 
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10"); 
}
exibirMensagemInicial();
function verificarChute(){
    let chute = document.querySelector("input").value;//Retorna o valor dos dados na posição atual do cursor
    if (chute == numeroSecreto) { 
            exibirTextoNaTela("h1","Acertou!");
            let palavraTentativa= tentativas>1 ?"tentativas": "tentativa";//operador ternario
            let mensagemTentativas= `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`//cocatenção com template strings
            exibirTextoNaTela("p", mensagemTentativas);  
            document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
                exibirTextoNaTela("p", "O número secreto é menor");
             } else {
                exibirTextoNaTela("p", "O número secreto é maior");
             }
        }
        tentativas++;//incrmento 
        limparCampo();
}
function gerarNumeroAleatorio(){
    let numeroEscolhido=parseInt(Math.random() * numeroLimite+1); //chamando um pseudo número aleatório e convertendo para inteiro 
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;  
    if ( quantidadeDeElementosNalista== numeroLimite) {
        listaDeNumerosSorteados = [];
     }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){//recursividade
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}  
function limparCampo(){
    chute=document.querySelector("input");
    chute.value="";//limpa o campo
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}