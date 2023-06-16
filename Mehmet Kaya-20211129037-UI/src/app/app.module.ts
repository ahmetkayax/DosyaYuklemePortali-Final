import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { DersComponent } from './components/ders/ders.component';
import { DosyaComponent } from './components/dosya/dosya.component';
import { DosyaDialogComponent } from './components/dialogs/dosya-dialog/dosya-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { DosyafotoDialogComponent } from './components/dialogs/dosyafoto-dialog/dosyafoto-dialog.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { DosyalisteleComponent } from './components/dosyalistele/dosyalistele.component';
import { DosyasecDialogComponent } from './components/dialogs/dosyasec-dialog/dosyasec-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    DersComponent,
    DosyaComponent,
    DerslisteleComponent,
    DosyalisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    DosyaDialogComponent,
    DosyafotoDialogComponent,
    DersDialogComponent,
    DosyasecDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    DosyaDialogComponent,
    DosyafotoDialogComponent,
    DersDialogComponent,
    DosyasecDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
