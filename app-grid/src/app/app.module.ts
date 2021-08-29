import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgGridModule} from "ag-grid-angular";
import {
  DeleteOutline,
  FilterOutline,
  QrcodeOutline,
  PrinterOutline,
  MoreOutline,
  UploadOutline,
  PrinterFill,
  DownloadOutline
} from '@ant-design/icons-angular/icons';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ActionRendererComponent} from "./renderers/action-renderer.component";
import {NzTooltipBaseComponent, NzToolTipModule} from "ng-zorro-antd/tooltip";

registerLocaleData(en);

const icons = [
  DeleteOutline,
  FilterOutline,
  QrcodeOutline,
  PrinterOutline,
  MoreOutline,
  UploadOutline,
  PrinterFill,
  DownloadOutline
];

@NgModule({
  declarations: [
    AppComponent,
    ActionRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzToolTipModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  entryComponents: [ActionRendererComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
