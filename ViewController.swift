//
//  ViewController.swift
//  Lab3Weather
//
//  Created by Ilir Tairi on 9/21/20.
//  Copyright © 2020 Lab 3. All rights reserved.
//

import UIKit


//tableview to show upcoming weather
//horizontal aspect to show hourly forecast - custom cell w colelction view
//API/request to get data

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    //  getTemperData()
    // getWindData()
    //  getRainData()
    @IBOutlet var table: UITableView!
    var models = [TemperatureDataModel]()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        //Register cells
        table.register(WeatherTableViewCell.nib(), forCellReuseIdentifier: WeatherTableViewCell.identifier)
        
        table.delegate = self
        table.dataSource = self
        getTemperData()
    }
    
    override func viewDidAppear(_ animated: Bool){
        super.viewDidAppear(animated)
    }
    
    //Tables
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return models.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: WeatherTableViewCell.identifier, for: indexPath) as! WeatherTableViewCell
        cell.configure(with: models[indexPath.row])
        return cell
        }
    
    
    func getTemperData(){
        //Create the URLs
        let temperatureDataUrl = URL(string: "https://weatherstationapi.azurewebsites.net/api/TemperatureSensor/GetData")
        guard let requestURLTemp = temperatureDataUrl else {fatalError()}
        
        //Create URL request
        var request = URLRequest(url: requestURLTemp)
        //Specifiy HTTP Method to use
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaWxpci50YWlyaUB0dHUuZWR1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4MjEzYzhhMy1iODgxLTQ4NmUtOGUyMC1mZmNlMDlmNGY0ZjgiLCJuYmYiOiIxNjA1MTE4NDA4IiwiZXhwIjoiMTYzNjY1NDQwOCJ9.HmLCUwnB5Esbao5NDmjflooHcdQK1BWjy1lk6LIKiJg", forHTTPHeaderField: "Authorization")
        
        //Send HTTP Request
        let task = URLSession.shared.dataTask(with: request){(data, response, error) in
            guard let data = data else {return}
            do
            {
                let decoder = JSONDecoder()
                decoder.keyDecodingStrategy = .convertFromSnakeCase
                let TemperatureData = try decoder.decode([TemperatureDataModel].self, from: data)
                for singleValue in TemperatureData {
                    print(singleValue.temperature)
                    self.models.append(singleValue)
                    DispatchQueue.main.async {
                        self.table.reloadData()
                    }
                }
            } catch {
                print("JSONDecoder error:", error)
            }
  
        };task.resume()
    
    }
 
}

class TempAndHumidityController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet var windtable: UITableView!
    var Windmodels = [WindDataModel]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
        //Register cells
        windtable.register(WindTableViewCell.nib(), forCellReuseIdentifier: WindTableViewCell.identifier)
        
        windtable.delegate = self
        windtable.dataSource = self
        //getWindData()
    }
    
    override func viewDidAppear(_ animated: Bool){
        super.viewDidAppear(animated)
    }
    
    //Tables
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return Windmodels.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: WindTableViewCell.identifier, for: indexPath) as! WindTableViewCell
        cell.configure(with: Windmodels[indexPath.row])
        return cell
    }
    
    
    func getWindData(){
        //Create the URLs
        let WindDataUrl = URL(string: "https://weatherstationapi.azurewebsites.net/api/WindData/GetAllData")
        //Create URL requests
        guard let requestURLWind = WindDataUrl else {fatalError()}
        var requestWind = URLRequest(url: requestURLWind)
        //Request for Wind data
        requestWind.httpMethod = "GET"
        requestWind.setValue("application/json", forHTTPHeaderField: "Accept")
        requestWind.setValue("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaWxpci50YWlyaUB0dHUuZWR1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4MjEzYzhhMy1iODgxLTQ4NmUtOGUyMC1mZmNlMDlmNGY0ZjgiLCJuYmYiOiIxNjA1MTE4NDA4IiwiZXhwIjoiMTYzNjY1NDQwOCJ9.HmLCUwnB5Esbao5NDmjflooHcdQK1BWjy1lk6LIKiJg", forHTTPHeaderField: "Authorization")
        
        
        //Send HTTP Request
        let task = URLSession.shared.dataTask(with: requestWind){(data, response, error) in
            guard let data = data else {return}
            
            do
            {
                let decoder = JSONDecoder()
              //  decoder.keyDecodingStrategy = .convertFromSnakeCase
                let WindData = try decoder.decode([WindDataModel].self, from: data)
                for singleValue in WindData {
                    print("Wind Speed:  \(singleValue.windSpeed_MPH)")
                    print("Wind Direction:  \(singleValue.windDirection)")
                    self.Windmodels.append(singleValue)
                    DispatchQueue.main.async {
                        self.windtable.reloadData()
                    }
                }
                
                //print("Temperature Data:", TemperatureData)
            } catch {
                print("JSONDecoder error:", error)
            }
        };task.resume()
        
    }
    
}







class WindDataController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.orange
        title = "Wind Speed and Direction"
    }
}

class RainDataController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.gray
        title = "Rain Fall and Pressure"
    }
}








struct TemperatureDataModel: Codable{
    let id:              Int
    let temperature:     Double
    let humidity:        Double
    let timeCaptured:    String
}
struct WindDataModel: Codable{
    let id: Int
    let winSpeed_Knots:  Double
    let windSpeed_MPH:   Double
    let windDirection:   String
    let DataCaptured:    String
}
