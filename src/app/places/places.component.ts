import {Component, ElementRef, Input, OnInit, Output, ViewChild, OnDestroy, AfterViewInit, Renderer2} from '@angular/core';
import { FormControl } from '@angular/forms';
import places from 'places.js';
import {environment} from '../../environments/environment';
import {PlacesService} from '../services/places/places.service';
import {NearestAccidentsService} from "../services/nearestaccidents/nearest-accidents.service";

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
    this.placesService.setCoordinates(this.firstLocation, this.secondLocation);
    this.placesService.getAllPoints();
  }
}
