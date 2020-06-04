var initialTime = $("#time-counter").text();
var typingArea = $(".typing-area");


$(function() {
    updatePhraseWordsNumber();
    startCounters();
    startChronometer();
    startMarkers();
    updateLeaderboard();
    $("#restart-button").click(restartGame);
});

function updatePhraseWordsNumber() {
    var phrase = $(".phrase").text();
    var phraseWords = phrase.split(" ").length;
    $("#phrase-words").text(phraseWords);
};

function startCounters() {
    typingArea.on("input", function() {
        let content = typingArea.val();
        var contentLength = content.length;
        var numberOfWords = content.split(/\S+/).length - 1;

        $("#caracteres-counter").text(contentLength);
        $("#words-counter").text(numberOfWords);
    });
};

function startChronometer() {
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

function startMarkers() {
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

function endGame() {
    typingArea.removeClass("green-border");
    typingArea.removeClass("red-border");
    addToLeaderboard();
};

var restartGame = function() {
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

var updateTimeLeft = function(time) {
    initialTime = time;
    $("#time-counter").text(initialTime);
};