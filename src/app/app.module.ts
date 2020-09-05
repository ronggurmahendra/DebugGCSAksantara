import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlightDataComponent } from './flight-data/flight-data.component';
import { MapComponent } from './map/map.component';
import { WaypointEditorComponent } from './waypoint-editor/waypoint-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataComponent,
    MapComponent,
    WaypointEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
