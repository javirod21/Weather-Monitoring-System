var s = document.createElement("script");
s.src = "jquery-3.5.1.min.js";
//s.onload = function (e) { window.alert("jquery loaded") };
document.head.appendChild(s);

function drawLineChartTemp() {

    // Add a helper to format timestamp data
    Date.prototype.formatMMDDYYYY = function () {
        return (this.getMonth() + 1) +
            "-" + this.getDate() +
            "-" + this.getFullYear() +
            " " + this.getHours() +
            ":" + this.getMinutes();
    }

    var jsonData = $.ajax({
        beforeSend: function (xhr) {

            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
        },
        url: 'https://weatherstationapi.azurewebsites.net/api/TemperatureSensor/GetData',
        dataType: 'json',
    }).done(function (results) {

        // Split timestamp and data into separate arrays
        var labels = [], data = [],humdata = [];
        results.forEach(function (packet) {
            labels.push(new Date(packet.timeCaptured).formatMMDDYYYY());
            data.push(parseFloat(packet.temperature));
            humdata.push(parseFloat(packet.humidity * 100));
        });

        // Create the chart.js data structure using 'labels' and 'data'
        var tempData = {
            labels: labels,
            datasets: [{
                label: "Temperature",
                fill:false,
                
                
               
                data: data
            },
                {
                    label: "Humidity",
                    fill:false,
                    
                    data: humdata


                }]
        };

        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myChart").getContext("2d");
        

        // Instantiate a new chart
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: tempData,
            options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black'
                    }
                    
                },
                
                scales: {
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            fontColor:'black'
                        }
                    }],
                    
                    scaleLabel: {
                        fontColor:'black'
                    }
                        
                },
                plugins: {
                    colorschemes: {
                        scheme: 'brewer.SetOne4'
                    }
                }
            }
        });
     
    });



    
}

function drawLineChartWind() {

    // Add a helper to format timestamp data
    Date.prototype.formatMMDDYYYY = function () {
        return (this.getMonth() + 1) +
            "-" + this.getDate() +
            "-" + this.getFullYear() +
            " " + this.getHours() +
            ":" + this.getMinutes();
    }

    var jsonData = $.ajax({
        beforeSend: function (xhr) {

            xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9lZnNkYXZpZDk3MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI1MTM2ZmUxZS1mNmQ2LTQ4NGEtYTlkNC03ZTIyZWRhMzIwMzIiLCJuYmYiOiIxNjAxNDA2Mjg1IiwiZXhwIjoiMTYwMzk5ODI4NSJ9.KvqQDCZyAhGBlWJl1wVBeHpT2Enfkr0btC5qV1lJPLg');
        },
        url: 'https://weatherstationapi.azurewebsites.net/api/WindData/GetAllData',
        dataType: 'json',
    }).done(function (results) {

        // Split timestamp and data into separate arrays
        var labels = [], data = [], humdata = [];
        results.forEach(function (packet) {
            labels.push(new Date(packet.dateCaptured).formatMMDDYYYY());
            data.push(parseFloat(packet.windSpeed_MPH));
            humdata.push(parseFloat(packet.windSpeed_Knots * 100));
        });

        // Create the chart.js data structure using 'labels' and 'data'
        var tempData = {
            labels: labels,
            datasets: [{
                label: "MPH",
                fill: false,



                data: data
            },
            {
                label: "Knots",
                fill: false,

                data: humdata


            }]
        };

        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myWindChart").getContext("2d");


        // Instantiate a new chart
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: tempData,
            options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black'
                    }

                },

                scales: {
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            fontColor: 'black'
                        }
                    }],

                    scaleLabel: {
                        fontColor: 'black'
                    }

                },
                plugins: {
                    colorschemes: {
                        scheme: 'brewer.SetOne4'
                    }
                }
            }
        });

    });
    drawWindGauge();
}

function drawWindGauge() {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 22,
            title: { text: "Wind Speed" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 400 },
            gauge: { axis: { range: [null, 100] } }
        }
    ];

    var layout = { width: 600, height: 400};
    Plotly.newPlot('myWindGaugeDiv', data, layout);
}

//drawLineChart();