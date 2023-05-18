import {Component, OnInit} from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
  public init_lat;
  public init_long;
  public init_zoom;
  public displayedColumns: string[] = ['day', 'hours'];
  public dataSource = ELEMENT_DATA;

  constructor() {
    this.init_lat = 55.469258406819485
    this.init_long = 8.4547015581285
    this.init_zoom = 18;
  }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: `${environment.maps_key}`,
      version: "weekly"
    });

    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      let map = new Map(document.getElementById("map") as HTMLElement, {
        center: {lat: this.init_lat, lng: this.init_long},
        zoom: this.init_zoom,
      });

      let marker = new google.maps.Marker({
        position: {lat: this.init_lat, lng: this.init_long},
        map: map
      });
    });


  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {day: "Bank holidays", hours: 'May vary'},
  {day: "Monday", hours: '08-22'},
  {day: "Tuesday", hours: '08-22'},
  {day: "Wednesday", hours: '08-22'},
  {day: "Thursday", hours: '08-22'},
  {day: "Friday", hours: '08-18'},
  {day: "Saturday", hours: '10-18'},
  {day: "sunday", hours: '10-18'},


];
export interface PeriodicElement {
  day: string;
  hours: string;
}

