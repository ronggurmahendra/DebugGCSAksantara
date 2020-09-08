import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { WaypointEditorComponent } from '../waypoint-editor/waypoint-editor.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  @Input() isMap = true;
  constructor() { }

  ngOnInit(): void {
  }

}
