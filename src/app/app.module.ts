import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlightDataComponent } from './flight-data/flight-data.component';
import { MapComponent } from './map/map.component';
import { WaypointEditorComponent } from './waypoint-editor/waypoint-editor.component';
import { MainComponent } from './main/main.component';
import { MissionComponent } from './mission/mission.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataComponent,
    MapComponent,
    WaypointEditorComponent,
    MainComponent,
    MissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'flight-data', component: FlightDataComponent },
      { path: 'mission', component: MissionComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
