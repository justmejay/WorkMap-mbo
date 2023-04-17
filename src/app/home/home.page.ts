import { Component,ViewChild, ElementRef } from '@angular/core';
import { MapboxServiceService, Feature } from '../mapbox-service.service';
import { GoogleMap, } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  details: any = [];
  latitude: any;
  longitute: any;
  newadd: any;

  constructor(private mapboxService: MapboxServiceService) {}
  addresses: any = [];
  selectedAddress: any;
  final : any;
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
     const test =  await this.mapboxService.search_map(searchTerm).subscribe(res => {
      this.details = res;
      this.addresses = res.predictions;
      // this.addresses = res.map(res.features.map.place_name);
      console.log(this.details);
     });


        //   this.addresses = features.map(feat => feat.place_name);
        // });
      } else {
        this.addresses = [];
      }
  }

  async onSelect(address: any) {
    const test =  await this.mapboxService.geocode(address.place_id).subscribe(res => {
      this.final = res;
      // this.addresses = res.map(res.features.map.place_name);
      console.log(this.final);
      this.latitude =  res.results[0].geometry.location.lat;
      this.longitute =  res.results[0].geometry.location.lng;
      console.log(this.latitude);
      console.log(this.longitute)
      this.selectedAddress = res.results[0].formatted_address;
      this.createMap();
     });

    this.addresses = [];
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'booking-app-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.google,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitute,
        },
        zoom: 18,
      },
    });
    this.addMarker(this.latitude, this.longitute);
  }

async addMarker(lat: any, lng: any){
  await this.newMap.addMarker({
    coordinate: {
      lat: lat,
      lng: lng,
    },
    draggable: true
  });
}

async getloc() {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  this.latitude = coordinates.coords.latitude;
  this.longitute  = coordinates.coords.longitude;
  this.createMap();

  const test =  await this.mapboxService.rgeocode(this.latitude, this.longitute).subscribe(res => {
    this.selectedAddress = res.results[0].formatted_address;
    this.createMap();
   });

};
}
