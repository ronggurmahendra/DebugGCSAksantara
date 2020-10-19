import { Component, OnInit } from '@angular/core';
import { WaypointService } from "../services/waypoint.service"
import { FlightdataService} from "../services/flightdata.service"

@Component({
  selector: 'app-mission-console',
  templateUrl: './mission-console.component.html',
  styleUrls: ['./mission-console.component.css']
})
export class MissionConsoleComponent implements OnInit {

  constructor(
    private waypointService: WaypointService, 
    private flightDataService: FlightdataService) { }
  
  public getWaypointBtn: boolean = false;
  public sendWaypointBtn: boolean = false;

  ngOnInit(): void {
  }

  write() {
    this.sendWaypointBtn = true;
    this.flightDataService.sendBtnStatus({ getParamBtn: false, sendParamBtn: false, getWaypointBtn: false, sendWaypointBtn: this.sendWaypointBtn })        
    .subscribe(response => {
      console.log(response);
    });
  } 

  Read() {
    this.getWaypointBtn = true;
    this.flightDataService.sendBtnStatus({ getParamBtn: false, sendParamBtn: false, getWaypointBtn: this.getWaypointBtn, sendWaypointBtn: false })        
    .subscribe(response => {
      console.log(response);
    });

    setTimeout(() => {
      this.flightDataService.getMission()
        .subscribe(response => {
          console.log(response);
        });
    }, 7000);
  } 
  
  changeHome(){
    this.waypointService.changeHome();
  }
}
