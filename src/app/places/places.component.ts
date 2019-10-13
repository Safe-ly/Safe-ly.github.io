import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  Renderer2,
  EventEmitter
} from '@angular/core';
import places from 'places.js';
import {PlacesService} from '../services/places/places.service';
import {NearestAccidentsService} from '../services/nearestaccidents/nearest-accidents.service';
import {OsrmRootObject, Route} from '../interfaces/osrm';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface PlacesComponentGeoloc {
  lat: number;
  lng: number;
}

export interface PlacesComponentHit {
  accident_id: number;
  objectID: number;
  _geoloc: PlacesComponentGeoloc;
}

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
})
export class PlacesComponent implements OnInit, AfterViewInit {

  @Input() q: string;
  @ViewChild('place1',  { read: ElementRef, static: false }) qElementRef: ElementRef;
  @ViewChild('place2',  { read: ElementRef, static: false }) qElementSecond: ElementRef;

  private placesOne: any;
  private placesTwo: any;

  private firstLocation: any;
  private secondLocation: any;

  // TODO: Time is ticking. Sorry for not making the request within the separate Service
  // tslint:disable-next-line:max-line-length
  constructor(private renderer: Renderer2, private http: HttpClient, private placesService: PlacesService, private neareastAccidentsService: NearestAccidentsService) { }

  @Output() messageEvent = new EventEmitter<OsrmRootObject>();
  @Output() firstLocationEvent = new EventEmitter<OsrmRootObject>();
  @Output() secondLocationEvent = new EventEmitter<OsrmRootObject>();

  @Output() firstRouteEvent = new EventEmitter<any>();
  @Output() secondRouteEvent = new EventEmitter<any>();

  @Output() firstRouteHighSeverityProbability = new EventEmitter<number>();
  @Output() secondRouteHighSeverityProbability = new EventEmitter<number>();


  ngAfterViewInit() {
    this.placesOne = places({
      appId: 'plD85DLCMVN6',
      apiKey: '21ae1fd88f04362c9387d2e8e5f1054a',
      container:  this.qElementRef.nativeElement,
    });

    this.placesOne.on('change', (e) => {
      this.firstLocation = e.suggestion.latlng;
    });

    this.placesTwo = places({
      appId: 'plD85DLCMVN6',
      apiKey: '21ae1fd88f04362c9387d2e8e5f1054a',
      container:  this.qElementSecond.nativeElement,
    });

    this.placesTwo.on('change', (e) => {
      this.secondLocation = e.suggestion.latlng;
    });

  }

  public ngOnInit() {

  }

  private getProb(hits: Array<PlacesComponentHit>): Observable<any> {
    const accidentIds = [];

    hits.forEach((val) => {
      accidentIds.push(val.accident_id.toString());
    });

    const accidentIdQuery = '?accident_id=' + accidentIds.join('&accident_id=');

    return this.http.get(`http://ec2-52-30-174-99.eu-west-1.compute.amazonaws.com:5001/${accidentIdQuery}`);
  }

  submitData() {
    if (this.qElementRef.nativeElement.value && this.qElementSecond.nativeElement.value) {
      this.placesService.setCoordinates(this.firstLocation, this.secondLocation);
      this.placesService.getAllPoints().subscribe((response: OsrmRootObject) => {
        this.messageEvent.emit(response);
        this.firstLocationEvent.emit(this.firstLocation);
        this.secondLocationEvent.emit(this.secondLocation);

        this.neareastAccidentsService.findNearestAccidents(response.routes[0].geometry.coordinates).then(result => {
          this.firstRouteEvent.emit(result.hits);

          this.getProb(result.hits).subscribe(res => {
            this.firstRouteHighSeverityProbability.emit(res);
          });
        });

        if (response.routes.length === 2) {
          this.neareastAccidentsService.findNearestAccidents(response.routes[1].geometry.coordinates).then(result => {
            this.secondRouteEvent.emit(result.hits);

            this.getProb(result.hits).subscribe(res => {
              this.secondRouteHighSeverityProbability.emit(res);
            });
          });
        }
      });
    }
  }
}
