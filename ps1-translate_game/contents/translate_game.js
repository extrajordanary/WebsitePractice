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
	$("button").click(function() {
		newQuestion();
	});

});

function updateWordArrays() {
	// create arrays for the selected language dictionaries
	target_words = $.map(current_dict, function (value, key) { return value; });
	answer_words = $.map(current_dict, function (value, key) { return key; });
	return 1; 
}

function updateWordPair() {
	// get random target-answer pairs
    var randomNumber = [Math.floor(Math.random() * answer_words.length)];
	target_word = target_words[randomNumber];
	answer_word = answer_words[randomNumber];
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

	$("#target-word").html(target_word);

	resetInput();
}


