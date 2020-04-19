$(document).ready(function(){

    $("#find-city").click(function(){

        var city = $("#chosen-city").val();
        var lat = $().val();
        var lon = $().val();

        if(city != ""){

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=0b53b2f717e335a70f4410190b051982",
                type: "GET",
                dataType: "jsonp",
                uvData: "http://api.openweathermap.org/data/2.5/uvi?" + "&APPID=0b53b2f717e335a70f4410190b051982" + lat + lon,
                success: function(response){
                    console.log(response);

                    var display = displayWeatherInfo(response);

                    $("#current-day").html(display)

                }
            })

        }else{
            $("#error").html("Field cannot be blank");
        }
    })

function displayWeatherInfo(response) {
    var cityName = $("<h3>").text(response.name);
    var cityIcon = $("<h3>").append(response.weather.icon)
    var cityTemp = $("<h3>").text("Temperature (F): " + response.main.temp);
    var cityHumidity = $("<h3>").text("Humidity: " + response.main.humidity);
    var cityWindSpeed = $("<h3>").text("Wind Speed: " + response.wind.speed);
    var cityUvIndex = $("<h3>").text("UV Index: " + response.uvData)

    $("#current-weather-section").append(cityName, cityIcon, cityTemp, cityHumidity, cityWindSpeed, cityUvIndex);

}    

//    $("#currentDay");moment().format('dddd-MMMM-Do');{
//        const today = moment();
//        console.log(today.format('dddd-MMMM-Do'));
//        $("#currentDay").text(today);
//        }


//}
//$("find-city").on("click", function(event) {
//    event.preventDefault();
//    var cityInput = $("#city-input").val().trim();

//    displayWeatherInfo(cityInput);
// }


// For Loop to create Five Day Forecast.
//var forecastDiv = $("<div>");

//    for (var i = 0; i < 5; i++) {

//    forecastDiv.addClass("forecast");

//    $("#forecast-section").append(forecastDiv);

//}
})
