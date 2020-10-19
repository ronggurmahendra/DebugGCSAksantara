import 'ol/ol.css';
import Tile from 'ol/layer/Tile' ;
import Map from 'ol/Map' ;
import Overlay from 'ol/Overlay';
import BingMaps from 'ol/source/BingMaps';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';

import Feature from 'ol/Feature';
import sVector from 'ol/source/Vector';
import lVector from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import {Icon} from 'ol/style';

import {Draw, Modify, Snap} from 'ol/interaction';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';


import 'ol/ol.css';
import { ObjectWaypoint } from '../models/waypointClass';
import { WaypointService } from '../services/waypoint.service';
import { markTimeline } from 'console';
import { LineString } from 'ol/geom'
import { features } from 'process';
import { MavlinkService } from '../services/mavlink.service';
import { FlightdataService } from '../services/flightdata.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @Input() isMap = true;

  constructor(
    private waypointService: WaypointService, 
    private MavlinkService: MavlinkService,
    private flightDataService: FlightdataService
  ) { }
  
  ngOnInit(): void {
    this.MavlinkService.initDummy()
    this.initilizeMap(this.waypointService, this.MavlinkService, this.flightDataService,this.isMap)
    //this.waypointService.add(new ObjectWaypoint(16,0,10,0,1,107.5721, -6.9823,10,1,255,2,0,1,0));
  }

  initilizeMap (waypointService, MavlinkService, flightDataService,OnMission) {
    var lenAwal = -1; //buar pas diinisialisasi dia pasti salah dan masuk ke refresh mission 
    var counterMission = 0;
    //untuk icon pesawat
    var wpFeature = []
    var planeFeature = new Feature({
      geometry : new Point(fromLonLat([107.5721, -6.9823]))
    });
    
    planeFeature.setStyle(new Style({
        image : new Icon(({
        src: 'assets/plane.svg',
        imgSize: [600, 600],
        scale: 0.1,
        rotation : 1*3.14/360
      }))
    }));

    var planeSource = new VectorSource({
      features: [planeFeature]
    });

    var planeLayer = new VectorLayer({
      source : planeSource
    });

    //untuk waypoint 
    var waypointSource = new VectorSource({
      features : wpFeature
    });

    var waypointLayer = new VectorLayer({
      source : waypointSource
    });
    var lineFeature = []
    var lineSource = new VectorSource({
      features : lineFeature
    });
    
    var lineLayer = new VectorLayer({
      source : lineSource
    });

    // generate map
    var map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new BingMaps({
            key : 'AvVs4gAIu8ElkHO0rJ8kMyBr4I-dpi5JuAibjlzz_jq3wJsKRzAuMbgdrbOC4hO8',
            imagerySet: 'AerialWithLabelsOnDemand'
          })
        }),
        planeLayer,
        lineLayer,
        waypointLayer
      ],
      view: new View({
        center:fromLonLat([107.5721, -6.9823]),
        zoom: 16,
        enableRotation: false
      })
    });

    // fitur wp on click
    map.on('singleclick', function (evt){ 
      
      if (OnMission){
        var Coordinate = toLonLat(evt.coordinate); //coordinate openlayer to coordinate 
        var longitude = Coordinate[0];
        var latitude = Coordinate[1];
        
        /* CODINGAN AFIF */
        // Kumpulin kordinat nanti baru dikirim lewat fungsi collectWaypoint
        //collectionCordinate.push({latitude, longitude});
        /* ------------- */
        //console.log(collectionCordinate);
        if(!waypointService.getChangingHome()){
          waypointService.add(new ObjectWaypoint(16,0,10,0,1,latitude,longitude,10,1,255,2,0,1,0)); // nambah wp ke service  
          //refreshMission()
        } else {
          waypointService.changingHomeProperties(new ObjectWaypoint(16,0,10,0,1,latitude,longitude,10,1,255,2,0,1,0));//ganti home
          waypointService.changeHome();
          refreshMission()
        }
      }
    })

    setInterval(function refreshPlane() {
      //console.log("getmission : ",flightDataService.getMission())
      planeSource.clear()
      var temp_planeFeature = new Feature({
        geometry : new Point(fromLonLat(MavlinkService.getCoordinate()))//masi pake data dummy
      });
      
      temp_planeFeature.setStyle(new Style({
          image : new Icon(({
          src: 'assets/plane.svg',
          imgSize: [600, 600],
          scale: 0.1,
          // rotation : flightDataService.getFlightRecords().yaw
          rotation: 0
        }))
      }));
      planeSource.addFeature(temp_planeFeature)
      //cek misi beda atau ngga
      
      if (!(lenAwal == waypointService.getCoordinateArray().length)){
        //console.log("refreshing Mission")
        refreshMission()
      }
      lenAwal = waypointService.getCoordinateArray().length
      
    },100)


    function refreshMission() {
      //console.log("refreshingnWP");
      var len = waypointService.getCoordinateArray().length;
      //console.log(waypointService.getCoordinateArray());
      for(var i = 0; i< len; i++){
        //console.log(waypointService.getCoordinateArray()[i])
        var temp_waypoint = new Feature({
          geometry : new Point(fromLonLat(waypointService.getCoordinateArray()[i]))
        }); // bikin feature baru dengan wp dari service
        temp_waypoint.setStyle(new Style({
          image : new Icon(({
          color: '#00FF2B',
          crossOrigin: 'anonymous',
          src: 'assets/vectorpoint.svg',
          imgSize: [60, 60],
          scale : 0.5

          }))
        })); //style wp nya*/
        
        wpFeature.push(
          temp_waypoint
        );//push feature ke list feature

      };
      if (len > 1){ //cek dulu apakah sudah ada lebih dari 1 wp
        for (var j = 1 ; j < len; j++){
          //console.log('j',j)
            var lineCoordinate1 = fromLonLat(waypointService.getCoordinateArray()[j-1])
            //var lineCoordinate1 = fromLonLat([107.57358558756334, -6.9793586630298705])
            var lineCoordinate2 = fromLonLat(waypointService.getCoordinateArray()[j])
            //var line = new LineString([lineCoordinate1,lineCoordinate2])
            //console.log('make a line between',lineCoordinate1,lineCoordinate2)
            var line = new LineString(
              [lineCoordinate1,lineCoordinate2]
            )
            var templineFeature = new Feature({
              geometry : line
            });        
            templineFeature.setStyle(
              new Style({
                stroke: new Stroke({
                  color: '#00FF2B',
                  width: 3
                })
              })
            );
            //console.log("templineFeature",templineFeature)
            lineFeature.push(
              templineFeature
            );
            //console.log("lineFeature",lineFeature)
            //bikin arrow
            var arrowCoordinate = [lineCoordinate1[0] + (lineCoordinate2[0] - lineCoordinate1[0])/2,lineCoordinate1[1] + (lineCoordinate2[1] - lineCoordinate1[1])/2]
            var arrow = new Point(arrowCoordinate)
            var arrowFeature = new Feature({
              geometry : arrow
            })
            arrowFeature.setStyle(new Style({
              image : new Icon(({
              color: '#00FF2B',
              crossOrigin: 'anonymous',
              src: 'assets/arrow1.svg',
              imgSize: [400, 300],
              scale : 0.07,
              rotation : Math.atan2((lineCoordinate2[0] - lineCoordinate1[0]),(lineCoordinate2[1] - lineCoordinate1[1]))
              }))
            }));
            lineFeature.push(
              arrowFeature
            );
          };
      }
      
      //refresh source line
      lineSource.clear()
  
      lineSource.addFeatures(lineFeature)
      lineFeature = []
      
      //refresh source wp
      waypointSource.clear();
      //console.log(wpFeature)
      waypointSource.addFeatures(wpFeature);
      wpFeature = [];
      collectWaypoint();
    };

    /* CODINGAN AFIF */
    function collectWaypoint() {
        // buat ngirim waypoint ke server 
        waypointService.sendWaypoint()
          .subscribe(response => {
            console.log(response);
          });
    } 
    /* ------------ */

  }
}

