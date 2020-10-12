import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MissionComponent } from '../mission/mission.component';

import { FlightRecord } from '../models/flightrecord';

import { parameterRecords } from '../models/parameterRecords';
import { ObjectWaypoints } from '../models/ObjectWaypoint';
import { btnParamStatus } from '../models/btnParamStatus';


@Injectable({
  providedIn: 'root'
})

export class FlightdataService {
  // private url = "https://aksantara3301.herokuapp.com/";
  private url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { console.log('Initialize flightdata Service')}

  getFlightRecords(): Observable<FlightRecord> {
    return this.httpClient.get<FlightRecord>(this.url+'api/flightdatas')
      .pipe(map(res => { return res }));
  }

  getParameterRecords(): Observable<parameterRecords> {
    return this.httpClient.get<parameterRecords>(this.url+'api/parameters')
      .pipe(map(res => { return res }));
  }

  getBtnParamStatus(): Observable<btnParamStatus> {
    return this.httpClient.get<btnParamStatus>(this.url+'api/btnparams')
      .pipe(map(res => { return res }));
  }
  
  getMission(): Observable <ObjectWaypoints[]>{
    //console.log("client asking data")
    return this.httpClient.get<ObjectWaypoints[]>(this.url+'api/waypoints')
    .pipe(map(res => { return res }));
  }

  sendData(url, data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'aplication/json');

    return this.httpClient.post(this.url+'api/' + url, data, {headers: headers})
    .pipe(map(res => { return res }));
  }

  sendParameterRecords(data) {
    return this.sendData('parameter', data);
  }

  sendFlightRecord(data) {
    return this.sendData('flightdata', data);
  }

  sendWaypoint(data) {
    //console.log("sending mission data")
    return this.sendData('waypoint', data);
  }

  sendBtnParamStatus(data) {
    return this.sendData('btnparam', data);
  }
}
