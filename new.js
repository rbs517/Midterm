var app = {
	eventFulURL: "https://api.eventful.com/json/events/search?...&date=Today&location=",
	//newCurrentWord: "San+Diego",
	eventFulKey:"&app_key=wtSp78kNzVMKXdjz",
	weatherTodayURL: "http://api.openweathermap.org/data/2.5/weather?&units=imperial&q=",
	//newCurrentWord: "San+Diego"
	weatherTodayKey: "&appid=baaf8716bc5df0fcba6db4837c05f3a8",

	initialize: function() {
		$("#title").hide();
		$("#search").click(function() {
  		console.log("Clicked search");
  		//clear the div
  		$("#resultsTarget").html("");
  		//Use jQuery to get the value of the 'query' input box
		var newCurrentWord = $("#query").val();
		$("#title h1").html($("#title h1").html() + " " + newCurrentWord);
		  //Execute the API call function with the currentWord var as the argument
		app.searchEventFul(newCurrentWord);
      	app.searchWeatherToday(newCurrentWord);
	  });
	},	
	searchEventFul: function(word){
		console.log("Executing the function");	
		$.ajax({
			url: app.eventFulURL + word + app.eventFulKey, //word is the argument passed into the function
			type: 'GET',
			dataType: 'jsonp',
			error: function(data){
				console.log("We got problems");
			},
			success: function(data){
        console.log(data);
				console.log("WooHoo!");
				//Use jQuery to insert the search term into the appropriate DOM element
				//$("#searchTerm").html(data[0]);
		    //var title= '<div id="title">';
        title +=	$('#title').show();
        title += 	'</div>';
	
				for (var i = 0; i < 10; i++) {	
					var searchResults1 = (data.events.event[i].title); 
					var searchResults2 = (data.events.event[i].start_time); 
					var searchResults3 = (data.events.event[i].venue_name);
					var searchResults4 = (data.events.event[i].url);				

          var htmlString= '<div class="Results">';
          htmlString +=	'<h2>' + searchResults1 + '</h2>';
          htmlString +=	'<div id="start_time"><span>' + searchResults2 + '</span></div>';
          htmlString +=	'<p><span>' + searchResults3 + '</span></p>';
          htmlString +=	'<p>' + searchResults4 + '</p>';
          htmlString += '</div>';
          $('#resultsTarget').append(htmlString);
          $(".go-away").hide();
        }
      }
    });					
  },
	searchWeatherToday: function(word){
		console.log("Executing the function");	
		$.ajax({
			url: app.weatherTodayURL + word + app.weatherTodayKey, //word is the argument passed into the function
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("We got problems");
			},
			success: function(data){
				console.log("WooHoo!");
				//Use jQuery to insert the search term into the appropriate DOM element
				//$("#searchTerm").html(data[0]);

        var weatherResults1 = (data.main.temp);

        var htmlString1 = '<div class= "Results2">';	
        htmlString1 += '<p><span>' + "Weather Today:" + "  " + weatherResults1 + "°F" + '</span></p>';

           if (weatherResults1 < 65){
        		document.getElementById('weather').innerHTML = "Don't forget a jacket!";
        	
      	 } else {
       			document.getElementById('weather').innerHTML = "Don't forget sunscreen!";
       };


        $('#resultsTarget').append(htmlString1);
      		}
		});
	}		
};		

//Code to be executed once the page has fully loaded
$(document).ready(function(){
	console.log("LOADED!!!!");
	app.initialize();

});
