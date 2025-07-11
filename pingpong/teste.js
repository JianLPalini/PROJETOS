// Seleciona o canvas da página onde o jogo vai acontecer
const canvas = document.getElementById('game')

// Pega o contexto 2D do canvas para desenhar as nossas formas, imagens e tudo o que vossa criativade precisar
const ctx = canvas.getContext('2d')

// Seleciona o elemento html que vai mostrar a pontuação do jogador
const scoreDisplay = document.getElementById('score')

// Objeto que representa a raquete que o jogador controla
const raquete = {
    x: 10,      // Posição horizontal da raquete ( ela fica fixa perto do lado esquerdo)
    y: canvas.height / 2 - 40,  // Posição vertical inicial (centralizada na tela)
    largura: 10,   // Largura da raquete
    altura: 80,    // Altura da nossa raquete
    velocidade: 5  // Velocidade com que a raquete se move para cima e para baixo
}
// Obejeto que representa a bola do jogo

const bola = {
    x: canvas.width / 2, // Posição horizontal inicial (no meio do canvas)
    y: canvas.height / 2,  // na vertical tmbm
    raio: 10,            // Tamanho da bola (raio do círculo)
    dx: 4,          // Velocidade e direção horizontal da bola (tmbm 4 pixels por frame)
    dy: 4,          // Velocidade e direção vertical da bola (tmbm 4 pixels por frame)
}
// Variável que guarda a pontuação do jogador (começa com 0 )
let pontuação = 0
// variável para saber se o jogo acabou (inicialmente falso)
let jogoAcabou = false
// Objeto que vai guardar se as teclas de seta para cima e para baixo estão sendo pressionadas
const teclas = {
    ArrowUp: false, // vai ser true quando a seta para cima estiver pressionada
    ArrowDown: false // tmbm true quando a tecla para baixo estiver pressionada
}
// Adicionamos um "ouvinte" para quando um tecla
document.addEventListener('keydown', (evento) => {
    if(evento.key === 'ArrowUp') teclas.ArrowUp = true // Marca que a seta para cima está pressionada
    if(evento.key === 'ArrowDown') teclas.ArrowDown = true // Marca que a seta para baixo está pressionada

})
// Adiciona um "ouvinte" para quando a tecla for solta
document.addEventListener('keyup', (evento) => {
    if(evento.key === 'ArrowUp') teclas.ArrowUp = false // Marca que a seta para cima for solta
    if(evento.key === 'ArrowDown') teclas.ArrowDown = false // Marca que a seta para baixo for solta
})
// Função que atualiza a lógica do jogo em cada frame
function atualizar(){
    if(jogoAcabou) return   // se o jogo acabou, para a atualização
    // Move a raquete para cima se a tecla seta para cima estiver pressionada
    if(teclas.ArrowUp) raquete.y -= raquete.velocidade
    // Move a raquete para baixo se a tecla seta para baixo estiver pressionada
    if(teclas.ArrowDown) raquete.y += raquete.velocidade
    // Impede que a raquete ultrapasse o limite superior da tela
    if(raquete.y < 0) raquete.y = 0
    // Impede que a raquete ultrapasse o limite inferior da tela
    if(raquete.y + raquete.altura > canvas.height){
        raquete.y = canvas.height - raquete.altura
    }
    // Atualiza a posição horizontal da bola e somando a velocidade dx
    bola.x += bola.dx
    // Fazemos isso para a posição vertical tmbm
    bola.y += bola.dy
    // verifica se a bola bateu no topo da tela
    if(bola.y - bola.raio < 0){
        bola.dy *= -1 // Inverte a direção vertical da bola para baixo
    }
    // verifica se a bola bateu na parte inferior da tela
    if(bola.y + bola.raio > canvas.height){
        bola.dy *= -1 // Inverte a direção vertical da bola para cima
    }
    // Verica se a bola está colidindo com a raquete
    if(bola.x - bola.raio < raquete.x + raquete.largura &&  // a bola chegou na largura da raquete
        bola.y > raquete.y &&   // a bola está abaixo do topo da raquete
        bola.y < raquete.y + raquete.altura // a bola está acima da base da raquete
    ){
        bola.dx *= -1 // inverte a direção horizontal da bola (rebate para a direita)
        pontuação++ // incrementa a pontuação do jogador
        scoreDisplay.textContent = pontuação // atualiza a pontuação na tela
    }
    // verifica se a bola saiu pela esquerda da tela (perdeu cara)
    if(bola.x - bola.raio < 0){
        jogoAcabou = true // marca que o jogo terminou
        // Espera um pouquinho antes de mostrar o alerta para o jogador
        setTimeout(() => {
            alert('Fim de jogo! Perdeu cara ❌. Sua pontuação é: ' + pontuação)
            document.location.reload()  // recarrega a página ára reiniciar o jogo
        }, 100)
    }
    // verifica se a bola bateu na parede direita da tela
    if(bola.x + bola.raio > canvas.width){
        bola.dx *= -1 // inverte a direção horizontal da bola (rebate para esquerda)
    }
}

// função que desenha todos os elementos na tela
function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height) // limpa a tela para desenhar o próximo frame
    // desenha a raquete (retângulo)
    ctx.fillStyle = 'black' // defini a cor do preenchimento
    ctx.fillRect(raquete.x, raquete.y, raquete.largura, raquete.altura)
    // desenhando a bola
    ctx.beginPath()
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
}
// função que roda o loop do jogo,
function loopDoJogo(){
    atualizar() // atualiza a lógica do jogo
    desenhar() // desenha os elementos na tela
    // continua o loop enquanto o jogo não acabou
    if(!jogoAcabou){
        requestAnimationFrame(loopDoJogo) // chama o loop novamente no próximo frame
    }
}
loopDoJogo() // começa o jogo chamando o loop pela primeira vez