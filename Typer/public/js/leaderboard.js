function addToLeaderboard() {
    let leaderboard = $(".leaderboard").find("tbody");
    var player = $("#users").val();
    var score = $("#words-counter").text();
    var newRow = createNewRow(player, score);

    newRow.find(".remove-button").click(deleteRow);

    leaderboard.prepend(newRow);

    $(".leaderboard").slideDown(800);
    // Go to score table with animation
    createScrollAnimation();
}

$("#score-button").click(function(event) {
    // Stop is used for stop unfinished animations if a new one was throw
    $(".leaderboard").stop().slideToggle(800);
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

var deleteRow = function() {
    event.preventDefault();
    let row = $(this).parent().parent();
    row.fadeOut(800);
    // Use for execute the delete just after the fade  out element was finished
    setTimeout(function() {
        row.remove();
    }, 1000);
}

function createScrollAnimation() {
    var leaderboardPosition = $(".leaderboard").offset().top;

    $("html, body").animate({
        scrollTop: leaderboardPosition + "px"
    }, 800);
};

var updateLeaderboard = function() {
    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            let row = createNewRow(this.player, this.score);
            row.find(".remove-button").click(deleteRow);
            $("tbody").append(row);
        });
    });
};