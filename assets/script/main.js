// - date
// - description
// - icon
// - max temp
// - min temp

// choose between celcius or feranheit

$(document).ready(function() {
  setInterval(clock, 1000);

  function clock() {
    // current time in military format
    $(".clock").text(moment().format("LT"));
  } // display current time

  var apiKey = "9307e3c5c3422ccfbc04aa295f0ba123"; //openweather api key

  // on button click search weather information
  $(".search-bttn").click(() => {
    handleSearch();
  });

  // on enter search weather information
  $(".city-input").on("keyup", event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  });

  $(".nav-city-input").on("keyup", event => {
    if (event.keyCode === 13) {
      handleSearch(true);
    }
  });

  function handleSearch(anotherSearch) {
    var city = $(".city-input").val(); // add value to city

    if (anotherSearch) {
      city = $(".nav-city-input").val();
    }

    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
      city +
      "&appid=" +
      apiKey +
      "";

    $(document).ajaxSend(function() {
      $("#overlay").fadeIn(300);
    }); // when information is requested show loading spinner

    $.ajax({
      url: queryURL,
      method: "GET",
      success: onSuccess,
      error: onError
    }).done(function() {
      setTimeout(function() {
        $("#overlay").fadeOut(300);
      }, 500); // hide loading spinner when information is received
    });
  }

  function onSuccess(object) {
    $(".city").text("");
    $(".nav-city-input").val("");
    $(".forecast").html(""); // remove all previous weather information

    //handle screens
    $(".search-view").hide();
    $(".detailed-view").show();
    $(".nav-city-input").show();

    // informtion from api
    console.log(object);

    // populate screen
    $(".city").text(object.city.name);
    // $(".temperature").text("" + temperature + " Fahrenheit");
    // $(".wind-speed").text("" + windSpeed + " MPH");

    // going through all the weather data
    object.list.forEach((item, index) => {
      var dt = item.dt_txt.split(" ");
      var date = dt[0];
      var time = dt[1];

      // selecting only the weather information at 12 pm
      if (time == "12:00:00") {
        var desc = item.weather[0].description;
        var icon =
          "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png";
        var temp = item.main.temp;
        var humidity = item.main.humidity;

        $(".forecast").append(
          '<div class="day-forecast"><h2>' +
            date +
            '</h2><img src="' +
            icon +
            '" alt="icon" /><p>' +
            desc +
            "</p><p>Temp: " +
            temp +
            "</p><p>Humidity: " +
            humidity +
            "</p></div>"
        );
      }
    });
  }

  function onError() {
    $(".alert").removeClass("fade");
    $(".alert").addClass("show");

    // hide alert afer two seconds
    setTimeout(function() {
      $(".alert").removeClass("show");
      $(".alert").addClass("fade");
    }, 3000);

    setTimeout(function() {
      $("#overlay").fadeOut(300);
    }, 100); // hide loading spinner when information is received
  }
});

// get user current location and call another api to get the weather using the current location

// if else statements that generates a different query url depending on what the user choosed

// if ("geolocation" in navigator){ //check geolocation available
// 	//try to get user current location using getCurrentPosition() method
// 	navigator.geolocation.getCurrentPosition(function(position){
// 			console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
// 		});
// }else{
// 	console.log("Browser doesn't support geolocation!");
// }

// using image api, change backgorund image to the city image
