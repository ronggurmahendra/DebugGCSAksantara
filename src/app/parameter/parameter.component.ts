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
      param_id: "SYSID_THISMAV",
      param_index: 0,
      param_type: 1,
      param_value: 9,
    }]
  }

  public param_count: number;
  public param_id: number;
  public param_index: number;
  public param_type: number;
  public param_value: number;

  public getParamBtn: boolean = false;
  public sendParamBtn: boolean = false;

  ngOnInit(): void {
    this.flightDataService.getParameterRecords()
    .subscribe((response) => {
      this.parameters._id = response._id;
      this.parameters.children = response.children;
      console.log(this.parameters.children);
    });
  }

  public sendParameters() {
    this.sendParamBtn = true;

    console.log(this.parameters);
    this.flightDataService.sendParameterRecords(this.parameters.children)
      .subscribe(response => {
        console.log(response);
      });

    this.flightDataService.sendBtnParamStatus({ getParamBtn: false, sendParamBtn: this.sendParamBtn })        
      .subscribe(response => {
        console.log(response);
      });
  }

  public getParameters() {
    this.getParamBtn = true;

    this.flightDataService.sendBtnParamStatus({ getParamBtn: this.getParamBtn, sendParamBtn: false })        
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
