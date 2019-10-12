import {Injectable} from '@angular/core';
import * as AlgoliaSearch from 'algoliasearch';
import * as turf from '@turf/turf';
import {Observable} from "rxjs";
import {Geometry} from "../../interfaces/osrm";


@Injectable({
  providedIn: 'root'
})
export class NearestAccidentsService {

  private index: any;

  constructor() {
    this.index = AlgoliaSearch('8VD8ZKJMEV', 'f313d81e1bc45b25250c21d383b1b889').initIndex('dev_name');
  }

  findNearestAccidents(geometry: Geometry) {
    // const result = this.index.search({
    //   hitsPerPage: 10,
    //   page: 0,
    //   analytics: false,
    //   getRankingInfo: true,
    //   aroundLatLng: '51.5074,0.1278',
    //   aroundRadius: 10000,
    // });
    //
    // console.log(result);
    return new Promise<string>( (resolve, reject) => {
      resolve(this.getPolygonFromPoints(geometry));
    });
  }

  getPolygonFromPoints(geometry: Geometry) {
    // const buffered = turf.buffer(geometry, 1, {units: 'kilometers'});
    //
    // console.log(buffered);
    return 'ddd';
  }
}
