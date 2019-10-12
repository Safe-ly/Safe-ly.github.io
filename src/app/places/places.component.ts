import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import places from 'places.js';
import {environment} from '../../environments/environment';
import {PlacesService} from '../services/places/places.service';
import {NearestAccidentsService} from '../services/nearestaccidents/nearest-accidents.service';
import {OsrmRootObject, Route} from "../interfaces/osrm";
import {repeat} from "rxjs/operators";

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

  // tslint:disable-next-line:max-line-length
  constructor(private renderer: Renderer2, private placesService: PlacesService, private neareastAccidentsService: NearestAccidentsService) { }

  @Output() messageEvent = new EventEmitter<OsrmRootObject>();
  @Output() firstLocationEvent = new EventEmitter<OsrmRootObject>();
  @Output() secondLocationEvent = new EventEmitter<OsrmRootObject>();

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

  submitData() {
    if (this.qElementRef.nativeElement.value && this.qElementSecond.nativeElement.value) {
      this.placesService.setCoordinates(this.firstLocation, this.secondLocation);
      this.placesService.getAllPoints().subscribe((response: OsrmRootObject) => {
        this.messageEvent.emit(response);
        this.firstLocationEvent.emit(this.firstLocation);
        this.secondLocationEvent.emit(this.secondLocation);

        response.routes.forEach( (route: Route) => {
          this.neareastAccidentsService.findNearestAccidents(route.geometry).then(result => {
            console.log(result);
          });
        });
      });
    }
  }
}
