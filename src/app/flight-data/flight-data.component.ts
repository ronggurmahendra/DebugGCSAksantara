import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import anime from 'animejs/lib/anime.es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import $ from "jquery";
import * as THREE from 'three';
import { FlightRecord } from '../models/flightrecord';
import { FlightdataService } from '../services/flightdata.service';
@Component({
  selector: 'app-flight-data',
  templateUrl: './flight-data.component.html',
  styleUrls: ['./flight-data.component.css']
})

export class FlightDataComponent implements OnInit {
  public flightrecords: FlightRecord[];
  public flightrecord: FlightRecord;
  public pitch: number;
  public roll: number;
  public yaw: number;
  public raw_yaw: number;
  public alt: number;
  public time = {};
  public groundspeed: number;
  public arrow_compas;
  public arrow_hud;
  public flightdata = [];

  constructor(private flightDataService: FlightdataService) { }
  public isMap = false;
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.animateAll();
    });

    setInterval(() => {
      this.getData();
    }, 200);
    this.render3d();
  }

  public animateAll() {
    anime({
      targets: "#arrow-degree",
      rotate: this.yaw,
      duration: 0
    });

    anime({
      targets: "#arrow",
      rotate: this.roll,
      duration: 0
    });

    anime({
      targets: ["#alt", "#pos"],
      innerHTML: this.alt,
      duration: 0,
      round: 10
    });

    anime({
      targets: "#gdspeed",
      innerHTML: this.roll,
      duration: 0,
      round: 100
    });

    if (this.time != {}) {
      anime({
        targets: "#second",
        innerHTML: this.time['seconds'],
        duration: 0,
        round: 0
      });
      anime({
        targets: "#minute",
        innerHTML: this.time['minute'],
        duration: 0,
        round: 0
      });
      anime({
        targets: "#hour",
        innerHTML: this.time['hour'],
        duration: 0,
        round: 0
      });
    }

    anime({
      targets: ["#sky", "#bar"],
      translateY: this.pitch,
      duration: 0
    });

    requestAnimationFrame(() => {
      this.animateAll();
    });
  }

  public getData() {
    this.flightDataService.getFlightRecords()
    .subscribe(response => {
      this.flightrecords = response;
      let index = this.flightrecords.length - 1;
      this.yaw = (this.flightrecords[index].yaw * 180) / Math.PI;
      this.roll = (this.flightrecords[index].roll * 180) / Math.PI;
      this.pitch = this.flightrecords[index].pitch * 180 / Math.PI;
      this.alt = this.flightrecords[index].alt;
      this.groundspeed = this.flightrecords[index].groundspeed;
      this.time = this.convertMS(this.flightrecords[index].time_boot_ms);

      if (this.yaw < 0) {
        this.raw_yaw = Math.abs(this.yaw) + 180;
      } else {
        this.raw_yaw = this.yaw;
      }
    });
  }

  public convertMS(time) {
    let hour, minute, seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;
    return {
      hour: hour,
      minute: minute,
      seconds: seconds
    };
  }

  public render3d() {
    let div = $(".model-3d");
    let width = div.width();
    let height = div.height();

    let airplane;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaad0e7);

    let camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 5000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -250;
    camera.lookAt(scene.position);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);

    let loader = new GLTFLoader();
    loader.load("../../assets/scene.gltf", aksantaraPlane);

    function aksantaraPlane(gltf) {
      airplane = gltf.scene.children[0];
      airplane.scale.set(0.5, 0.5, 0.5);
      airplane.position.x = 0;
      airplane.position.y = 0;
      airplane.position.z = 0;
      scene.add(gltf.scene);
    }

    div.append(renderer.domElement);

    let self = this;
    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(() => {
        render();
      });

      airplane.rotation.y = self.convert(self.roll);
      airplane.rotation.z = -1 * self.convert(self.yaw);
    }
    requestAnimationFrame(() => {
      render();
    });
  }

  public convert(degree) {
    return degree/180 * Math.PI;
  }
}
