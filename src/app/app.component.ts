import {Component} from '@angular/core';

interface WaypointsProps {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'safelyweb';
  lat: number = 51.509865;
  lng: number = -0.118092;
  zoom: number = 10;
  waypoints: WaypointsProps[] = [
    {
      lat: 52.521248,
      lng: 13.399038
    },
    {
      lat: 48.856127,
      lng: 2.346525
    }
  ];


  constructor() {
    this.waypoints = this.waypoints.map(point => {
      return point;
    });
  }
}



