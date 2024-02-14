let listadeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function addTextoNaTag(tag, texto) {
    let tagSelecionada = document.querySelector(tag);
    tagSelecionada.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    addTextoNaTag('h1', 'Jogo do número secreto');
    addTextoNaTag('p', 'Escolha um número de 1 a 10:');
}

mensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdItensLista = listadeNumerosSorteados.length;

    if (qtdItensLista == numeroLimite) {
        listadeNumerosSorteados = [];
    }

    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listadeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
        
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        addTextoNaTag('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Parabéns! Você acertou com ${tentativas} ${palavraTentativa}!`;
        addTextoNaTag('p', mensagem);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            addTextoNaTag('p', 'Não foi dessa vez, tente um número menor!')
        } else {
            addTextoNaTag('p', 'Não foi dessa vez, tente um número maior!')
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    mensagemInicial();

}
