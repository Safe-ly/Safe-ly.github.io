import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private points$: Observable<RootObject>;
  private coordinateOne: any;
  private coordinateTwo: any;

  constructor(private http: HttpClient) {

  }

  setCoordinates(coordinateOne: any, coordinateTwo: any) {
    this.coordinateOne = coordinateOne;
    this.coordinateTwo = coordinateTwo;
  }

  getAllPoints() {
    console.log(this.coordinateOne);
    console.log(this.coordinateTwo);
    return this.http.get(`http://router.project-osrm.org/route/v1/driving/${this.coordinateOne.lat},${this.coordinateOne.lng};${this.coordinateTwo.lat},${this.coordinateTwo.lng}?overview=full&geometries=geojson&steps=false`).subscribe(
      (data: Response) => {
        console.log(data);
      }
    );
  }
}


export interface Geometry {
  coordinates: number[][];
  type: string;
}

export interface Leg {
  summary: string;
  weight: number;
  duration: number;
  steps: any[];
  distance: number;
}

export interface Route {
  geometry: Geometry;
  legs: Leg[];
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface Waypoint {
  hint: string;
  distance: number;
  name: string;
  location: number[];
}

export interface RootObject {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
}

