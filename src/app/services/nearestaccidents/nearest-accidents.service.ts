import {Injectable} from '@angular/core';
import * as AlgoliaSearch from 'algoliasearch';
import * as turf from '@turf/turf';
import {Index} from "algoliasearch";


@Injectable({
  providedIn: 'root'
})
export class NearestAccidentsService {

  private index: Index;

  constructor() {
    this.index = AlgoliaSearch('8VD8ZKJMEV', 'f313d81e1bc45b25250c21d383b1b889').initIndex('dev_name');
  }

  findNearestAccidents(coordinates: number[][]) {
    const simplified = this.getPolygonFromPoints(coordinates);
    const coordinatesPolygon = simplified.geometry.coordinates;

    const coordinatesPolygonSqueezed = [];
    coordinatesPolygon[0].forEach((val) => {
      coordinatesPolygonSqueezed.push(val[1]);
      coordinatesPolygonSqueezed.push(val[0]);
    });

    const params = {
      hitsPerPage: 1000,
      page: 0,
      analytics: false,
      getRankingInfo: true,
      insidePolygon: [coordinatesPolygonSqueezed],
      aroundRadius: 10000,
    };

    return this.index.search(params);
  }

  getPolygonFromPoints(coordinates: number[][]) {
    const line = turf.lineString(coordinates);
    return turf.simplify(turf.buffer(line, 0.05, {units: 'kilometers'}), {tolerance: 0.005, highQuality: false});
  }
}
