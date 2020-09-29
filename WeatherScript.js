var s = document.createElement("script");
s.src = "jquery-3.5.1.min.js";
//s.onload = function (e) { window.alert("jquery loaded") };
document.head.appendChild(s);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const icons = ['day_clear.png', 'day_cloudy.png', 'day_rainy.png', 'day_thunder.png', 'day_windy.png', 'night_clear.png', 'night_cloudy.png', 'night_rainy.png', 'night_thunder.png', 'night_windy.png', 'snowy.png'];
const dayTime = ['morning', 'afternoon', 'evening'];
const condition = ['Clear', 'Cloudy', 'Rainy', 'Stormy', 'Windy', 'Snowy'];

/*****************************************************************************************************************************************************/

function currInit() {
    updateDay();
    updateTime();
    updateIcon();
    updateCondition();
    updateStats();
    /*var dayInterv = */setInterval(updateDay, 1000 * 60 * 60);
    /*var timeInterv = */setInterval(updateTime, 1000);
    /*var iconInterv = */setInterval(updateIcon, 1000 * 60 * 60); //needs to pass in variable with current weather
    /*var condInterv = */setInterval(updateCondition, 1000 * 60 * 60);
    /*var statsInterv = */setInterval(updateStats, 1000 * 60 * 60); //needs to pass in weather stats
}

function updateDay() {
    var dt = new Date();
    var day = dt.getDay();
    document.getElementById("currDay").innerHTML = days[day] + " " + dt.toLocaleDateString();
}

function updateTime() {
    var dt = new Date();
    document.getElementById("currTime").innerHTML = dt.toLocaleTimeString();
}

function updateIcon() {
    document.getElementById("currIcon").src = "/icons/" + icons[0];
}

function updateCondition() {
    document.getElementById("currCond").innerHTML = condition[0] + " " + dayTime[0];
}

function updateStats() {
    getTemperatureDataForStats();
    getWindDataForStats();
    document.getElementById("currTemp").innerHTML = "Temperature: " ;
    
    document.getElementById("currHum").innerHTML = "Humidity: ";
    
    document.getElementById("currDir").innerHTML = "Wind Direction: ";
    document.getElementById("currSpd").innerHTML = "Wind Speed: ";
    document.getElementById("currRain").innerHTML = "Rain: ";
}

/***************************************************************************************************************************************************************************/

// gets temp data from api for tables
function getTemperatureDataForTables() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {

            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
        },
        url: "https://weatherstationapi.azurewebsites.net/api/TemperatureSensor/GetData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
            $("#DIV").html('');
            var DIV = '';
            $.each(data, function (i, item) {
                var rows = "<tr>" +
                    "<td id='Temperature'>" + item.temperature + "</td>" +
                    "<td id='Humidity'>" + item.humidity + "</td>" +

                    "<td id='Time Captured'>" + Date(item.dateCaptured,
                        "dd-MM-yyyy") + "</td>" +
                    "</tr>";
                $('#TemperatureTable').append(rows);
            }); //End of foreach Loop
            console.log(data);
        }, //End of AJAX Success function

        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}
    // retrieves temp and humidity from api for the Current Weather Stats
    function getTemperatureDataForStats() {

        $.ajax({
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
            },
            url: "https://weatherstationapi.azurewebsites.net/api/TemperatureSensor/GetData",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, temp) {
                    document.getElementById("currTemp").innerHTML = "Temperature: " + temp.temperature;
                    document.getElementById("currHum").innerHTML = "Humidity: " + temp.humidity;

                })
            }

        })

    }

    function getWindDataForStats() {
        $.ajax({
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
            },
            url: "https://weatherstationapi.azurewebsites.net/api/WindData/GetAllData",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, wind) {
                    document.getElementById("currDir").innerHTML = "Wind Direction: " + wind.windDirection;
                    document.getElementById("currSpd").innerHTML = "Wind Speed: " + wind.windSpeed_MPH + " MPH";

                })
            }

        });
    }

function getWindDataForTables() {
    $.ajax({
        type: "GET",
        beforeSend: function (xhr) {

            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
        },
        url: "https://weatherstationapi.azurewebsites.net/api/WindData/GetAllData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
            $("#DIV").html('');
            var DIV = '';
            $.each(data, function (i, item) {
                var rows = "<tr>" +
                    "<td id='WindSpeed_Knots'>" + item.windSpeed_Knots + "</td>" +
                    "<td id='WindSpeed_MPH'>" + item.windSpeed_MPH + "</td>" +
                    "<td id= 'WindDirection'>" + item.windDirection + "</td>"+
                    "<td id='Time Captured'>" + Date(item.dateCaptured,
                        "dd-MM-yyyy") + "</td>" +
                    "</tr>";
                $('#WindTable').append(rows);
            }); //End of foreach Loop
            console.log(data);
        }, //End of AJAX Success function

        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function
    });
}

    /***************************************************************************************************************************************************************************/

    function dropDown(itemNum) {
        var dropdowns = document.getElementsByClassName("dropDownContent");
        var dropbtns = document.getElementsByClassName("dropbtn");
        for (i = 0; i < dropdowns.length; i++) {
            if (i != itemNum)
                dropdowns[i].classList.remove('show');
            else
                document.getElementById(dropdowns[itemNum].id).classList.toggle("show");
        }
        for (i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show'))
                $(dropbtns[i]).css("background-color", "#2f5477");
            else
                $(dropbtns[i]).css("background-color", "#00162b");
        }
    }

