$(document).ready(function() {
  var apiKey = "9307e3c5c3422ccfbc04aa295f0ba123"; //openweather api key

  var city = "";

  // on search button click search weather information
  $(".search-bttn").click(() => {
    handleSearch();
  });

  // on enter search weather information
  $(".city-input").on("keyup", event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  });

  function handleSearch() {
    city = $(".city-input").val(); // add value to city

    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
      city +
      "&appid=" +
      apiKey +
      "";

    $.ajax({
      url: queryURL,
      method: "GET",
      success: onSuccess,
      error: function() {
        $(".alert").removeClass("fade");
        $(".alert").addClass("show");

        // hide alert afer two seconds
        setTimeout(function() {
          $(".alert").removeClass("show");
          $(".alert").addClass("fade");
        }, 1500);
      }
    });
  }

  function onSuccess(object) {
    //handle screens
    $(".alert").hide();
    $(".search-view").hide();
    $(".detailed-view").show();

    // informtion from api
    console.log(object);

    // populate screen
    // $(".city").text(city);
    // $(".temperature").text("" + temperature + " Fahrenheit");
    // $(".wind-speed").text("" + windSpeed + " MPH");
  }

  function onError() {}
});
