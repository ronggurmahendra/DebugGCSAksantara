import { Component, OnInit } from '@angular/core';

import { parameterRecord } from '../models/parameterRecords';
import { FlightdataService } from '../services/flightdata.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor(private flightDataService: FlightdataService) { }

  private parameterRecords: parameterRecord[];
  private parameterRecord: parameterRecord;
  private param_count: number;
  private param_id: number;
  private param_index: number;
  private param_type: number;
  private param_value: number;

  private isClicked: boolean;

  ngOnInit(): void {

  }

  public getParameters() {
    this.isClicked = true;

    this.flightDataService.sendBtnParamStatus({ isClicked: this.isClicked })        
      .subscribe(response => {
        console.log(response);
      });

    setTimeout(() => {
      this.flightDataService.sendBtnParamStatus({ isClicked: !this.isClicked })        
      .subscribe(response => {
        console.log(response);
      });
    }, 6000);

    setTimeout(() => {
      this.flightDataService.getParameterRecords()
        .subscribe((response) => {
          console.log(response);
        });
    }, 20000);
  } 

}
