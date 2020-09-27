import { Component, OnInit } from '@angular/core';

import { parameterRecords } from '../models/parameterRecords';
import { FlightdataService } from '../services/flightdata.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor(private flightDataService: FlightdataService) { }

  public parameters: parameterRecords = { 
    _id: "",  
    children: [{
      param_count: 1,
      param_id: "",
      param_index: 1,
      param_type: 1,
      param_value: 1,
    }]
  }

  public param_count: number;
  public param_id: number;
  public param_index: number;
  public param_type: number;
  public param_value: number;

  public isClicked: boolean = false;

  ngOnInit(): void {

  }

  public getParameters() {
    this.isClicked = true;

    this.flightDataService.sendBtnParamStatus({ isClicked: this.isClicked, timeToGet: false })        
      .subscribe(response => {
        console.log(response);
      });

    setTimeout(() => {
      this.flightDataService.getParameterRecords()
        .subscribe((response) => {
          this.parameters._id = response._id;
          this.parameters.children = response.children;
          console.log(this.parameters.children);
        });
    }, 25000);
  }

  public clearParameters() {
    this.parameters = { 
      _id: "",  
      children: [{
        param_count: 1,
        param_id: "",
        param_index: 1,
        param_type: 1,
        param_value: 1,
      }]
    }
  }
}
