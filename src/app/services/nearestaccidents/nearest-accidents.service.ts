import {Injectable} from '@angular/core';
import * as AlgoliaSearch from 'algoliasearch';
import * as turf from '@turf/turf';


@Injectable({
  providedIn: 'root'
})
export class NearestAccidentsService {

  private index: any;

  constructor() {
    this.index = AlgoliaSearch('8VD8ZKJMEV', 'f313d81e1bc45b25250c21d383b1b889').initIndex('dev_name');
  }

  findNearestPoints() {
    const result = this.index.search({
      hitsPerPage: 10,
      page: 0,
      analytics: false,
      getRankingInfo: true,
      aroundLatLng: '51.5074,0.1278',
      aroundRadius: 10000,
    });

    console.log(result);
  }

  getPolygonFromPoints() {
    const point = turf.point([-90.548630, 14.616599]);
    const buffered = turf.buffer(point, 500, {units: 'miles'});

    console.log(buffered);
  }
}
