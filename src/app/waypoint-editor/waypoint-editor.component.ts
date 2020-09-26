import { Component, OnInit } from '@angular/core';
import { ObjectWaypoint } from '../models/waypointClass';
import { WaypointService } from '../services/waypoint.service';

@Component({
  selector: 'app-waypoint-editor',
  templateUrl: './waypoint-editor.component.html',
  styleUrls: ['./waypoint-editor.component.css'],
  providers:[WaypointService]
})
export class WaypointEditorComponent implements OnInit {
  waypoints : ObjectWaypoint[] ; 
  waypoint : ObjectWaypoint ;
  Command : string ;
  longitude : number;
  latitude: number;
  altitude: number;
  frame: string;
  home: boolean;
  
  constructor(private waypointService : WaypointService) { }

  ngOnInit(): void {
    this.getWaypoints();
  }
  
  getWaypoints(){
    this.waypointService.getWaypoints()
      .subscribe(waypoints =>
        this.waypoints = waypoints);
  }

  DeleteMissionUnit(wp){
    for(var i = 0; i< this.waypointService.getCoordinateArray().length; i++){
      //console.log("this.waypointService.getCoordinateArray()[i] :",this.waypointService.getCoordinateArray()[i])
      //console.log("wp.getCoordinate() :",wp.getCoordinate())
      console.log(i);
      console.log(this.waypointService.getCoordinateArray()[i])
      console.log(wp.getCoordinate())
      if ((this.waypointService.getCoordinateArray()[i][0] == wp.getCoordinate()[0])&&(this.waypointService.getCoordinateArray()[i][1] == wp.getCoordinate()[1])){
        this.waypointService.remove(i);
      } 

    }
    
  }
}
