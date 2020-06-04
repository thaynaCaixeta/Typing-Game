// Get a phrases set from server
$("#phrases-button").click(function() {
    $("#spinner").show();

    // Do an asynchronous request to bring the phrase list from the local server endpoint
    $.get("http://localhost:3000/frases", function(data) {
        let randomPhraseIndex = Math.floor(Math.random() * data.length);
        $(".phrase").text(data[randomPhraseIndex].texto);
        updatePhraseWordsNumber();
        let time = data[randomPhraseIndex].tempo
        updateTimeLeft(time);

    }).fail(function() {
        swal("Request Failed", "Please try again", "error");

    }).always(function() {
        $("#spinner").toggle();
    });
});

// Find phrase in the server with the id
$("#phrase-id-button").click(function() {
    $("#spinner").toggle();
    $("#phrase-id").attr("disabled", false);
    let phraseId = $("#phrase-id").val();
    let data = {
        id: phraseId
    };

    $.get("http://localhost:3000/frases", data, function(data) {
        $(".phrase").text(data.texto);
        let time = data.tempo
        updateTimeLeft(time);
        restartGame();

    }).fail(function() {
        swal("Request Failed", "Please try again", "error");

    }).always(function() {
        $("#spinner").toggle();
    });

});

// Syncronize leaderboard with server
$("#sync-button").click(function() {
    $("#spinner").toggle();
    let leaderboard = [];
    // Find the tbody direct childrens
    let leaderboardRows = $("tbody>tr");
    leaderboardRows.each(function() {
        let player = $(this).find("td:nth-child(1)").text();
        let score = $(this).find("td:nth-child(2)").text();

        let row = {
            player: player,
            score: score
        };

        leaderboard.push(row);
    });

    let data = {
        placar: leaderboard
    };

    $.post("http://localhost:3000/placar", data, function() {
        setTimeout(function() {
            swal("Request Complete", "Your has been saved with sucess");
        }, 900);
    }).fail(function() {
        swal("Sync Failed", "Please try again", "error");
    }).always(function() {
        setTimeout(function() {
            $("#spinner").toggle();
        }, 800);
    });
});