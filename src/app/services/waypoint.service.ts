import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ObjectWaypoint } from '../models/waypointClass';
import { WAYPOINTS } from '../models/WAYPOINTS'
//import fs from 
import { FlightdataService } from "../services/flightdata.service"
//import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlightRecord } from '../models/flightrecord';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WaypointService {
  public waypoints = [];
  //public home
  public changingHome = false;
  public startStreaming = false;
  public tempmission : any
  constructor(private httpClient: HttpClient, private flightDataService: FlightdataService) {
    console.log('Initialize WaypoinitService')
    //public waypoints = new any[]
    //var tempstartStreaming = this.startStreaming
    //var objectWaypoints: Observable<any[]>;
    //var startStreaming = this.startStreaming
    setInterval(() => {this.streamMission(this.startStreaming, flightDataService)},1000); 
  }
  
  streamMission(startStreaming, flightDataService){
    //console.log('retrieving data from database')
    //let temp : ObjectWaypoint[]
    var wkkw = this.flightDataService.getMission().subscribe(response => 
      //console.log("response = ",response.children)
      this.tempmission = response
    )   
    
    
    console.log("count :",this.tempmission.children.length)
    if (this.tempmission.children.length  > this.waypoints.length || 1){

      this.waypoints = []
      for(let i = 0;i < this.tempmission.children.length ;i++){
        let command = this.tempmission.children[i].command;
        let param1 = this.tempmission.children[i].param1;
        let param2 = this.tempmission.children[i].param2;
        let param3 = this.tempmission.children[i].param3;
        let param4 = this.tempmission.children[i].param4;
        let x = this.tempmission.children[i].x;
        let y = this.tempmission.children[i].y;
        let z = this.tempmission.children[i].z;
        let target_system = this.tempmission.children[i].target_system;
        let target_component = this.tempmission.children[i].target_component;
        let frame = this.tempmission.children[i].frame;
        let mission_type = this.tempmission.children[i].mission_type;
        let current = this.tempmission.children[i].current;
        let autocontinue = this.tempmission.children[i].autocontinue;
      
        this.waypoints.push([command,param1,param2,param3,param4,x,y,z,target_system,target_component,frame,mission_type,current,autocontinue]);
      }
      //console.log(this.waypoints)
      
    }
    this.startStreaming = true;
    //console.log(this.waypoints)
  }

  getStartStreaming(){
    //console.log(this.startStreaming)
    return this.startStreaming;
  }
  startingStream(){
    this.startStreaming = true;
  }

  changeHome(){
    if (this.changingHome == false){
      this.changingHome = true;
      console.log("ready to change Home")
    }else{
      this.changingHome = false; 
      console.log("Home Changed")
    }
  }
  getChangingHome(){
    return this.changingHome;
  }
  changingHomeProperties(waypoint: ObjectWaypoint){
    this.waypoints[0] = waypoint;
  }

  add(waypoint: ObjectWaypoint) {
    this.waypoints.push(waypoint);
    //console.log('totalWaypoints in service', this.waypoints.length)
    //console.log('added to service', waypoint.g   etCoordinate())
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
    console.log("deleting Wp :", n);
    let temp_waypoints = this.waypoints
    this.waypoints = temp_waypoints.slice(0,n-1).concat(temp_waypoints.slice(n , -1)) 
    //console.log(this.getCoordinateArray().length)
  }

  getCoordinateOn(n:number){
    return [this.waypoints[n].y,this.waypoints[n].x]
  }
//[this.y,this.x]
  getCoordinateArray(){
    let tempcoor: number[][] = [];
    for (var i = 0; i < (this.waypoints.length); i++){
      tempcoor.push([this.waypoints[i].y,this.waypoints[i].x] );
    }
    //console.log("at service",tempcoor.length,this.waypoints.length);
    return tempcoor
  }
  getAllArray(){
    let temp: number[][] = [];
    for (var i = 0; i < (this.waypoints.length); i++){
      temp.push([this.waypoints[i].command, 
        this.waypoints[i].param1,
        this.waypoints[i].param2,
        this.waypoints[i].param3,
        this.waypoints[i].param4,
        this.waypoints[i].x,
        this.waypoints[i].y,
        this.waypoints[i].z,
        this.waypoints[i].target_system,
        this.waypoints[i].target_component,
        this.waypoints[i].frame,
        this.waypoints[i].mission_type,
        this.waypoints[i].current,
        this.waypoints[i].autocontinue
    ]);
    }  
    //console.log(temp);
    return temp
  }
  //save(filename:string){} 
  
  getWaypoints(): Observable<ObjectWaypoint[]> {
    return of(this.waypoints);
  }
  sendWaypoint() {
    //console.log("masuksini")
    //console.log(this.getCoordinateArray())
    var temp: any[];
    temp = []
    let arrTotal = this.getAllArray();
    for(let i = 0;i<this.getAllArray().length;i++){
      //console.log("arrTotal:",arrTotal)
      //let latitude = arrTotal [i][1];
      //let longitude = arrTotal [i][0];
      let command = arrTotal [i][0];
      let param1 = arrTotal [i][1];
      let param2 = arrTotal [i][2];
      let param3 = arrTotal [i][3];
      let param4 = arrTotal [i][4];
      let x = arrTotal [i][5];
      let y = arrTotal [i][6];
      let z = arrTotal [i][7];
      let target_system = arrTotal [i][8];
      let target_component = arrTotal [i][9];
      let frame = arrTotal [i][10];
      let mission_type = arrTotal [i][11];
      let current = arrTotal [i][12];
      let autocontinue = arrTotal [i][13];

      temp.push({command,param1,param2,param3,param4,x,y,z,target_system,target_component,frame,mission_type,current,autocontinue});
    }
    console.log("mssion sent: ",temp.length)
    return (this.flightDataService.sendWaypoint(temp));

  }


 
}
