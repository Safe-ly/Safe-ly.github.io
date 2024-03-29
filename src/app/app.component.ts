import {Component} from '@angular/core';
import {OsrmRootObject} from './interfaces/osrm';

export interface MarkerCoords {
  lat: number;
  lng: number;
}

export interface RouteProb {
  prob: number;
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
  styles: any = [
    {
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off'
            },
            {
                color: '#f49f53'
            }
        ]
    },
    {
        featureType: 'landscape',
        stylers: [
            {
                color: '#f9ddc5'
            },
            {
                lightness: -7
            }
        ]
    },
    {
        featureType: 'road',
        stylers: [
            {
                color: '#813033'
            },
            {
                lightness: 43
            }
        ]
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                color: '#645c20'
            },
            {
                lightness: 38
            }
        ]
    },
    {
        featureType: 'water',
        stylers: [
            {
                color: '#1994bf'
            },
            {
                saturation: -69
            },
            {
                gamma: 0.99
            },
            {
                lightness: 43
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#f19f53'
            },
            {
                weight: 1.3
            },
            {
                visibility: 'on'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'poi.business'
    },
    {
        featureType: 'poi.park',
        stylers: [
            {
                color: '#645c20'
            },
            {
                lightness: 39
            }
        ]
    },
    {
        featureType: 'poi.school',
        stylers: [
            {
                color: '#a95521'
            },
            {
                lightness: 35
            }
        ]
    },
    {
        featureType: 'poi.medical',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#813033'
            },
            {
                lightness: 38
            },
            {
                visibility: 'off'
            }
        ]
    },
    {
        elementType: 'labels'
    },
    {
        featureType: 'poi.sports_complex',
        stylers: [
            {
                color: '#9e5916'
            },
            {
                lightness: 32
            }
        ]
    },
    {},
    {
        featureType: 'poi.government',
        stylers: [
            {
                color: '#9e5916'
            },
            {
                lightness: 46
            }
        ]
    },
    {
        featureType: 'transit.station',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit.line',
        stylers: [
            {
                color: '#813033'
            },
            {
                lightness: 22
            }
        ]
    },
    {
        featureType: 'transit',
        stylers: [
            {
                lightness: 38
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#f19f53'
            },
            {
                lightness: -10
            }
        ]
    }
];
  lat = 52.300962;
  lng = -1.479097;
  zoom = 6;
  icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  selected = 0;

  private osrmRootObject: OsrmRootObject;
  private firstLocation: MarkerCoords;
  private secondLocation: MarkerCoords;

  private firstRouteAccidents: MarkerCoords;
  private secondRouteAccidents: MarkerCoords;

  private firstRouteProb: RouteProb;
  private secondRouteProb: RouteProb;

  receiveMessage($event) {
    this.osrmRootObject = $event;
    this.selected = 0;
  }

  receiveMessageFirstLocation($event) {
    this.firstLocation = $event;
  }

  receiveMessageSecondLocation($event) {
    this.secondLocation = $event;
  }

  receiveMessageFirstRouteAccidents($event) {
    this.firstRouteAccidents = $event;
  }

  receiveMessageSecondRouteAccidents($event) {
    this.secondRouteAccidents = $event;
  }

  receiveMessageFirstRouteProbability($event) {
    this.firstRouteProb = $event;
  }


  receiveMessageSecondRouteProbability($event) {
    this.secondRouteProb = $event;
  }

}



