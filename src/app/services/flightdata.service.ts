import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlightRecord } from '../models/flightrecord';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FlightdataService {
  // private url = "https://aksantara3301.herokuapp.com/";
  private url = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getFlightRecords(): Observable<FlightRecord[]> {
    return this.httpClient.get<FlightRecord[]>(this.url+'api/flightdatas')
      .pipe(map(res => { return res }));
  }

  sendData(url, data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'aplication/json');

    return this.httpClient.post(this.url+'api/' + url, data, {headers: headers})
    .pipe(map(res => { return res }));
  }

  sendFlightRecord(data) {
    return this.sendData('flightdata', data);
  }

  sendWaypoint(data) {
    return this.sendData('waypoint', data);
  }
}
