import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {NearestAccidentsService} from '../nearestaccidents/nearest-accidents.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public coordinateOne: any;
  public coordinateTwo: any;

  constructor(private http: HttpClient, private nearestAccidentsService: NearestAccidentsService) {

  }

  setCoordinates(coordinateOne: any, coordinateTwo: any) {
    this.coordinateOne = coordinateOne;
    this.coordinateTwo = coordinateTwo;
  }

  getAllPoints(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`http://ec2-52-30-174-99.eu-west-1.compute.amazonaws.com:5000/route/v1/driving/${this.coordinateOne.lng},${this.coordinateOne.lat};${this.coordinateTwo.lng},${this.coordinateTwo.lat}?overview=simplified&geometries=geojson&steps=false&alternatives=2`);
  }
}




