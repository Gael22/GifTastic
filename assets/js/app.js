var topics = [
	'donald trump',
	'george washington',
	'barack obama',
	'emmanuel macron',
	'queen elisabeth',
	'michele obama ',
	'george bush',
	'francois holland',
	'vladimir putin',
	'christiano ronaldo',
	'lionel messi',
	'zinedine zidane',
	'zlatan ibrahimobic',
	'antony davis',
	'lebron james',
	'micheal jordan',
	'stephen curry',
	'aaron donald',
	'drew brees',
	'khali mack',
];
for (var i = 0; i < topics.length; i++) {
	var button = $('<button>').text(topics[i]);
	button.attr('data-giphy', topics[i]);
	button.addClass('giphy-button');
	$('#button-group').append(button);
}
$('#add-giphy-button').on('click', function (e) {
	e.preventDefault();
	var alreadyExist = false;
	if (topics.indexOf($('#new-giphy-input').val()) !== -1) {
		alreadyExist = true;
	}
	if ($('#new-giphy-input').val() !== '' && alreadyExist === false) {
		var newGiphy = $('#new-giphy-input').val().toLowerCase();
		topics.push(newGiphy);
		var button = $('<button>').text(newGiphy);
		button.attr('data-giphy', newGiphy);
		button.addClass('giphy-button');
		$('#button-group').append(button);
	}
	$('#new-giphy-input').val('');
});
$(document).on('click', '.giphy-button', function () {
	var giphy = $(this).attr('data-giphy');
	var queryURL =
		'https://api.giphy.com/v1/gifs/search?q=' +
		giphy +
		'&api_key=Hilxf47AnAS8TycFU28maivjg2mNR5H8';
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).done(function (response) {
		var results = response.data;
		console.log(results);
		// console.log(results);

		var resultsContainerSection = $("<section class='results-container'>");

		for (var i = 0; i < results.length; i++) {
			var singleResultDiv = $("<div class='result-container'>");

			var rating = results[i].rating;
			var p = $('<p>').text('Rating: ' + rating);
			var giphyImg = $("<img class='result'>");
			giphyImg.attr('src', results[i].images.fixed_height_still.url);
			giphyImg.attr('data-state', 'still');
			giphyImg.attr('data-still', results[i].images.fixed_height_still.url);
			giphyImg.attr('data-animate', results[i].images.fixed_height.url);
			singleResultDiv.prepend(giphyImg);
			singleResultDiv.prepend(p);
			resultsContainerSection.prepend(singleResultDiv);
		}
		$('#giphy-group').prepend(resultsContainerSection);
	});
});
$(document).on('click', '.result', function () {
	var state = $(this).attr('data-state');
	if (state === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');
	}
});
