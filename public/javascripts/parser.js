window.onload = function() {
	var parsed_array = [];
	$("#field").keyup(function(e) {
		if (e.keyCode == 13) {
			// console.log("you pushed enter!");
			request_recipes(parsed_array);
		} else {
			parsed_array = this.value.split(/[,;]/);
			var ingredients_list = display_list(parsed_array);
			$("#ingredients").html(ingredients_list);
		}
	});
}

function display_list(array) {
//this function takes an array and returns an HTML string where each item in the array is a list item in an unlisted list
	if (array.length > 0) {
		var html = "<ul>";
		for (var i = 0; i < array.length; i++) {
			html += "<li>" + array[i].trim() + "</li>";
		}
		html += "</ul>";
		// console.log(html);
		return html;
	}
}

function request_recipes(array) {
	var query = array.map(function(obj) {
		return obj.trim();
	});

	query = query.join();

	var params = {search: query};
	// console.log(params);

	$.get('/searching', params, function(data) {
		$('#results').html(data);
	});
}