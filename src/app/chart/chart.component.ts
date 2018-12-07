import {Component, OnInit, NgModule, Input, Inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import * as moment from 'moment';
import {MqttService, IMqttMessage, MqttModule, IMqttServiceOptions} from 'ngx-mqtt';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  @Input() type;
  topic;
  subscription;

  //test values
  //------------------
  multi: any = [{
    "name": "speed",
    "series": [{"name": "11:47:26", "value": 0}, {"name": "11:47:27", "value": 8}]
  }];
  //------------------

  // chart options
  view: any[] = [400, 250];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _mqttService: MqttService) {
    //TODO query per perscare dati ultimi 30 secondi, usando intervallo di tempo tra date.now() e date.now() - 30 secondi
  }

  ngOnInit() {
    this.topic = this.type.toLowerCase();

    this.subscription = this._mqttService.observe('kitt/cars/+/' + this.topic).subscribe((message: IMqttMessage) => {
      let body = JSON.parse(message.payload.toString());
      let timestamp = moment(body.timestamp).format("HH:mm:ss");
      //console.log(body);
      console.log(timestamp);
      this.multi[0].series.push({"name": timestamp, "value": 12.5}); //name is timestamp, value is speed
      this.multi = [...this.multi];

      // test values
      //------------------
      this.multi[0].series.push({"name": "11:47:29", "value": 11.5}); //name is timestamp, value is speed
      this.multi = [...this.multi];
      this.multi[0].series.push({"name": "11:47:30", "value": 9.5}); //name is timestamp, value is speed
      this.multi = [...this.multi];
      this.multi[0].series.push({"name": "11:47:31", "value": 15.5}); //name is timestamp, value is speed
      this.multi = [...this.multi];
      //------------------

      let smallestTimestamp = moment(this.multi[0].series[0].name, "HH:mm:ss").valueOf();

      //maintain only last 30 seconds data
      if (smallestTimestamp < moment("HH:mm:ss").valueOf() - 30000) {
        this.multi[0].series.shift();
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
