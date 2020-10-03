import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlightDataComponent } from './flight-data/flight-data.component';
import { MapComponent } from './map/map.component';
import { WaypointEditorComponent } from './waypoint-editor/waypoint-editor.component';
import { MainComponent } from './main/main.component';
import { MissionComponent } from './mission/mission.component';
import { HeaderComponent } from './header/header.component';
import { ParameterComponent } from './parameter/parameter.component';
import { MissionConsoleComponent } from './mission-console/mission-console.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataComponent,
    MapComponent,
    WaypointEditorComponent,
    MainComponent,
    MissionComponent,
    HeaderComponent,
    ParameterComponent,
    MissionConsoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'flight-data', component: FlightDataComponent },
      { path: 'mission', component: MissionComponent },
      { path: 'parameter', component: ParameterComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
