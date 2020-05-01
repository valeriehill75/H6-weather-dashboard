$(document).ready(function () {
  $("#currentDay");
  moment().format("MMM-DO-YY");
  {
    const today = moment();
    console.log(today.format("MMM-Do-YY"));
  }

  $("#find-city").click(function () {
    var city = $("#chosen-city").val();
    var lat = $().val();
    var lon = $().val();

    if (city != "") {
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial" +
          "&APPID=0b53b2f717e335a70f4410190b051982",
        type: "GET",
        dataType: "jsonp",
        uvData:
          "http://api.openweathermap.org/data/2.5/uvi?" +
          "&APPID=0b53b2f717e335a70f4410190b051982" +
          lat +
          lon,
        forecastData:
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=imperial" +
          "&APPID=0b53b2f717e335a70f4410190b051982",
        success: function (response) {
          console.log(response);

          var display = displayWeatherInfo(response);

          $("#current-day").html(display);
          $("#current-day").val("");
        },
      });
    } else {
      $("#error").html("Field cannot be blank");
    }
    var fiveDays = ["dayOne", "dayTwo", "dayThree", "dayFour", "dayFive"];

    for (var i = 0; i < 5; i++) {
      var forecastDiv = $("<div>");

      forecastDiv.addClass(fiveDays[i]);
      forecastDiv.attr("days", fiveDays[i])

      $("#forecast-section").append(forecastDiv);
    }

    function displayWeatherInfo(response) {
      var cityName = $("<h3>").text(response.name);
      const today = moment();
      var todayDate = $("<h3>").text(response.dt)
      var cityIcon = $(
        "<img src='https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          ".png'>"
      ).text(response.weather[0].icon);
      var cityTemp = $("<h3>").text("Temperature (F): " + response.main.temp);
      var cityHumidity = $("<h3>").text("Humidity: " + response.main.humidity);
      var cityWindSpeed = $("<h3>").text("Wind Speed: " + response.wind.speed);
      var cityUvIndex = $("<h3>").text("UV Index: " + response.uvData);

      $("#current-day").append(
        cityName,
        today,
        todayDate,
        cityIcon,
        cityTemp,
        cityHumidity,
        cityWindSpeed,
        cityUvIndex
      );

      var futureDates = $("<h3>").text(response.list.dt_txt);
      var futureIcon = $(
        "<img src='https://openweathermap.org/img/wn/" +
          response.list.weather[0].icon +
          ".png'>"
      ).text(response.list.weather[0].icon);
      var futureTemp = $("<h3>").text("Temp (F): " + response.list.main.temp);
      var futureHumidity = $("<h3>").text("Humidity: " + response.list.main.humidity);

      $("days").append(
        futureDates,
        futureIcon,
        futureTemp,
        futureHumidity,
      );

    }

  });
});
