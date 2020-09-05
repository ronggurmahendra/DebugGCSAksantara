import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ObjectWaypoint } from '../models/waypointClass';
import { WAYPOINTS } from '../models/WAYPOINTS'
//import fs from 
@Injectable({
  providedIn: 'root'
})

export class WaypointService {

  waypoints = WAYPOINTS;

  add(waypoint: ObjectWaypoint) {
    this.waypoints.push(waypoint);
    //console.log('totalWaypoints in service', this.waypoints.length)
    //console.log('added to service', waypoint.getCoordinate())
    //console.log('finalWaypoint',this.waypoints)
  }
  
  addOn(waypoint : ObjectWaypoint, n : number){
    let temp_waypoints = this.waypoints
    this.waypoints = temp_waypoints.slice(0,n).concat(waypoint).concat(temp_waypoints.slice(n , -1))
  }

  clear() {
    this.waypoints = [];
  }

  remove(n : number){
    let temp_waypoints = this.waypoints
    this.waypoints = temp_waypoints.slice(0,n-1).concat(temp_waypoints.slice(n , -1)) 
  }

  getCoordinateOn(n:number){
    return this.waypoints[n].getCoordinate()
  }

  getCoordinateArray(){
    let temp: number[][] = [];
    for (var i = 0; i < (this.waypoints.length); i++){
      temp.push(this.waypoints[i].getCoordinate() );
    }
    return temp
  }
  //save(filename:string){} 
  
  getWaypoints(): Observable<ObjectWaypoint[]> {
    console.log('wkwk')
    return of(this.waypoints);
  }
}
