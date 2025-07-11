// Pegamos os botões da escolha: pedra, papel e tesoura
// La mp html podemos colocar todos os botões dentro da área com classe "choice"

const botoes = document.querySelectorAll("button[data-choice]") // Essa linha do código seleciona vários botões no HTML e guarda eles em uma variável chamada botões
const textoJ1 = document.getElementById("player1-choice") // onde vai aparecer a escolha do jogador 1
const textoJ2 = document.getElementById("player2-choice") // onde vai aparecer a escolha do jogador 2
const resultado = document.getElementById("Winner")

let jogada1 = null
let jogada2 = null
// Função que recebe as escolhas dos dois jogadores
// Compara as jogadas e devolve (return) quem venceu ou se foi empate

function verificarVencedor(j1,j2){
    // Se os dois escolherem a mesma coisa, é empate
    if(j1===j2){
        return "Empate!"
    // Aqui estão as regras do jogo:
    // Pedra ganha de tesoura
    // Papel ganha da pedra
    // Tesoura ganha do papel
    }if(
        (j1 === "pedra" && j2 === "tesoura") ||
        (j1 === "papel" && j2 === "pedra") ||
        (j1 === "tesoura" && j2 === "papel")
    )  { return "Jogador 1 venceu ! 🎆"
    } else // Se nenhuma das condições acima for verdadeira, então o jogador 2 venceu
    return "Jogador 2 venceu ! 🎆"
}

// Função que reinicia o jogo para uma nova rodada
// Apaga as escolhas anteriores e atualiza os textos na tela
function novoJogo(){
    jogada1 = null // zera a escolha do jogador 1
    jogada2 = null // zera a escolha do jogador 2
    textoJ1.textContent = "Jogador 1: escolha" // Mostra essa mensagem orientando o jogador 1
    textoJ2.textContent = "Jogador 2: escolha" // Mostra essa mensagem orientando o jogador 2
    resultado.textContent= "" // Apaga o resultado anterior
}
// Aqui é onde tratamos os cliques nos botões
// No caso, quando alguém clicar em "pedra, papel ou tesoura"
botoes.forEach((botao) => {
    botao.addEventListener("click", () => { // Pegamos uma escolha que está no botão clicado (esse valor está guardado no atributo data-choice lá no html)
        const escolha = botao.getAttribute("data-choice") // Ela vai pegar o valor do atributo data-choice do botão que foi clicado. Esse valor poder ser: pedra, papel ou tesoura

        // Se o jogador 1 ainda não escolheu
        if(jogada1 === null){
            jogada1 = escolha // guarda a escolha
            textoJ1.textContent = "Jogador 1 já escolheu "; // mostra que já escolheu(mas não revela o que)
            resultado.textContent = "Vez do Jogador 2! " // informa que agora é a vez do jogador 2
        }else if(jogada2 === null) {// se o jogador 1 já escolheu,agora é a vez do jogador 2
        jogada2 = escolha // guarda a escolha
        textoJ2.textContent = "Jogador 2 já escolheu ";
        // Agora que os dois jogadores já escolheram, chamamos a função para verificar quem venceu
        const vencedor = verificarVencedor(jogada1,jogada2)
        // mostramos o resultado na tela junto com as jogadas
        resultado.textContent = `${vencedor} (Jogador 1:${jogada1} | Jogador 2:${jogada2})`
        }
        // Se os dois jogadores já jogaram, começamos uma nova rodada automaticamente
        else{
            novoJogo() // Zera tudo para começar de novo
            jogada1 = escolha // o jogador 1 faz sua nova escolha
            textoJ1.textContent = "Jogador 1 já escolheu"
            resultado.textContent = "Vez do jogador 2! "
        }
})
})
// Quando a página é carregada, chamamos a função para começar o jogo "limpo"
novoJogo()
