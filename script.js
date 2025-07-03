
function soft() {
    let pergunta = prompt("Como você reage a feedbacks negativos e o que costuma fazer para melhorar seu desempenho a partir deles ? ")
    document.getElementById("pergunta").innerHTML = `Sua resposta é: ${pergunta}. Está certo? Obrigado por participar.`
}

function hard() {
    let pergunta2 = prompt("Quais ferramentas ou linguagens de programação você domina, e como já as utilizou em um projeto ?")
    document.getElementById("resposta").innerHTML = `Sua resposta é: ${pergunta2}. Está certo? Obrigado por participar.`
}
