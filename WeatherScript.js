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
    document.getElementById("currTemp").innerHTML = "Temperature: ";
    document.getElementById("currHum").innerHTML = "Humidity: ";
    document.getElementById("currDir").innerHTML = "Wind Direction: ";
    document.getElementById("currSpd").innerHTML = "Wind Speed: ";
    document.getElementById("currRain").innerHTML = "Rain: ";
}

/***************************************************************************************************************************************************************************/
//Table Functions

function tableInit(stat) {  //will use stat to decide if we pull form temp, hum, spd, dir, or rain
    updateTable();
}

function updateTable() { //hard coded to show 89 degs
    for (i = 0; i < 24; i++) {
        if (i < 10)
            document.getElementById(i.toString()).innerHTML = "0" + i + ":00 ----- 89";
        else
            document.getElementById(i.toString()).innerHTML = i + ":00 ----- 89";
    }
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