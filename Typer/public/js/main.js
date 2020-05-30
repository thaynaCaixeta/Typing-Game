var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    iniciarContadores();
    iniciarCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciarJogo);
})

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var palavrasFrase = frase.split(" ").length;
    $("#numPalavras").text(palavrasFrase);
}

function iniciarContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
        var tamConteudo = conteudo.length;
        var qtdPalavras = conteudo.split(/\s+/, '').length;
        $("#contador-caracteres").text(tamConteudo);
        $("#contador-palavras").text(qtdPalavras);
    });
}

function iniciarCronometro() {
    var tempoRestante = tempoInicial;
    campo.one("focus", function() {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function() {
            tempoRestante--;
            $("#tempo").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                $("#botao-reiniciar").attr("disabled", false);
                clearInterval(cronometroId);
                campo.toggleClass("campo-desativado");
                finalizarJogo();
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    })
}

function adicionaAoPlacar() {
    var tabelaPlacar = $(".score-table").find("tbody");
    var jogador = "Thayná"
    var pontuacao = $("#contador-palavras").text();
    var novaLinha = criaNovaLinha(jogador, pontuacao);

    novaLinha.find(".remove-button").click(removerLinha);

    tabelaPlacar.prepend(novaLinha);

}

function criaNovaLinha(jogador, pontuacao) {
    let linha = $("<tr>");

    let colunaJogador = $("<td>").text(jogador);
    let colunaPontuacao = $("<td>").text(pontuacao);

    let colunaRemover = $("<td>");
    let link = $("<a>").addClass("remove-button").attr("href", "#");
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

function reiniciarJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo").text(tempoInicial);
    iniciarCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

}

function finalizarJogo() {
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
    adicionaAoPlacar();
}