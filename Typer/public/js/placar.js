function adicionaAoPlacar() {
    var tabelaPlacar = $(".score-table").find("tbody");
    var jogador = "Thayná"
    var pontuacao = $("#contador-palavras").text();
    var newRow = createNewRow(jogador, pontuacao);

    newRow.find(".remove-button").click(function() {
        event.preventDefault();
        let row = $(this).parent().parent();
        row.fadeOut(800);
        // Use for execute the delete just after the fade  out element was finished
        setTimeout(function() {
            row.remove();
        }, 1000);
    });

    tabelaPlacar.prepend(newRow);

    $(".score-table").slideDown(800);
    // Go to score table with animation
    createScrollAnimation();
}

$("#score-button").click(function(event) {
    // Stop is used for stop unfinished animations if a new one was throw
    $(".score-table").stop().slideToggle(800);
});

var createNewRow = function(player, score) {

    let row = $("<tr>");
    let playerColumn = $("<td>").text(player);
    let scoreColumn = $("<td>").text(score);

    let deleteColumn = $("<td>");
    let link = $("<a>").addClass("remove-button").attr("href", "#");
    let icon = $("<i>").addClass("small material-icons").text("delete");

    row.append(playerColumn);
    row.append(scoreColumn);
    row.append(deleteColumn.append(link.append(icon)));

    return row;
};

function createScrollAnimation() {
    var scoreTablePosition = $(".score-table").offset().top;

    $("html, body").animate({
        scrollTop: scoreTablePosition + "px"
    }, 800);
};