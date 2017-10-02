import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  DataTableModule, SharedModule, TabViewModule,
  DropdownModule, ProgressBarModule
} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { TickerComponent } from './ticker/ticker.component';
import { TradehistoryComponent } from './tradehistory/tradehistory.component';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { GetPublicDataService } from './services/get-public-data/get-public-data.service';
import { BtcTickerPipe } from './pipes/btc-ticker/btc-ticker.pipe';
import { EthTickerPipe } from './pipes/eth-ticker/eth-ticker.pipe';
import { UsdtTickerPipe } from './pipes/usdt-ticker/usdt-ticker.pipe';
import { BtcChartPipe } from './pipes/btc-chart/btc-chart.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    TradehistoryComponent,
    ChartDataComponent,
    BtcTickerPipe,
    EthTickerPipe,
    UsdtTickerPipe,
    BtcChartPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule, SharedModule, TabViewModule,
    DropdownModule, ProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [GetPublicDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
