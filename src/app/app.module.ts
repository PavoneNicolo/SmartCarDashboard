import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartComponent} from './chart/chart.component';
import {IMqttMessage, MqttModule, IMqttServiceOptions} from 'ngx-mqtt';
import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatTabsModule} from "@angular/material";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 8080,
  protocol: 'ws',
  path: '/'
};

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatIconModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
