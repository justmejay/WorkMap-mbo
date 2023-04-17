import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Observable, of } from 'rxjs';



export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  predictions: Feature[];
  results: any;
  query: [];
}

export interface Feature {
  place_name: string;

}

@Injectable({
  providedIn: 'root'
})
export class MapboxServiceService {

  constructor(private http: HttpClient) { }

  search_word(query: string):Observable<MapboxOutput> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?access_token='
    + environment.mapbox.accessToken) as Observable<MapboxOutput>
    
  }

  search_map(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
    return this.http.get(url + query + '&types=geocode|establishment&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  geocode(query: string):Observable<MapboxOutput> {
    console.log(query);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=';
    return this.http.get(url + query + '&key='
    + environment.google) as Observable<MapboxOutput>
    
  }

  rgeocode(lat: string, lng: string):Observable<MapboxOutput> {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    return this.http.get(url + `${lat},${lng}` + '&key='
    + environment.google) as Observable<MapboxOutput>
    
  }
  
}



