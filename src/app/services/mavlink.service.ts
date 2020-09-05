//data dummy
import { Injectable, ɵConsole } from '@angular/core';
import { NumericLiteral } from 'typescript';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})

export class MavlinkService {
  constructor(){};
  public i = 1000
  //public coordinate = [107.5721, -6.9823]
  public lon = 107.5721
  public lat = -6.9823
  
  initDummy(){
  console.log('initilizing dummy')
    /*
    var y = this.i
    setInterval(function (f = y){
      y--
      console.log(f)
      console.log(y)
      //this.MavlinkService.changevalue(f)
    },100)
    this.i = y 
  */
 
  }

  getyaw(){
    this.i--
    //console.log("yaw : ",this.i /10)
    return(this.i/10)

  }

  getCoordinate(){
    this.lon -= 0.0001
    this.lat -= 0.0001
    //console.log('lon: ' ,this.lon)
    //console.log('lat: ' ,this.lat)
    return [this.lon,this.lat]
  }
}
