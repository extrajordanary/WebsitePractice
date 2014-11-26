var lang_to		= "English";
var lang_from		= "Spanish";
var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
var target_words, answer_words, target_word, answer_word;

// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	// Display the selected languages
	$(".from-lang").html(lang_from);
	$(".to-lang").html(lang_to);

	updateWordArrays();
	newQuestion();

	// clear input, refocus, change target when clicked
	$("button").on("click", scoreAnswer);
	$("#text-field").on("submit", function() {
		selectionMade();
		return false;
	});
});

function updateWordArrays() {
	// create arrays for the selected language dictionaries
	target_words = $.map(current_dict, function (value, key) { return value; });
	answer_words = $.map(current_dict, function (value, key) { return key; });

	// update autocomplete to make sure it uses the right options
	updateAutocomplete();
}

function updateWordPair() {
	// get random target-answer pairs
    var randomNumber = [Math.floor(Math.random() * answer_words.length)];
	target_word = target_words[randomNumber];
	answer_word = answer_words[randomNumber];
}

function updateAutocomplete() {
	$("#autocomplete").autocomplete({
	  source: answer_words,
	  minLength: 2,
	  select: selectionMade
	});
}

// works from hitting enter but not from autocomplete selection
function selectionMade() {
	$("#autocomplete").autocomplete("close");
	scoreAnswer();
}

function resetInput() {
	var input = $("input");
	// clear the field
	input.val("");
	// set the focus on the input
	input.focus();
}

function newQuestion() {
	updateWordPair();

	$("#target-word").html("<p>"+target_word+"</p>");

	resetInput();
}

function scoreAnswer() {
	// correct or not?
	var playerAnswer = $("input").val();
	var correctness;
	if (playerAnswer === answer_word) {
		correctness = "correct-answer";
	} else {
		correctness = "wrong-answer";
	};

	// create new row to insert
	var p1 = $("<p>")
		.attr("class", correctness)
		.html("<p>"+target_word+"</p>");
	var col1 = $("<div>")
		.attr("class", "leftcol");
	col1.append(p1);

	var p2 = $("<p>")
		.attr("class", correctness)
		.html("<p>"+playerAnswer+"</p>");
	var col2 = $("<div>")
		.attr("class", "middlecol");
	col2.append(p2);

	var p3 = $("<p>")
		.attr("class", correctness)
		.html("<p>"+answer_word+"</p>");
	if (correctness === "correct-answer") {
		p3.attr("class", "checkmark");
		p3.html("<p>&#x2713;</p>");
	};
	var col3 = $("<div>")
		.attr("class", "rightcol");
	col3.append(p3);

	var newRow = $("<div></div>");

	newRow.attr("class", "game-row results");
	newRow.append(col1);
	newRow.append(col2);
	newRow.append(col3);

	// insert new row at the top of results list
    newRow.insertAfter("#answer");

	newQuestion();
}



