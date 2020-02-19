// information to display
// date
// temperature
// wind speed

$(document).ready(function() {
  var apiKey = "9307e3c5c3422ccfbc04aa295f0ba123"; //openweather api key

  var city = "";

  // on search button click ...
  $(".search-bttn").click(() => {
    var userInput = $(".city-input").val();

    // if user typed in the city ...
    if (userInput) {
      city = userInput; // pass the user input to city

      //handle screens
      $(".alert").hide();
      $(".search-view").hide();
      $(".detailed-view").show();

      // get information from api using user input
      var queryURL =
        "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
        city +
        "&appid=" +
        apiKey +
        "";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(object => {
        var temperature = object.main.temp;
        var windSpeed = object.wind.speed;
        console.log(object);

        $(".city").text(city);
        $(".temperature").text("" + temperature + " Fahrenheit");
        $(".wind-speed").text("" + windSpeed + " MPH");
      });
    } else {
      $(".alert").show();
    }
  });
});
