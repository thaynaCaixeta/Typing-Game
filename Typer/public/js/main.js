var initialTime = $("#time-counter").text();
var typingArea = $(".typing-area");


$(function() {
    updatePhraseWordsNumber();
    startCounters();
    startChronometer();
    startMarkers();
    updateLeaderboard();
    initiSelectize();
    $("#restart-button").click(restartGame);


});

const updatePhraseWordsNumber = function() {
    var phrase = $(".phrase").text();
    var phraseWords = phrase.split(" ").length;
    $("#phrase-words").text(phraseWords);
};

const startCounters = function() {
    typingArea.on("input", function() {
        let content = typingArea.val();
        var contentLength = content.length;
        var numberOfWords = content.split(/\S+/).length - 1;

        $("#caracteres-counter").text(contentLength);
        $("#words-counter").text(numberOfWords);
    });
};

const startChronometer = function() {
    typingArea.one("focus", function() {
        let timeLeft = initialTime;
        $("#restart-button").attr("disabled", true);
        let chronometerId = setInterval(function() {
            timeLeft--;
            $("#time-counter").text(timeLeft);
            if (timeLeft < 1) {
                typingArea.attr("disabled", true);
                $("#botao-reiniciar").attr("disabled", false);
                clearInterval(chronometerId);
                typingArea.toggleClass("disabled-field");
                endGame();
            }
        }, 1000);
    });
};

const startMarkers = function() {
    typingArea.on("input", function() {
        let phrase = $(".phrase").text();
        var typed = typingArea.val();
        var comparable = phrase.substr(0, typed.length);

        if (typed == comparable) {
            typingArea.addClass("green-border");
            typingArea.removeClass("red-border");
        } else {
            typingArea.addClass("red-border");
            typingArea.removeClass("green-border");
        }
    });
};

const endGame = function() {
    typingArea.removeClass("green-border");
    typingArea.removeClass("red-border");
    addToLeaderboard();
};

const restartGame = function() {
    let typingArea = $(".typing-area")
    typingArea.attr("disabled", false);
    typingArea.val("");

    $("#words-counter").text("0");
    $("#caracteres-counter").text("0");
    $("#time-counter").text(initialTime);

    startChronometer();

    typingArea.toggleClass("disabled-field");
    typingArea.removeClass("green-border");
    typingArea.removeClass("red-border");
}

const updateTimeLeft = function(time) {
    initialTime = time;
    $("#time-counter").text(initialTime);
};

const initiSelectize = function() {
    $("#users").selectize({
        create: true,
        sortField: 'text'
    });
};