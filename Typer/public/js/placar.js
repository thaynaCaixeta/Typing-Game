function adicionaAoPlacar() {
    var tabelaPlacar = $(".placar").find("tbody");
    var jogador = "Thayná"
    var pontuacao = $("#contador-palavras").text();
    var novaLinha = criaNovaLinha(jogador, pontuacao);

    novaLinha.find(".botao-remover").click(removerLinha);

    tabelaPlacar.prepend(novaLinha);

}

function criaNovaLinha(jogador, pontuacao) {
    let linha = $("<tr>");

    let colunaJogador = $("<td>").text(jogador);
    let colunaPontuacao = $("<td>").text(pontuacao);

    let colunaRemover = $("<td>");
    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("small material-icons").text("delete");

    linha.append(colunaJogador);
    linha.append(colunaPontuacao);
    linha.append(colunaRemover.append(link.append(icone)));

    return linha;
}

function removerLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}