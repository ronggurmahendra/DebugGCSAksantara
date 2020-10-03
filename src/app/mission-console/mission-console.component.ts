import { Component, OnInit } from '@angular/core';
import { WaypointService } from "../services/waypoint.service"
import { FlightdataService} from "../services/flightdata.service"

@Component({
  selector: 'app-mission-console',
  templateUrl: './mission-console.component.html',
  styleUrls: ['./mission-console.component.css']
})
export class MissionConsoleComponent implements OnInit {

  constructor(    private waypointService: WaypointService, 
    private flightDataService: FlightdataService) { }

  ngOnInit(): void {
  }
  write() {
    // buat ngirim waypoint ke server 
    console.log("Writing to Flight Controler")
    this.waypointService.sendWaypoint()
      .subscribe(response => {
        console.log(response);
      });
  } 
  Read() {
    console.log("Reading from Flight Controler")
  } 
  changeHome(){
    this.waypointService.changeHome();
  }

}
