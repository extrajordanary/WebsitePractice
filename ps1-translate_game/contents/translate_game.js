// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	


	// Your code here
	$(".from-lang").html(lang_from);
	$(".to-lang").html(lang_to);

	var target_word = "fzzzzt";
	var answer_word = "fart";

	var target_words = $.map(current_dict, function (value, key) { return value; });
	var answer_words = $.map(current_dict, function (value, key) { return key; });

    var randomNumber = [Math.floor(Math.random() * answer_words.length)];

	target_word = target_words[randomNumber];
	answer_word = answer_words[randomNumber];

	$("#target-word").html(target_word);

    });


